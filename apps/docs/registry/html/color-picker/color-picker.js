;(function () {
  "use strict"

  const CHANNELS = {
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
  const DEFAULT_AREA = {
    hsv: ["saturation", "brightness"],
    hsl: ["saturation", "lightness"],
    srgb: ["red", "green"],
    oklch: ["chroma", "lightness"],
  }
  const DEFAULT_SLIDER = {
    hsv: "hue",
    hsl: "hue",
    srgb: "blue",
    oklch: "hue",
  }
  const DEFAULT_FORMAT = {
    hsv: "hex",
    hsl: "hsl",
    srgb: "rgb",
    oklch: "oklch",
  }
  const LABELS = {
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
  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
  }
  function round(value, digits) {
    const f = 10 ** digits
    return Math.round(value * f) / f
  }
  function mod360(h) {
    return ((h % 360) + 360) % 360
  }
  function toLinear(c) {
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  function toGamma(c) {
    const a = Math.abs(c)
    const v = a <= 0.0031308 ? a * 12.92 : 1.055 * a ** (1 / 2.4) - 0.055
    return c < 0 ? -v : v
  }
  function rgbToOklch(r255, g255, b255) {
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
  function oklchToLinear(l, c, h) {
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
  function linearSrgbToP3(rgb) {
    const xyz = SRGB_TO_XYZ.map(
      (row) => row[0] * rgb[0] + row[1] * rgb[1] + row[2] * rgb[2]
    )
    return XYZ_TO_P3.map(
      (row) => row[0] * xyz[0] + row[1] * xyz[1] + row[2] * xyz[2]
    )
  }
  function inGamut(l, c, h, gamut) {
    if (gamut === false) return true
    const srgb = oklchToLinear(l, c, h)
    const test = gamut === "p3" ? linearSrgbToP3(srgb) : srgb
    const e = 0.000005
    return test.every((v) => v >= -e && v <= 1 + e)
  }
  function clampToGamut(color, gamut) {
    if (gamut === false || inGamut(color.l, color.c, color.h, gamut))
      return color
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
  function srgbOf(color) {
    if (
      color.r !== undefined &&
      color.g !== undefined &&
      color.b !== undefined
    ) {
      return { r: color.r, g: color.g, b: color.b }
    }
    const [r, g, b] = oklchToLinear(color.l, color.c, color.h)
    return {
      r: clamp(toGamma(r), 0, 1) * 255,
      g: clamp(toGamma(g), 0, 1) * 255,
      b: clamp(toGamma(b), 0, 1) * 255,
    }
  }
  function fromRgb(r, g, b, alpha = 1) {
    const { l, c, h } = rgbToOklch(r, g, b)
    return { l, c, h: c < 1e-4 ? 0 : h, alpha, r, g, b }
  }
  function hsvToRgb(h, s, v) {
    const f = (n) => {
      const k = (n + h / 60) % 6
      return v - v * s * Math.max(0, Math.min(k, 4 - k, 1))
    }
    return { r: f(5) * 255, g: f(3) * 255, b: f(1) * 255 }
  }
  function hslToRgb(h, s, l) {
    const a = s * Math.min(l, 1 - l)
    const f = (n) => {
      const k = (n + h / 30) % 12
      return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    }
    return { r: f(0) * 255, g: f(8) * 255, b: f(4) * 255 }
  }
  function rgbToHsv(r255, g255, b255) {
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
  function rgbToHsl(r255, g255, b255) {
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
  function hex2(n) {
    return Math.round(clamp(n, 0, 255))
      .toString(16)
      .padStart(2, "0")
  }
  let scratch
  function viaCanvas(input) {
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
  function numberOrPercent(token, scale) {
    if (token === "none") return 0
    if (token.endsWith("%")) return (parseFloat(token) / 100) * scale
    return parseFloat(token)
  }
  function parseColor(input, fallback = true) {
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
      const n = (i) => parseInt(h.slice(i, i + 2), 16)
      return fromRgb(n(0), n(2), n(4), h.length === 8 ? n(6) / 255 : 1)
    }
    const fn = /^([a-z]+)\((.*)\)$/.exec(text)
    if (fn) {
      const parts = fn[2].split(/[\s,/]+/).filter(Boolean)
      const alphaAt = (i) =>
        parts[i] === undefined ? 1 : clamp(numberOrPercent(parts[i], 1), 0, 1)
      const name = fn[1]
      if ((name === "rgb" || name === "rgba") && parts.length >= 3) {
        const v = (i) => clamp(numberOrPercent(parts[i], 255), 0, 255)
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
  function formatColor(color, format = "hex", gamut = "srgb") {
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
  function channelRange(space, channel) {
    const range = CHANNELS[space][channel]
    return range ? { min: range[0], max: range[1], step: range[2] } : null
  }
  function hasChannel(space, channel) {
    return Boolean(CHANNELS[space][channel])
  }
  function modelFromColor(space, color, previous) {
    const alpha = round(color.alpha * 100, 2)
    if (space === "oklch") {
      const keep =
        color.c < 1e-4 &&
        (previous === null || previous === void 0 ? void 0 : previous.hue) !==
          undefined
      return {
        lightness: color.l * 100,
        chroma: color.c,
        hue: keep ? previous.hue : color.h,
        alpha,
      }
    }
    const { r, g, b } = srgbOf(color)
    if (space === "srgb") return { red: r, green: g, blue: b, alpha }
    if (space === "hsl") {
      const { h, s, l } = rgbToHsl(r, g, b)
      const keep =
        (s === 0 || l === 0 || l === 1) &&
        (previous === null || previous === void 0 ? void 0 : previous.hue) !==
          undefined
      return {
        hue: keep ? previous.hue : h,
        saturation: s * 100,
        lightness: l * 100,
        alpha,
      }
    }
    const { h, s, v } = rgbToHsv(r, g, b)
    const keep =
      (s === 0 || v === 0) &&
      (previous === null || previous === void 0 ? void 0 : previous.hue) !==
        undefined
    return {
      hue: keep ? previous.hue : h,
      saturation: s * 100,
      brightness: v * 100,
      alpha,
    }
  }
  function colorFromModel(space, model) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o
    const alpha = clamp(
      ((_a = model.alpha) !== null && _a !== void 0 ? _a : 100) / 100,
      0,
      1
    )
    if (space === "oklch") {
      return {
        l: clamp(
          ((_b = model.lightness) !== null && _b !== void 0 ? _b : 0) / 100,
          0,
          1
        ),
        c: Math.max(0, (_c = model.chroma) !== null && _c !== void 0 ? _c : 0),
        h: mod360((_d = model.hue) !== null && _d !== void 0 ? _d : 0),
        alpha,
      }
    }
    if (space === "srgb") {
      return fromRgb(
        clamp((_e = model.red) !== null && _e !== void 0 ? _e : 0, 0, 255),
        clamp((_f = model.green) !== null && _f !== void 0 ? _f : 0, 0, 255),
        clamp((_g = model.blue) !== null && _g !== void 0 ? _g : 0, 0, 255),
        alpha
      )
    }
    if (space === "hsl") {
      const { r, g, b } = hslToRgb(
        mod360((_h = model.hue) !== null && _h !== void 0 ? _h : 0),
        clamp(
          ((_j = model.saturation) !== null && _j !== void 0 ? _j : 0) / 100,
          0,
          1
        ),
        clamp(
          ((_k = model.lightness) !== null && _k !== void 0 ? _k : 0) / 100,
          0,
          1
        )
      )
      return fromRgb(r, g, b, alpha)
    }
    const { r, g, b } = hsvToRgb(
      mod360((_l = model.hue) !== null && _l !== void 0 ? _l : 0),
      clamp(
        ((_m = model.saturation) !== null && _m !== void 0 ? _m : 0) / 100,
        0,
        1
      ),
      clamp(
        ((_o = model.brightness) !== null && _o !== void 0 ? _o : 0) / 100,
        0,
        1
      )
    )
    return fromRgb(r, g, b, alpha)
  }
  function isOutOfGamut(space, model, gamut) {
    if (space !== "oklch") return false
    const c = colorFromModel(space, model)
    return !inGamut(c.l, c.c, c.h, gamut)
  }
  function modelToValue(space, model, format, gamut) {
    return formatColor(colorFromModel(space, model), format, gamut)
  }
  function toCss(color) {
    const { r, g, b } = srgbOf(
      color.r !== undefined ? color : clampToGamut(color, "srgb")
    )
    const a = round(clamp(color.alpha, 0, 1), 3)
    const rgb = `${Math.round(r)} ${Math.round(g)} ${Math.round(b)}`
    return a < 1 ? `rgb(${rgb} / ${a})` : `rgb(${rgb})`
  }
  function withChannel(space, model, channel, value) {
    const range = channelRange(space, channel)
    if (!range) return model
    return { ...model, [channel]: clamp(value, range.min, range.max) }
  }
  function sliderGradient(space, model, channel, gamut, direction) {
    var _a, _b
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
    let base = { ...model, alpha: 100 }
    if (channel === "hue") {
      if (space === "hsv") base = { ...base, saturation: 100, brightness: 100 }
      else if (space === "hsl")
        base = { ...base, saturation: 100, lightness: 50 }
      else if (space === "oklch")
        base = {
          ...base,
          lightness: Math.min(
            Math.max(
              (_a = base.lightness) !== null && _a !== void 0 ? _a : 60,
              45
            ),
            80
          ),
          chroma: Math.max(
            (_b = base.chroma) !== null && _b !== void 0 ? _b : 0,
            0.1
          ),
        }
    }
    const stops = []
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
  // function defaultAreaPair(space) {
  //   return DEFAULT_AREA[space]
  // }
  function areaGradient(space, model, x, y, direction) {
    var _a, _b
    const [dx, dy] = DEFAULT_AREA[space]
    if (x !== dx || y !== dy) return ""
    if (space === "hsv") {
      const hue = `hsl(${round((_a = model.hue) !== null && _a !== void 0 ? _a : 0, 2)} 100% 50%)`
      return `linear-gradient(to top, #000, transparent), linear-gradient(${direction}, #fff, ${hue})`
    }
    if (space === "hsl") {
      const hue = `hsl(${round((_b = model.hue) !== null && _b !== void 0 ? _b : 0, 2)} 100% 50%)`
      return `linear-gradient(to bottom, #fff, rgb(255 255 255 / 0) 50%, rgb(0 0 0 / 0) 50%, #000), linear-gradient(${direction}, #808080, ${hue})`
    }
    return ""
  }
  function paintArea(canvas, space, model, x, y, gamut, rtl) {
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
  function colorName(color) {
    const { l, c, h } = color
    if (color.alpha === 0) return "transparent"
    let base
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
    const strength =
      c < 0.03 ? "" : c > 0.15 ? "vivid" : c < 0.07 ? "muted" : ""
    return [strength, tone, base].filter(Boolean).join(" ")
  }

  var instances = new WeakMap()

  function digitsOf(step) {
    return step < 1 ? 3 : 0
  }

  function nextByKey(event, space, channel, current, keys) {
    var range = channelRange(space, channel)
    if (!range) return null
    var big = event.shiftKey ? 10 : 1
    var span = range.max - range.min
    if (keys.inc.indexOf(event.key) > -1) return current + range.step * big
    if (keys.dec.indexOf(event.key) > -1) return current - range.step * big
    if (keys.page && event.key === "PageUp") return current + span / 10
    if (keys.page && event.key === "PageDown") return current - span / 10
    if (keys.ends && event.key === "Home") return range.min
    if (keys.ends && event.key === "End") return range.max
    return null
  }

  function parts(root, name) {
    var list = root.querySelectorAll(
      "[data-np-color-picker-" + name + "], .np-color-picker-" + name
    )
    return Array.prototype.slice.call(list)
  }

  function setFlag(el, name, on) {
    if (on) el.setAttribute(name, "")
    else el.removeAttribute(name)
  }

  function fraction(model, space, channel) {
    var range = channelRange(space, channel)
    if (!range) return 0
    return clamp(
      ((model[channel] || 0) - range.min) / (range.max - range.min),
      0,
      1
    )
  }

  function create(root) {
    var space = root.getAttribute("data-space") || "hsv"
    if (!CHANNELS[space]) space = "hsv"
    var format = root.getAttribute("data-format") || DEFAULT_FORMAT[space]
    var g = root.getAttribute("data-gamut")
    var gamut = g === "false" ? false : g === "p3" ? "p3" : "srgb"
    var initial =
      root.getAttribute("data-default-value") ||
      root.getAttribute("data-value") ||
      "#000000"
    var model = modelFromColor(
      space,
      parseColor(initial) || parseColor("#000000")
    )
    var value = modelToValue(space, model, format, gamut)
    var name = root.getAttribute("data-name")

    if (!root.hasAttribute("role")) root.setAttribute("role", "group")
    if (!root.hasAttribute("aria-label"))
      root.setAttribute("aria-label", "Color picker")

    function disabled() {
      return root.hasAttribute("data-disabled")
    }
    function readOnly() {
      return root.hasAttribute("data-readonly")
    }

    var hidden = null
    if (name) {
      hidden = document.createElement("input")
      hidden.type = "text"
      hidden.name = name
      hidden.tabIndex = -1
      hidden.setAttribute("aria-hidden", "true")
      hidden.className = "np-color-picker-hidden-input"
      hidden.setAttribute("data-np-color-picker-hidden-input", "")
      hidden.readOnly = true
      var formId = root.getAttribute("data-form")
      if (formId) hidden.setAttribute("form", formId)
      root.appendChild(hidden)
    }

    function cssColor(m) {
      return toCss(clampToGamut(colorFromModel(space, m), gamut))
    }

    function emit(type, reason, event, cancelable) {
      var ev = new CustomEvent(type, {
        bubbles: true,
        cancelable: cancelable,
        detail: {
          value: value,
          color: cssColor(model),
          reason: reason,
          event: event,
        },
      })
      return root.dispatchEvent(ev)
    }

    function update(next, reason, event) {
      if (
        disabled() ||
        (readOnly() && reason !== "imperative" && reason !== "reset")
      )
        return false
      var nextValue = modelToValue(space, next, format, gamut)
      if (nextValue !== value) {
        var ev = new CustomEvent("np-color-picker-change", {
          bubbles: true,
          cancelable: true,
          detail: {
            value: nextValue,
            color: cssColor(next),
            reason: reason,
            event: event,
          },
        })
        if (!root.dispatchEvent(ev)) return false
        value = nextValue
      }
      model = next
      render()
      return true
    }

    function setText(text, reason, event) {
      var color = parseColor(text)
      if (!color) return false
      return update(modelFromColor(space, color, model), reason, event)
    }

    function commit(reason, event) {
      if (isOutOfGamut(space, model, gamut)) {
        model = modelFromColor(
          space,
          clampToGamut(colorFromModel(space, model), gamut),
          model
        )
        render()
      }
      emit("np-color-picker-commit", reason, event, false)
    }

    function drag(el, move, done) {
      var dragging = false
      var moved = false
      el.addEventListener("pointerdown", function (event) {
        if (disabled() || readOnly() || event.button !== 0) return
        event.preventDefault()
        el.setPointerCapture(event.pointerId)
        dragging = true
        moved = false
        move(event, true)
        var thumb = el.querySelector("[role='slider']")
        if (thumb) thumb.focus()
      })
      el.addEventListener("pointermove", function (event) {
        if (!dragging) return
        moved = true
        move(event, false)
      })
      function end(event) {
        if (!dragging) return
        dragging = false
        done(event, moved)
      }
      el.addEventListener("pointerup", end)
      el.addEventListener("pointercancel", end)
    }

    function areaChannels(area) {
      var d = DEFAULT_AREA[space]
      var x = area.getAttribute("data-x") || d[0]
      var y = area.getAttribute("data-y") || d[1]
      return {
        x: hasChannel(space, x) ? x : d[0],
        y: hasChannel(space, y) ? y : d[1],
      }
    }

    function sliderChannel(slider) {
      var c = slider.getAttribute("data-channel") || DEFAULT_SLIDER[space]
      return hasChannel(space, c) ? c : DEFAULT_SLIDER[space]
    }

    function ensure(parent, selector, className, tag, attrs) {
      var el = parent.querySelector(selector)
      if (!el) {
        el = document.createElement(tag || "div")
        el.className = className
        parent.appendChild(el)
      }
      for (var k in attrs || {}) el.setAttribute(k, attrs[k])
      return el
    }

    var areas = parts(root, "area")
    var sliders = parts(root, "slider")

    areas.forEach(function (area) {
      var thumb = ensure(
        area,
        "[data-np-color-picker-area-thumb], .np-color-picker-area-thumb",
        "np-color-picker-area-thumb",
        "div",
        {
          role: "slider",
          "aria-roledescription": "2D slider",
          "data-area-thumb": "",
        }
      )
      drag(
        area,
        function (event, first) {
          var ch = areaChannels(area)
          var rect = area.getBoundingClientRect()
          var fx = clamp((event.clientX - rect.left) / rect.width, 0, 1)
          var fy = clamp(1 - (event.clientY - rect.top) / rect.height, 0, 1)
          var rx = channelRange(space, ch.x)
          var ry = channelRange(space, ch.y)
          var next = withChannel(
            space,
            model,
            ch.x,
            rx.min + fx * (rx.max - rx.min)
          )
          next = withChannel(space, next, ch.y, ry.min + fy * (ry.max - ry.min))
          update(next, first ? "track-press" : "drag", event)
        },
        function (event, moved) {
          commit(moved ? "drag" : "track-press", event)
        }
      )
      thumb.addEventListener("keydown", function (event) {
        if (disabled() || readOnly()) return
        var ch = areaChannels(area)
        var nx = nextByKey(event, space, ch.x, model[ch.x] || 0, {
          inc: ["ArrowRight"],
          dec: ["ArrowLeft"],
          ends: true,
        })
        var ny = nextByKey(event, space, ch.y, model[ch.y] || 0, {
          inc: ["ArrowUp"],
          dec: ["ArrowDown"],
          page: true,
        })
        if (nx === null && ny === null) return
        event.preventDefault()
        var next = model
        if (nx !== null) next = withChannel(space, next, ch.x, nx)
        if (ny !== null) next = withChannel(space, next, ch.y, ny)
        update(next, "step-key", event)
        commit("step-key", event)
      })
    })

    sliders.forEach(function (slider) {
      var vertical = slider.getAttribute("data-orientation") === "vertical"
      slider.setAttribute(
        "data-orientation",
        vertical ? "vertical" : "horizontal"
      )
      var thumb = ensure(
        slider,
        "[data-np-color-picker-slider-thumb], .np-color-picker-slider-thumb",
        "np-color-picker-slider-thumb",
        "div",
        {
          role: "slider",
          "aria-orientation": vertical ? "vertical" : "horizontal",
        }
      )
      thumb.setAttribute(
        "data-orientation",
        vertical ? "vertical" : "horizontal"
      )
      drag(
        slider,
        function (event, first) {
          var channel = sliderChannel(slider)
          var range = channelRange(space, channel)
          var rect = slider.getBoundingClientRect()
          var f = vertical
            ? 1 - (event.clientY - rect.top) / rect.height
            : (event.clientX - rect.left) / rect.width
          update(
            withChannel(
              space,
              model,
              channel,
              range.min + clamp(f, 0, 1) * (range.max - range.min)
            ),
            first ? "track-press" : "drag",
            event
          )
        },
        function (event, moved) {
          commit(moved ? "drag" : "track-press", event)
        }
      )
      thumb.addEventListener("keydown", function (event) {
        if (disabled() || readOnly()) return
        var channel = sliderChannel(slider)
        var next = nextByKey(event, space, channel, model[channel] || 0, {
          inc: ["ArrowRight", "ArrowUp"],
          dec: ["ArrowLeft", "ArrowDown"],
          page: true,
          ends: true,
        })
        if (next === null) return
        event.preventDefault()
        update(withChannel(space, model, channel, next), "step-key", event)
        commit("step-key", event)
      })
    })

    var swatches = parts(root, "swatch")
    var inputs = parts(root, "input")
    var channelInputs = parts(root, "channel-input")
    var droppers = parts(root, "eye-dropper")
    var lists = parts(root, "swatches")

    inputs.forEach(function (input) {
      var dirty = false
      input.type = "text"
      input.spellcheck = false
      input.autocomplete = "off"
      if (!input.hasAttribute("aria-label"))
        input.setAttribute("aria-label", "Color value")
      function commitDraft(event) {
        if (!dirty) return
        dirty = false
        if (setText(input.value, "input-commit", event))
          commit("input-commit", event)
        else input.value = value
        render()
      }
      input.addEventListener("input", function () {
        dirty = true
      })
      input.addEventListener("blur", commitDraft)
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault()
          commitDraft(event)
        } else if (event.key === "Escape") {
          dirty = false
          input.value = value
        }
      })
    })

    channelInputs.forEach(function (input) {
      var dirty = false
      var channel = input.getAttribute("data-channel")
      if (!channel || !hasChannel(space, channel)) return
      var range = channelRange(space, channel)
      input.type = "text"
      input.inputMode = "decimal"
      input.spellcheck = false
      input.autocomplete = "off"
      if (!input.hasAttribute("aria-label"))
        input.setAttribute("aria-label", LABELS[channel])
      function commitDraft(event) {
        if (!dirty) return
        dirty = false
        var n = parseFloat(input.value)
        if (
          !isNaN(n) &&
          update(withChannel(space, model, channel, n), "input-commit", event)
        ) {
          commit("input-commit", event)
        }
        render()
      }
      input.addEventListener("input", function () {
        dirty = true
      })
      input.addEventListener("blur", commitDraft)
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault()
          commitDraft(event)
        } else if (event.key === "Escape") {
          dirty = false
          render()
        } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          event.preventDefault()
          if (readOnly()) return
          dirty = false
          var delta =
            (event.key === "ArrowUp" ? 1 : -1) *
            range.step *
            (event.shiftKey ? 10 : 1)
          if (
            update(
              withChannel(space, model, channel, (model[channel] || 0) + delta),
              "step-key",
              event
            )
          ) {
            commit("step-key", event)
          }
        }
      })
    })

    droppers.forEach(function (button) {
      if (!button.hasAttribute("aria-label"))
        button.setAttribute("aria-label", "Pick a color from the screen")
      if (button.tagName === "BUTTON") button.type = "button"
      if (!button.firstElementChild) {
        button.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"/></svg>'
      }
      button.addEventListener("click", function (event) {
        if (disabled() || readOnly() || !window.EyeDropper) return
        new window.EyeDropper()
          .open()
          .then(function (result) {
            if (setText(result.sRGBHex, "eye-dropper-pick", event))
              commit("eye-dropper-pick", event)
          })
          .catch(function () {})
      })
    })

    lists.forEach(function (list) {
      list.setAttribute("role", "listbox")
      if (!list.hasAttribute("aria-label"))
        list.setAttribute("aria-label", "Preset colors")
      list.addEventListener("keydown", function (event) {
        var items = parts(list, "swatch-item").filter(function (item) {
          return !item.disabled
        })
        var index = items.indexOf(document.activeElement)
        if (index < 0) return
        var next = index
        if (event.key === "ArrowRight" || event.key === "ArrowDown")
          next = (index + 1) % items.length
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
          next = (index - 1 + items.length) % items.length
        else if (event.key === "Home") next = 0
        else if (event.key === "End") next = items.length - 1
        else return
        event.preventDefault()
        items.forEach(function (item, i) {
          item.setAttribute("tabindex", i === next ? "0" : "-1")
        })
        items[next].focus()
      })
      list.addEventListener("click", function (event) {
        var item = event.target.closest(
          "[data-np-color-picker-swatch-item], .np-color-picker-swatch-item"
        )
        if (!item || !list.contains(item) || disabled() || readOnly()) return
        var v = item.getAttribute("data-value")
        if (v && setText(v, "item-press", event)) commit("item-press", event)
      })
    })

    function sameColor(a, b) {
      var ca = parseColor(a)
      var cb = parseColor(b)
      return !!ca && !!cb && formatColor(ca, "hex") === formatColor(cb, "hex")
    }

    function render() {
      var css = cssColor(model)
      root.style.setProperty("--color-picker-color", css)
      var out = isOutOfGamut(space, model, gamut)
      setFlag(root, "data-out-of-gamut", out)
      root.setAttribute("data-space", space)
      if (hidden) {
        hidden.value = value
        hidden.disabled = disabled()
      }

      areas.forEach(function (area) {
        var ch = areaChannels(area)
        var rx = channelRange(space, ch.x)
        var ry = channelRange(space, ch.y)
        var bg = areaGradient(space, model, ch.x, ch.y, "to right")
        area.style.setProperty("--color-area-background", bg || "none")
        area.style.setProperty(
          "--area-x",
          fraction(model, space, ch.x) * 100 + "%"
        )
        area.style.setProperty(
          "--area-y",
          (1 - fraction(model, space, ch.y)) * 100 + "%"
        )
        setFlag(area, "data-disabled", disabled())
        setFlag(area, "data-readonly", readOnly())
        setFlag(area, "data-out-of-gamut", out)
        var canvas = area.querySelector("canvas")
        if (!bg) {
          if (!canvas) {
            canvas = document.createElement("canvas")
            canvas.className = "np-color-picker-area-canvas"
            canvas.setAttribute("data-np-color-picker-area-canvas", "")
            canvas.setAttribute("aria-hidden", "true")
            area.insertBefore(canvas, area.firstChild)
          }
          canvas.hidden = false
          paintArea(canvas, space, model, ch.x, ch.y, gamut, false)
        } else if (canvas) {
          canvas.hidden = true
        }
        var thumb = area.querySelector("[role='slider']")
        if (thumb) {
          var dx = digitsOf(rx.step)
          var dy = digitsOf(ry.step)
          thumb.tabIndex = disabled() ? -1 : 0
          if (!thumb.hasAttribute("data-label"))
            thumb.setAttribute(
              "aria-label",
              LABELS[ch.x] + " and " + LABELS[ch.y]
            )
          thumb.setAttribute("aria-valuemin", rx.min)
          thumb.setAttribute("aria-valuemax", rx.max)
          thumb.setAttribute("aria-valuenow", round(model[ch.x] || 0, dx))
          thumb.setAttribute(
            "aria-valuetext",
            LABELS[ch.x] +
              " " +
              round(model[ch.x] || 0, dx) +
              ", " +
              LABELS[ch.y] +
              " " +
              round(model[ch.y] || 0, dy)
          )
          if (disabled()) thumb.setAttribute("aria-disabled", "true")
          else thumb.removeAttribute("aria-disabled")
          if (readOnly()) thumb.setAttribute("aria-readonly", "true")
          else thumb.removeAttribute("aria-readonly")
          setFlag(thumb, "data-disabled", disabled())
        }
      })

      sliders.forEach(function (slider) {
        var channel = sliderChannel(slider)
        var range = channelRange(space, channel)
        var vertical = slider.getAttribute("data-orientation") === "vertical"
        var f = fraction(model, space, channel)
        slider.setAttribute("data-channel", channel)
        slider.style.setProperty(
          "--color-slider-background",
          sliderGradient(
            space,
            model,
            channel,
            gamut,
            vertical ? "to top" : "to right"
          )
        )
        slider.style.setProperty(
          "--color-slider-thumb-position",
          (vertical ? 1 - f : f) * 100 + "%"
        )
        setFlag(slider, "data-disabled", disabled())
        setFlag(slider, "data-readonly", readOnly())
        var thumb = slider.querySelector("[role='slider']")
        if (thumb) {
          thumb.setAttribute("data-channel", channel)
          thumb.tabIndex = disabled() ? -1 : 0
          if (!thumb.hasAttribute("data-label"))
            thumb.setAttribute("aria-label", LABELS[channel])
          thumb.setAttribute("aria-valuemin", range.min)
          thumb.setAttribute("aria-valuemax", range.max)
          thumb.setAttribute(
            "aria-valuenow",
            round(model[channel] || 0, digitsOf(range.step))
          )
          if (disabled()) thumb.setAttribute("aria-disabled", "true")
          else thumb.removeAttribute("aria-disabled")
          if (readOnly()) thumb.setAttribute("aria-readonly", "true")
          else thumb.removeAttribute("aria-readonly")
          setFlag(thumb, "data-disabled", disabled())
        }
      })

      swatches.forEach(function (swatch) {
        swatch.setAttribute("role", "img")
        swatch.setAttribute(
          "aria-label",
          colorName(clampToGamut(colorFromModel(space, model), gamut))
        )
      })

      inputs.forEach(function (input) {
        input.disabled = disabled()
        input.readOnly = readOnly()
        if (document.activeElement !== input) input.value = value
      })

      channelInputs.forEach(function (input) {
        var channel = input.getAttribute("data-channel")
        if (!channel || !hasChannel(space, channel)) return
        input.disabled = disabled()
        input.readOnly = readOnly()
        if (document.activeElement !== input) {
          input.value = String(
            round(
              model[channel] || 0,
              digitsOf(channelRange(space, channel).step)
            )
          )
        }
      })

      droppers.forEach(function (button) {
        button.disabled = disabled() || readOnly() || !window.EyeDropper
        setFlag(button, "data-unsupported", !window.EyeDropper)
      })

      lists.forEach(function (list) {
        setFlag(list, "data-disabled", disabled())
        var items = parts(list, "swatch-item")
        var active = null
        items.forEach(function (item) {
          var v = item.getAttribute("data-value") || ""
          var c = parseColor(v)
          var selected = sameColor(v, value)
          if (selected && !active) active = item
          item.setAttribute("role", "option")
          if (item.tagName === "BUTTON") item.type = "button"
          item.setAttribute("aria-selected", selected ? "true" : "false")
          if (!item.hasAttribute("data-label"))
            item.setAttribute("aria-label", c ? colorName(c) : v)
          item.style.setProperty("--color-picker-item-color", c ? toCss(c) : v)
          item.disabled = disabled()
          setFlag(item, "data-selected", selected)
        })
        if (!active) active = items[0]
        items.forEach(function (item) {
          item.setAttribute("tabindex", item === active ? "0" : "-1")
        })
      })
    }

    var form = hidden ? hidden.form : null
    function onReset(event) {
      setText(initial, "reset", event)
      commit("reset", event)
      setTimeout(render, 0)
    }
    if (form) form.addEventListener("reset", onReset)

    render()

    return {
      el: root,
      getValue: function () {
        return value
      },
      setValue: function (next, details) {
        var reason = (details && details.reason) || "imperative"
        var ok = setText(next, reason, details && details.event)
        if (ok) commit(reason, details && details.event)
        return ok
      },
      setFormat: function (next) {
        format = next
        value = modelToValue(space, model, format, gamut)
        render()
      },
      focus: function () {
        var el = root.querySelector(
          "[role='slider'], input, button, [role='option']"
        )
        if (el) el.focus()
      },
      destroy: function () {
        if (form) form.removeEventListener("reset", onReset)
        instances.delete(root)
      },
    }
  }

  function init(root) {
    if (!root) return null
    if (instances.has(root)) return instances.get(root)
    var instance = create(root)
    instances.set(root, instance)
    return instance
  }

  function initAll(scope) {
    var list = (scope || document).querySelectorAll(
      "[data-np-color-picker], .np-color-picker"
    )
    Array.prototype.forEach.call(list, init)
  }

  function get(root) {
    return instances.get(root) || null
  }

  window.NepuiColorPicker = {
    init: init,
    initAll: initAll,
    get: get,
    parseColor: parseColor,
    formatColor: formatColor,
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", function () {
      initAll()
    })
  else initAll()
})()
