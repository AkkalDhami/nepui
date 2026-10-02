export type FormatId =
  | "hex"
  | "rgb"
  | "hsl"
  | "hwb"
  | "oklch"
  | "oklab"
  | "lch"
  | "lab"
  | "p3"
  | "var"
  | "class"

export interface ColorFormat {
  id: FormatId
  label: string
  value: string
}

export interface ColorInfo {
  token: string
  oklch: string
  /** Clamped sRGB, 0 to 255. */
  rgb: [number, number, number]
  formats: ColorFormat[]
  /** True when dark text/icons are more readable on this color. */
  isLight: boolean
}

type Vec3 = [number, number, number]

const DEG = Math.PI / 180

function parseOklch(input: string) {
  const m = input.match(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+|none)/)
  if (!m) throw new Error(`Cannot parse color: ${input}`)
  return {
    L: parseFloat(m[1]) / (m[2] ? 100 : 1),
    C: parseFloat(m[3]),
    h: m[4] === "none" ? 0 : parseFloat(m[4]),
  }
}

function oklchToLinearSrgb(L: number, C: number, h: number): Vec3 {
  const a = C * Math.cos(h * DEG)
  const b = C * Math.sin(h * DEG)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

function gamma(x: number): number {
  const sign = x < 0 ? -1 : 1
  const v = Math.abs(x)
  return sign * (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055)
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x))

function round(n: number, digits = 0): number {
  const f = 10 ** digits
  return Math.round(n * f) / f
}

/** Rounds and drops trailing zeros. */
const n = (value: number, digits = 0) => String(round(value, digits))

export function getColorInfo(token: string, oklch: string): ColorInfo {
  const o = parseOklch(oklch)
  const lin = oklchToLinearSrgb(o.L, o.C, o.h)
  const rgb01 = lin.map((v) => clamp01(gamma(v))) as Vec3
  const rgb = rgb01.map((v) => Math.round(v * 255)) as Vec3
  const [R, G, B] = rgb
  const hex = "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("")

  // HSL / HWB from clamped sRGB
  const max = Math.max(...rgb01)
  const min = Math.min(...rgb01)
  const d = max - min
  let hue = 0
  if (d) {
    if (max === rgb01[0]) hue = ((rgb01[1] - rgb01[2]) / d) % 6
    else if (max === rgb01[1]) hue = (rgb01[2] - rgb01[0]) / d + 2
    else hue = (rgb01[0] - rgb01[1]) / d + 4
    hue *= 60
    if (hue < 0) hue += 360
  }
  const lightness = (max + min) / 2
  const sat = d === 0 ? 0 : d / (1 - Math.abs(2 * lightness - 1))
  const neutral = o.C < 0.0005
  const hslHue = neutral ? 0 : hue

  // XYZ (D65) for Lab, LCH and Display P3
  const [lr, lg, lb] = lin
  const X = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb
  const Y = 0.2126729 * lr + 0.7151522 * lg + 0.072175 * lb
  const Z = 0.0193339 * lr + 0.119192 * lg + 0.9503041 * lb

  const p3 = [
    2.4934969 * X - 0.9313836 * Y - 0.4027108 * Z,
    -0.829489 * X + 1.7626641 * Y + 0.0236247 * Z,
    0.0358458 * X - 0.0761724 * Y + 0.9568845 * Z,
  ].map((v) => clamp01(gamma(v)))

  // Bradford D65 -> D50, then CIE Lab
  const X5 = 1.0478112 * X + 0.0228866 * Y - 0.050127 * Z
  const Y5 = 0.0295424 * X + 0.9904844 * Y - 0.0170491 * Z
  const Z5 = -0.0092345 * X + 0.0150436 * Y + 0.7521316 * Z
  const f = (t: number) =>
    t > 0.008856 ? Math.cbrt(t) : (903.3 * t + 16) / 116
  const fx = f(X5 / 0.96422)
  const fy = f(Y5)
  const fz = f(Z5 / 0.82521)
  const labL = 116 * fy - 16
  const labA = 500 * (fx - fy)
  const labB = 200 * (fy - fz)
  const lchC = Math.hypot(labA, labB)
  let lchH = Math.atan2(labB, labA) / DEG
  if (lchH < 0) lchH += 360

  const okA = o.C * Math.cos(o.h * DEG)
  const okB = o.C * Math.sin(o.h * DEG)

  const formats: ColorFormat[] = [
    { id: "hex", label: "HEX", value: hex },
    { id: "rgb", label: "RGB", value: `rgb(${R} ${G} ${B})` },
    {
      id: "hsl",
      label: "HSL",
      value: `hsl(${n(hslHue)} ${n(sat * 100)}% ${n(lightness * 100)}%)`,
    },
    {
      id: "hwb",
      label: "HWB",
      value: `hwb(${n(hslHue)} ${n(min * 100)}% ${n((1 - max) * 100)}%)`,
    },
    {
      id: "oklch",
      label: "OKLCH",
      value: `oklch(${n(o.L * 100, 1)}% ${n(o.C, 3)} ${neutral ? 0 : n(o.h, 2)})`,
    },
    {
      id: "oklab",
      label: "OKLab",
      value: `oklab(${n(o.L * 100, 1)}% ${n(okA, 4)} ${n(okB, 4)})`,
    },
    {
      id: "lch",
      label: "LCH",
      value: `lch(${n(labL, 1)}% ${n(lchC, 1)} ${neutral ? 0 : n(lchH, 1)})`,
    },
    {
      id: "lab",
      label: "Lab",
      value: `lab(${n(labL, 1)}% ${n(labA, 1)} ${n(labB, 1)})`,
    },
    {
      id: "p3",
      label: "Display P3",
      value: `color(display-p3 ${p3.map((v) => n(v, 3)).join(" ")})`,
    },
    { id: "var", label: "CSS var", value: `var(--np-${token})` },
    { id: "class", label: "Class", value: `bg-${token}` },
  ]

  const luminance = (0.2126 * R + 0.7152 * G + 0.0722 * B) / 255

  return { token, oklch, rgb, formats, isLight: luminance > 0.6 }
}
