;(() => {
  const ROOT = ".np-number-input, [data-np-number-input]"
  const INPUT = ".np-number-input-input, [data-np-number-input-input]"
  const INCREMENT =
    ".np-number-input-increment, [data-np-number-input-increment]"
  const DECREMENT =
    ".np-number-input-decrement, [data-np-number-input-decrement]"
  const SCRUB = ".np-number-input-scrub-area, [data-np-number-input-scrub-area]"
  const instances = new WeakMap()

  const num = (value, fallback) => {
    const parsed = parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }
  const flag = (el, name) =>
    el.hasAttribute(name) && el.getAttribute(name) !== "false"
  const decimals = (n) => {
    const text = String(n)
    if (text.includes("e-")) return parseInt(text.split("e-")[1], 10)
    const dot = text.indexOf(".")
    return dot < 0 ? 0 : text.length - dot - 1
  }

  function create(root) {
    const existing = instances.get(root)
    if (existing) return existing
    const input = root.querySelector(INPUT)
    if (!input) return null
    const increment = root.querySelector(INCREMENT)
    const decrement = root.querySelector(DECREMENT)
    const scrub = root.querySelector(SCRUB)
    const abort = new AbortController()
    const on = (target, type, handler, options) =>
      target.addEventListener(type, handler, {
        ...options,
        signal: abort.signal,
      })

    const min = () => num(input.min, -Infinity)
    const max = () => num(input.max, Infinity)
    const step = () => (input.step === "any" ? 1 : num(input.step, 1))
    const smallStep = () => num(root.getAttribute("data-small-step"), 0.1)
    const largeStep = () => num(root.getAttribute("data-large-step"), 10)
    const locked = () => input.disabled || input.readOnly
    const current = () => {
      const value = parseFloat(input.value)
      return Number.isFinite(value) ? value : null
    }
    const clamp = (value) => Math.min(Math.max(value, min()), max())
    const amountFor = (event) =>
      event.shiftKey ? largeStep() : event.altKey ? smallStep() : step()

    function sync() {
      const value = current()
      if (decrement)
        decrement.disabled = locked() || (value !== null && value <= min())
      if (increment)
        increment.disabled = locked() || (value !== null && value >= max())
      root.toggleAttribute("data-filled", value !== null)
    }

    function setValue(next) {
      input.value = Number.isFinite(next) ? String(clamp(next)) : ""
      sync()
      input.dispatchEvent(new Event("input", { bubbles: true }))
      input.dispatchEvent(new Event("change", { bubbles: true }))
    }

    function stepBy(direction, amount) {
      if (locked()) return false
      const base = current()
      const from = base === null ? 0 : base
      const places = Math.max(decimals(from), decimals(amount))
      const next = clamp(Number((from + direction * amount).toFixed(places)))
      if (base !== null && next === base) return false
      setValue(next)
      return true
    }

    let delay = 0
    let repeat = 0
    const stopRepeat = () => {
      window.clearTimeout(delay)
      window.clearInterval(repeat)
      delay = 0
      repeat = 0
    }

    function bindButton(button, direction) {
      if (!button) return
      button.setAttribute("tabindex", "-1")
      on(button, "pointerdown", (event) => {
        if (event.button !== 0 || button.disabled) return
        event.preventDefault()
        if (event.pointerType === "mouse") input.focus({ preventScroll: true })
        const amount = amountFor(event)
        stepBy(direction, amount)
        delay = window.setTimeout(() => {
          repeat = window.setInterval(() => {
            if (!stepBy(direction, amount)) stopRepeat()
          }, 60)
        }, 400)
      })
      on(button, "click", (event) => {
        if (event.detail === 0) stepBy(direction, amountFor(event))
      })
      on(button, "pointerleave", stopRepeat)
    }

    bindButton(increment, 1)
    bindButton(decrement, -1)
    on(document, "pointerup", stopRepeat)
    on(document, "pointercancel", stopRepeat)

    on(input, "keydown", (event) => {
      if (locked() || event.defaultPrevented) return
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault()
        stepBy(event.key === "ArrowUp" ? 1 : -1, amountFor(event))
      } else if (event.key === "PageUp" || event.key === "PageDown") {
        event.preventDefault()
        stepBy(event.key === "PageUp" ? 1 : -1, largeStep())
      } else if (event.key === "Home" && Number.isFinite(min())) {
        event.preventDefault()
        setValue(min())
      } else if (event.key === "End" && Number.isFinite(max())) {
        event.preventDefault()
        setValue(max())
      }
    })

    on(input, "input", sync)
    on(input, "blur", () => {
      const value = current()
      if (value !== null && clamp(value) !== value) setValue(clamp(value))
      sync()
    })

    if (flag(root, "data-allow-wheel-scrub")) {
      on(
        input,
        "wheel",
        (event) => {
          if (document.activeElement !== input || locked()) return
          event.preventDefault()
          stepBy(event.deltaY < 0 ? 1 : -1, step())
        },
        { passive: false }
      )
    }

    if (scrub) {
      const vertical = () => scrub.getAttribute("data-direction") === "vertical"
      const sensitivity = () =>
        Math.max(1, num(root.getAttribute("data-pixel-sensitivity"), 2))
      let last = null
      let travel = 0

      on(scrub, "pointerdown", (event) => {
        if (event.button !== 0 || locked()) return
        event.preventDefault()
        scrub.setPointerCapture(event.pointerId)
        last = vertical() ? event.clientY : event.clientX
        travel = 0
        root.setAttribute("data-scrubbing", "")
        input.focus({ preventScroll: true })
      })
      on(scrub, "pointermove", (event) => {
        if (last === null) return
        const point = vertical() ? event.clientY : event.clientX
        travel += vertical() ? last - point : point - last
        last = point
        const steps = Math.trunc(travel / sensitivity())
        if (steps !== 0) {
          travel -= steps * sensitivity()
          stepBy(Math.sign(steps), step() * Math.abs(steps))
        }
      })
      const end = (event) => {
        if (last === null) return
        last = null
        root.removeAttribute("data-scrubbing")
        if (scrub.hasPointerCapture(event.pointerId))
          scrub.releasePointerCapture(event.pointerId)
      }
      on(scrub, "pointerup", end)
      on(scrub, "pointercancel", end)
    }

    sync()

    const api = {
      root,
      input,
      get value() {
        return current()
      },
      increment: (amount) => stepBy(1, amount === undefined ? step() : amount),
      decrement: (amount) => stepBy(-1, amount === undefined ? step() : amount),
      setValue,
      destroy() {
        stopRepeat()
        abort.abort()
        instances.delete(root)
      },
    }
    instances.set(root, api)
    return api
  }

  function init(scope) {
    ;(scope || document).querySelectorAll(ROOT).forEach((root) => create(root))
  }

  window.NepuiNumberInput = {
    init,
    create,
    get: (root) => instances.get(root) || null,
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", () => init())
  else init()
})()
