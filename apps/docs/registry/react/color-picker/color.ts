type ColorSpace = "hsv" | "hsl" | "srgb" | "oklch"
type ColorFormat = "hex" | "rgb" | "srgb" | "hsl" | "oklch"
type ColorGamut = "srgb" | "p3"
type ColorChannel =
  | "hue"
  | "saturation"
  | "brightness"
  | "lightness"
  | "chroma"
  | "red"
  | "green"
  | "blue"
  | "alpha"

/** A color in OKLCH, with `l` from 0 to 1. Colors made from sRGB syntax also carry their exact `r`, `g` and `b`. */
type Color = {
  l: number
  c: number
  h: number
  alpha: number
  r?: number
  g?: number
  b?: number
}

type ColorModel = Partial<Record<ColorChannel, number>>

const CHANNELS: Record<
  ColorSpace,
  Partial<Record<ColorChannel, [number, number, number]>>
> = {
  hsv: {
    hue: [0, 360, 1],
    saturation: [0, 100, 1],
    brightness: [0, 100, 1],
    alpha: [0, 100, 1],
  },
  hsl: {
    hue: [0, 360, 1],
    saturation: [0, 100, 1],
    lightness: [0, 100, 1],
    alpha: [0, 100, 1],
  },
  srgb: {
    red: [0, 255, 1],
    green: [0, 255, 1],
    blue: [0, 255, 1],
    alpha: [0, 100, 1],
  },
  oklch: {
    lightness: [0, 100, 1],
    chroma: [0, 0.4, 0.005],
    hue: [0, 360, 1],
    alpha: [0, 100, 1],
  },
}

const DEFAULT_AREA: Record<ColorSpace, [ColorChannel, ColorChannel]> = {
  hsv: ["saturation", "brightness"],
  hsl: ["saturation", "lightness"],
  srgb: ["red", "green"],
  oklch: ["chroma", "lightness"],
}

const DEFAULT_SLIDER: Record<ColorSpace, ColorChannel> = {
  hsv: "hue",
  hsl: "hue",
  srgb: "blue",
  oklch: "hue",
}

const DEFAULT_FORMAT: Record<ColorSpace, ColorFormat> = {
  hsv: "hex",
  hsl: "hsl",
  srgb: "rgb",
  oklch: "oklch",
}

const LABELS: Record<ColorChannel, string> = {
  hue: "Hue",
  saturation: "Saturation",
  brightness: "Brightness",
  lightness: "Lightness",
  chroma: "Chroma",
  red: "Red",
  green: "Green",
  blue: "Blue",
  alpha: "Alpha",
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function round(value: number, digits: number) {
  const f = 10 ** digits
  return Math.round(value * f) / f
}

function mod360(h: number) {
  return ((h % 360) + 360) % 360
}

function toLinear(c: number) {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function toGamma(c: number) {
  const a = Math.abs(c)
  const v = a <= 0.0031308 ? a * 12.92 : 1.055 * a ** (1 / 2.4) - 0.055
  return c < 0 ? -v : v
}

function rgbToOklch(r255: number, g255: number, b255: number) {
  const r = toLinear(r255 / 255)
  const g = toLinear(g255 / 255)
  const b = toLinear(b255 / 255)
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  return {
    l: L,
    c: Math.hypot(A, B),
    h: mod360((Math.atan2(B, A) * 180) / Math.PI),
  }
}

function oklchToLinear(l: number, c: number, h: number) {
  const A = c * Math.cos((h * Math.PI) / 180)
  const B = c * Math.sin((h * Math.PI) / 180)
  const l_ = (l + 0.3963377774 * A + 0.2158037573 * B) ** 3
  const m_ = (l - 0.1055613458 * A - 0.0638541728 * B) ** 3
  const s_ = (l - 0.0894841775 * A - 1.291485548 * B) ** 3
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ]
}

const SRGB_TO_XYZ = [
  [0.4123907993, 0.3575843394, 0.1804807884],
  [0.2126390059, 0.7151686788, 0.0721923154],
  [0.0193308187, 0.1191947798, 0.9505321522],
]

const XYZ_TO_P3 = [
  [2.4934969119, -0.9313836179, -0.4027107845],
  [-0.8294889696, 1.7626640603, 0.0236246858],
  [0.0358458302, -0.0761723893, 0.956884524],
]

function linearSrgbToP3(rgb: number[]) {
  const xyz = SRGB_TO_XYZ.map(
    (row) => row[0] * rgb[0] + row[1] * rgb[1] + row[2] * rgb[2]
  )
  return XYZ_TO_P3.map(
    (row) => row[0] * xyz[0] + row[1] * xyz[1] + row[2] * xyz[2]
  )
}

function inGamut(l: number, c: number, h: number, gamut: ColorGamut | false) {
  if (gamut === false) return true
  const srgb = oklchToLinear(l, c, h)
  const test = gamut === "p3" ? linearSrgbToP3(srgb) : srgb
  const e = 0.000005
  return test.every((v) => v >= -e && v <= 1 + e)
}

function clampToGamut(color: Color, gamut: ColorGamut | false): Color {
  if (gamut === false || inGamut(color.l, color.c, color.h, gamut)) return color
  if (color.l >= 1) return { l: 1, c: 0, h: color.h, alpha: color.alpha }
  if (color.l <= 0) return { l: 0, c: 0, h: color.h, alpha: color.alpha }
  let low = 0
  let high = color.c
  for (let i = 0; i < 24; i++) {
    const mid = (low + high) / 2
    if (inGamut(color.l, mid, color.h, gamut)) low = mid
    else high = mid
  }
  return {
    l: color.l,
    c: Math.max(0, low - 0.00002),
    h: color.h,
    alpha: color.alpha,
  }
}

function srgbOf(color: Color) {
  if (color.r !== undefined && color.g !== undefined && color.b !== undefined) {
    return { r: color.r, g: color.g, b: color.b }
  }
  const [r, g, b] = oklchToLinear(color.l, color.c, color.h)
  return {
    r: clamp(toGamma(r), 0, 1) * 255,
    g: clamp(toGamma(g), 0, 1) * 255,
    b: clamp(toGamma(b), 0, 1) * 255,
  }
}

function fromRgb(r: number, g: number, b: number, alpha = 1): Color {
  const { l, c, h } = rgbToOklch(r, g, b)
  return { l, c, h: c < 1e-4 ? 0 : h, alpha, r, g, b }
}

function hsvToRgb(h: number, s: number, v: number) {
  const f = (n: number) => {
    const k = (n + h / 60) % 6
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1))
  }
  return { r: f(5) * 255, g: f(3) * 255, b: f(1) * 255 }
}

function hslToRgb(h: number, s: number, l: number) {
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
  }
  return { r: f(0) * 255, g: f(8) * 255, b: f(4) * 255 }
}

function rgbToHsv(r255: number, g255: number, b255: number) {
  const r = r255 / 255
  const g = g255 / 255
  const b = b255 / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
  }
  return { h: mod360(h * 60), s: max === 0 ? 0 : d / max, v: max }
}

function rgbToHsl(r255: number, g255: number, b255: number) {
  const { h } = rgbToHsv(r255, g255, b255)
  const r = r255 / 255
  const g = g255 / 255
  const b = b255 / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  return { h, s, l }
}

function hex2(n: number) {
  return Math.round(clamp(n, 0, 255))
    .toString(16)
    .padStart(2, "0")
}

let scratch: CanvasRenderingContext2D | null | undefined

function viaCanvas(input: string): Color | null {
  if (typeof document === "undefined") return null
  if (scratch === undefined) {
    scratch = document
      .createElement("canvas")
      .getContext("2d", { willReadFrequently: true })
  }
  if (!scratch) return null
  scratch.fillStyle = "#010203"
  scratch.fillStyle = input
  const first = scratch.fillStyle
  scratch.fillStyle = "#fdfcfb"
  scratch.fillStyle = input
  if (first !== scratch.fillStyle) return null
  const text = String(first)
  return parseColor(text, false)
}

function numberOrPercent(token: string, scale: number) {
  if (token === "none") return 0
  if (token.endsWith("%")) return (parseFloat(token) / 100) * scale
  return parseFloat(token)
}

function parseColor(input: string, fallback = true): Color | null {
  const text = String(input).trim().toLowerCase()
  if (!text) return null

  const hex = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(text)
  if (hex) {
    let h = hex[1]
    if (h.length <= 4)
      h = h
        .split("")
        .map((x) => x + x)
        .join("")
    const n = (i: number) => parseInt(h.slice(i, i + 2), 16)
    return fromRgb(n(0), n(2), n(4), h.length === 8 ? n(6) / 255 : 1)
  }

  const fn = /^([a-z]+)\((.*)\)$/.exec(text)
  if (fn) {
    const parts = fn[2].split(/[\s,/]+/).filter(Boolean)
    const alphaAt = (i: number) =>
      parts[i] === undefined ? 1 : clamp(numberOrPercent(parts[i], 1), 0, 1)
    const name = fn[1]
    if ((name === "rgb" || name === "rgba") && parts.length >= 3) {
      const v = (i: number) => clamp(numberOrPercent(parts[i], 255), 0, 255)
      if ([0, 1, 2].every((i) => !isNaN(v(i))))
        return fromRgb(v(0), v(1), v(2), alphaAt(3))
    }
    if ((name === "hsl" || name === "hsla") && parts.length >= 3) {
      const h = mod360(parseFloat(parts[0]))
      const s = clamp(parseFloat(parts[1]) / 100, 0, 1)
      const l = clamp(parseFloat(parts[2]) / 100, 0, 1)
      if (![h, s, l].some(isNaN)) {
        const { r, g, b } = hslToRgb(h, s, l)
        return fromRgb(r, g, b, alphaAt(3))
      }
    }
    if (name === "oklch" && parts.length >= 3) {
      const l = clamp(numberOrPercent(parts[0], 1), 0, 1)
      const c = Math.max(0, numberOrPercent(parts[1], 0.4))
      const h = mod360(parts[2] === "none" ? 0 : parseFloat(parts[2]))
      if (![l, c, h].some(isNaN)) return { l, c, h, alpha: alphaAt(3) }
    }
    if (name === "oklab" && parts.length >= 3) {
      const l = clamp(numberOrPercent(parts[0], 1), 0, 1)
      const a = numberOrPercent(parts[1], 0.4)
      const b = numberOrPercent(parts[2], 0.4)
      if (![l, a, b].some(isNaN)) {
        return {
          l,
          c: Math.hypot(a, b),
          h: mod360((Math.atan2(b, a) * 180) / Math.PI),
          alpha: alphaAt(3),
        }
      }
    }
  }

  return fallback ? viaCanvas(text) : null
}

function formatColor(
  color: Color,
  format: ColorFormat = "hex",
  gamut: ColorGamut | false = "srgb"
): string {
  const alpha = round(clamp(color.alpha, 0, 1), 3)
  const tail = alpha < 1 ? ` / ${alpha}` : ""
  if (format === "oklch") {
    const c = clampToGamut(color, gamut)
    return `oklch(${round(c.l, 4)} ${round(c.c, 4)} ${round(c.c < 1e-4 ? 0 : c.h, 2)}${tail})`
  }
  const { r, g, b } = srgbOf(
    color.r !== undefined ? color : clampToGamut(color, "srgb")
  )
  if (format === "hex") {
    return `#${hex2(r)}${hex2(g)}${hex2(b)}${alpha < 1 ? hex2(alpha * 255) : ""}`
  }
  if (format === "hsl") {
    const { h, s, l } = rgbToHsl(r, g, b)
    return `hsl(${round(h, 2)} ${round(s * 100, 2)}% ${round(l * 100, 2)}%${tail})`
  }
  return `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)}${tail})`
}

function channelRange(space: ColorSpace, channel: ColorChannel) {
  const range = CHANNELS[space][channel]
  return range ? { min: range[0], max: range[1], step: range[2] } : null
}

function hasChannel(space: ColorSpace, channel: ColorChannel) {
  return Boolean(CHANNELS[space][channel])
}

function modelFromColor(
  space: ColorSpace,
  color: Color,
  previous?: ColorModel
): ColorModel {
  const alpha = round(color.alpha * 100, 2)
  if (space === "oklch") {
    const keep = color.c < 1e-4 && previous?.hue !== undefined
    return {
      lightness: color.l * 100,
      chroma: color.c,
      hue: keep ? previous!.hue : color.h,
      alpha,
    }
  }
  const { r, g, b } = srgbOf(color)
  if (space === "srgb") return { red: r, green: g, blue: b, alpha }
  if (space === "hsl") {
    const { h, s, l } = rgbToHsl(r, g, b)
    const keep = (s === 0 || l === 0 || l === 1) && previous?.hue !== undefined
    return {
      hue: keep ? previous!.hue : h,
      saturation: s * 100,
      lightness: l * 100,
      alpha,
    }
  }
  const { h, s, v } = rgbToHsv(r, g, b)
  const keep = (s === 0 || v === 0) && previous?.hue !== undefined
  return {
    hue: keep ? previous!.hue : h,
    saturation: s * 100,
    brightness: v * 100,
    alpha,
  }
}

function colorFromModel(space: ColorSpace, model: ColorModel): Color {
  const alpha = clamp((model.alpha ?? 100) / 100, 0, 1)
  if (space === "oklch") {
    return {
      l: clamp((model.lightness ?? 0) / 100, 0, 1),
      c: Math.max(0, model.chroma ?? 0),
      h: mod360(model.hue ?? 0),
      alpha,
    }
  }
  if (space === "srgb") {
    return fromRgb(
      clamp(model.red ?? 0, 0, 255),
      clamp(model.green ?? 0, 0, 255),
      clamp(model.blue ?? 0, 0, 255),
      alpha
    )
  }
  if (space === "hsl") {
    const { r, g, b } = hslToRgb(
      mod360(model.hue ?? 0),
      clamp((model.saturation ?? 0) / 100, 0, 1),
      clamp((model.lightness ?? 0) / 100, 0, 1)
    )
    return fromRgb(r, g, b, alpha)
  }
  const { r, g, b } = hsvToRgb(
    mod360(model.hue ?? 0),
    clamp((model.saturation ?? 0) / 100, 0, 1),
    clamp((model.brightness ?? 0) / 100, 0, 1)
  )
  return fromRgb(r, g, b, alpha)
}

function isOutOfGamut(
  space: ColorSpace,
  model: ColorModel,
  gamut: ColorGamut | false
) {
  if (space !== "oklch") return false
  const c = colorFromModel(space, model)
  return !inGamut(c.l, c.c, c.h, gamut)
}

function modelToValue(
  space: ColorSpace,
  model: ColorModel,
  format: ColorFormat,
  gamut: ColorGamut | false
) {
  return formatColor(colorFromModel(space, model), format, gamut)
}

function toCss(color: Color) {
  const { r, g, b } = srgbOf(
    color.r !== undefined ? color : clampToGamut(color, "srgb")
  )
  const a = round(clamp(color.alpha, 0, 1), 3)
  const rgb = `${Math.round(r)} ${Math.round(g)} ${Math.round(b)}`
  return a < 1 ? `rgb(${rgb} / ${a})` : `rgb(${rgb})`
}

function withChannel(
  space: ColorSpace,
  model: ColorModel,
  channel: ColorChannel,
  value: number
): ColorModel {
  const range = channelRange(space, channel)
  if (!range) return model
  return { ...model, [channel]: clamp(value, range.min, range.max) }
}

function sliderGradient(
  space: ColorSpace,
  model: ColorModel,
  channel: ColorChannel,
  gamut: ColorGamut | false,
  direction: string
) {
  const range = channelRange(space, channel)
  if (!range) return ""
  if (channel === "alpha") {
    const solid = clampToGamut(
      colorFromModel(space, { ...model, alpha: 100 }),
      "srgb"
    )
    const { r, g, b } = srgbOf(solid)
    const rgb = `${Math.round(r)} ${Math.round(g)} ${Math.round(b)}`
    return `linear-gradient(${direction}, rgb(${rgb} / 0), rgb(${rgb}))`
  }
  let base: ColorModel = { ...model, alpha: 100 }
  if (channel === "hue") {
    if (space === "hsv") base = { ...base, saturation: 100, brightness: 100 }
    else if (space === "hsl") base = { ...base, saturation: 100, lightness: 50 }
    else if (space === "oklch")
      base = {
        ...base,
        lightness: Math.min(Math.max(base.lightness ?? 60, 45), 80),
        chroma: Math.max(base.chroma ?? 0, 0.1),
      }
  }
  const stops: string[] = []
  const n = channel === "hue" ? 12 : 8
  for (let i = 0; i <= n; i++) {
    const m = {
      ...base,
      [channel]: range.min + ((range.max - range.min) * i) / n,
    }
    stops.push(toCss(clampToGamut(colorFromModel(space, m), gamut)))
  }
  return `linear-gradient(${direction}, ${stops.join(", ")})`
}

function defaultAreaPair(space: ColorSpace) {
  return DEFAULT_AREA[space]
}

function areaGradient(
  space: ColorSpace,
  model: ColorModel,
  x: ColorChannel,
  y: ColorChannel,
  direction: string
) {
  const [dx, dy] = DEFAULT_AREA[space]
  if (x !== dx || y !== dy) return ""
  if (space === "hsv") {
    const hue = `hsl(${round(model.hue ?? 0, 2)} 100% 50%)`
    return `linear-gradient(to top, #000, transparent), linear-gradient(${direction}, #fff, ${hue})`
  }
  if (space === "hsl") {
    const hue = `hsl(${round(model.hue ?? 0, 2)} 100% 50%)`
    return `linear-gradient(to bottom, #fff, rgb(255 255 255 / 0) 50%, rgb(0 0 0 / 0) 50%, #000), linear-gradient(${direction}, #808080, ${hue})`
  }
  return ""
}

function paintArea(
  canvas: HTMLCanvasElement,
  space: ColorSpace,
  model: ColorModel,
  x: ColorChannel,
  y: ColorChannel,
  gamut: ColorGamut | false,
  rtl: boolean
) {
  const w = 96
  const h = 72
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")
  const rx = channelRange(space, x)
  const ry = channelRange(space, y)
  if (!ctx || !rx || !ry) return
  const image = ctx.createImageData(w, h)
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      let fx = i / (w - 1)
      if (rtl) fx = 1 - fx
      const fy = 1 - j / (h - 1)
      const m = {
        ...model,
        alpha: 100,
        [x]: rx.min + fx * (rx.max - rx.min),
        [y]: ry.min + fy * (ry.max - ry.min),
      }
      const color = colorFromModel(space, m)
      const out =
        space === "oklch" && !inGamut(color.l, color.c, color.h, gamut)
      const { r, g, b } = srgbOf(
        color.r !== undefined ? color : clampToGamut(color, "srgb")
      )
      const k = (j * w + i) * 4
      image.data[k] = r
      image.data[k + 1] = g
      image.data[k + 2] = b
      image.data[k + 3] = out ? 0 : 255
    }
  }
  ctx.putImageData(image, 0, 0)
}

function colorName(color: Color) {
  const { l, c, h } = color
  if (color.alpha === 0) return "transparent"
  let base: string
  if (c < 0.03) {
    base = l > 0.95 ? "white" : l < 0.15 ? "black" : "gray"
  } else if (h < 20 || h >= 350) base = "red"
  else if (h < 45) base = "orange"
  else if (h < 70) base = "amber"
  else if (h < 100) base = "yellow"
  else if (h < 150) base = "green"
  else if (h < 185) base = "teal"
  else if (h < 215) base = "cyan"
  else if (h < 265) base = "blue"
  else if (h < 300) base = "purple"
  else if (h < 340) base = "pink"
  else base = "rose"
  if (base === "white" || base === "black") return base
  const tone = l > 0.85 ? "light" : l > 0.7 ? "" : l < 0.3 ? "dark" : ""
  const strength = c < 0.03 ? "" : c > 0.15 ? "vivid" : c < 0.07 ? "muted" : ""
  return [strength, tone, base].filter(Boolean).join(" ")
}

export {
  CHANNELS,
  DEFAULT_AREA,
  DEFAULT_FORMAT,
  DEFAULT_SLIDER,
  LABELS,
  areaGradient,
  channelRange,
  clamp,
  clampToGamut,
  colorFromModel,
  colorName,
  defaultAreaPair,
  formatColor,
  hasChannel,
  isOutOfGamut,
  modelFromColor,
  modelToValue,
  paintArea,
  parseColor,
  round,
  sliderGradient,
  toCss,
  withChannel,
}
export type {
  Color,
  ColorChannel,
  ColorFormat,
  ColorGamut,
  ColorModel,
  ColorSpace,
}
