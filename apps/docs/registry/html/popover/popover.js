const SELECTOR = "[popover].np-popover, [popover][data-np-popover]"
const FOCUSABLE =
  '[autofocus], a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
const OPPOSITE = { top: "bottom", bottom: "top", left: "right", right: "left" }
const MIN_HEIGHT = 96

const NATIVE =
  typeof CSS !== "undefined" &&
  CSS.supports("position-area", "bottom") &&
  CSS.supports("anchor-name", "--np")

const prefs = new WeakMap()
const anchors = new WeakMap()
const cleanups = new WeakMap()
const lastInvoker = new Map()
let counter = 0

function isPopover(node) {
  return node instanceof HTMLElement && node.matches(SELECTOR)
}

function readNumber(value, fallback) {
  const number = parseFloat(value)
  return Number.isFinite(number) ? number : fallback
}

function readPrefs(popover) {
  if (!prefs.has(popover)) {
    prefs.set(popover, {
      side: popover.getAttribute("data-side") || "bottom",
      align: popover.getAttribute("data-align") || "center",
      sideOffset: readNumber(popover.getAttribute("data-side-offset"), 4),
      alignOffset: readNumber(popover.getAttribute("data-align-offset"), 0),
      padding: readNumber(popover.getAttribute("data-collision-padding"), 8),
    })
  }
  return prefs.get(popover)
}

function findAnchor(popover, source) {
  const selector = popover.getAttribute("data-anchor")
  if (selector) {
    const custom = document.querySelector(selector)
    if (custom) return custom
  }
  if (source instanceof Element) return source
  if (lastInvoker.has(popover.id)) return lastInvoker.get(popover.id)
  if (popover.id) {
    const id = CSS.escape(popover.id)
    return document.querySelector(
      `[popovertarget="${id}"], [commandfor="${id}"]`
    )
  }
  return null
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max))
}

export function position(popover) {
  const anchor = anchors.get(popover)
  if (!anchor || !popover.matches(":popover-open")) return

  const pref = readPrefs(popover)
  const { sideOffset: so, alignOffset: ao, padding: pad, align } = pref

  popover.style.removeProperty("--np-popover-max-height")

  const rect = anchor.getBoundingClientRect()
  const vw = document.documentElement.clientWidth
  const vh = document.documentElement.clientHeight
  const w = popover.offsetWidth
  let h = popover.offsetHeight
  const rtl = getComputedStyle(anchor).direction === "rtl"

  let side = pref.side
  if (side === "inline-start") side = rtl ? "right" : "left"
  if (side === "inline-end") side = rtl ? "left" : "right"

  const space = {
    top: rect.top - pad,
    bottom: vh - rect.bottom - pad,
    left: rect.left - pad,
    right: vw - rect.right - pad,
  }
  const vertical = side === "top" || side === "bottom"
  const needed = vertical ? h + so : w + so
  if (space[side] < needed && space[OPPOSITE[side]] > space[side]) {
    side = OPPOSITE[side]
  }

  const isVertical = side === "top" || side === "bottom"
  const available = isVertical ? space[side] - so : vh - pad * 2
  const maxHeight = Math.max(MIN_HEIGHT, Math.floor(available))
  if (h > maxHeight) h = maxHeight
  popover.style.setProperty("--np-popover-max-height", `${maxHeight}px`)

  popover.setAttribute("data-side", side)
  popover.setAttribute("data-align", align)

  if (NATIVE) {
    popover.style.setProperty("--np-popover-offset", `${so}px`)
    popover.style.setProperty("--np-popover-edge", `${pad}px`)
    popover.style.setProperty("--np-popover-align-offset", `${ao}px`)
    return
  }

  let x
  let y
  if (isVertical) {
    y = side === "bottom" ? rect.bottom + so : rect.top - h - so
    if (align === "start") x = rtl ? rect.right - w - ao : rect.left + ao
    else if (align === "end") x = rtl ? rect.left + ao : rect.right - w - ao
    else x = rect.left + (rect.width - w) / 2 + ao
  } else {
    x = side === "right" ? rect.right + so : rect.left - w - so
    if (align === "start") y = rect.top + ao
    else if (align === "end") y = rect.bottom - h - ao
    else y = rect.top + (rect.height - h) / 2 + ao
  }

  x = clamp(x, pad, Math.max(pad, vw - w - pad))
  y = clamp(y, pad, Math.max(pad, vh - h - pad))

  const cx = clamp(rect.left + rect.width / 2 - x, 0, w)
  const cy = clamp(rect.top + rect.height / 2 - y, 0, h)
  const origin =
    side === "bottom"
      ? `${cx}px 0`
      : side === "top"
        ? `${cx}px 100%`
        : side === "right"
          ? `0 ${cy}px`
          : `100% ${cy}px`

  popover.style.left = `${x}px`
  popover.style.top = `${y}px`
  popover.style.setProperty("--transform-origin", origin)
}

function focusInside(popover) {
  if (popover.getAttribute("data-initial-focus") === "none") return
  if (popover.contains(document.activeElement)) return
  const target =
    [...popover.querySelectorAll(FOCUSABLE)].find(
      (el) => el.offsetParent !== null
    ) || popover
  if (target === popover && !popover.hasAttribute("tabindex")) {
    popover.setAttribute("tabindex", "-1")
  }
  target.focus({ preventScroll: true })
}

function start(popover, source) {
  stop(popover)
  const anchor = findAnchor(popover, source)
  if (!anchor) return
  anchors.set(popover, anchor)

  let restoreAnchorName = null
  if (NATIVE) {
    const name = `--np-popover-${popover.id || ++counter}`
    const previous = anchor.style.getPropertyValue("anchor-name")
    anchor.style.setProperty("anchor-name", name)
    popover.style.setProperty("position-anchor", name)
    restoreAnchorName = () => {
      if (previous) anchor.style.setProperty("anchor-name", previous)
      else anchor.style.removeProperty("anchor-name")
    }
  }

  position(popover)

  let frame = 0
  const update = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => position(popover))
  }
  const observer = new ResizeObserver(update)
  observer.observe(popover)
  window.addEventListener("resize", update)
  window.addEventListener("scroll", update, true)

  cleanups.set(popover, () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    window.removeEventListener("resize", update)
    window.removeEventListener("scroll", update, true)
    if (restoreAnchorName) restoreAnchorName()
  })

  focusInside(popover)
}

function stop(popover) {
  const cleanup = cleanups.get(popover)
  if (cleanup) cleanup()
  cleanups.delete(popover)
}

document.addEventListener(
  "click",
  (event) => {
    const invoker =
      event.target instanceof Element
        ? event.target.closest("[popovertarget], [commandfor]")
        : null
    if (!invoker) return
    const id =
      invoker.getAttribute("popovertarget") ||
      invoker.getAttribute("commandfor")
    if (id) lastInvoker.set(id, invoker)
  },
  true
)

document.addEventListener(
  "toggle",
  (event) => {
    const popover = event.target
    if (!isPopover(popover)) return
    if (event.newState === "open") start(popover, event.source)
    else stop(popover)
  },
  true
)
