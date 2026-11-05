const config = {
  limit: 3,
  timeout: 5000,
  swipeThreshold: 40,
  swipeDirection: ["up", "left", "right"],
}

const SVG_OPEN =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'

const ICONS = {
  success: `${SVG_OPEN}<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
  info: `${SVG_OPEN}<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
  warning: `${SVG_OPEN}<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`,
  error: `${SVG_OPEN}<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`,
  loading: `${SVG_OPEN}<path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`,
  close: `${SVG_OPEN}<path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
}

const toasts = []
let viewport = null
let expanded = false
let swiping = false
let counter = 0

function find(id) {
  return toasts.find((item) => item.id === id)
}

function isPaused() {
  return expanded || swiping || document.hidden
}

function ensureViewport() {
  if (viewport && viewport.isConnected) return viewport

  viewport = document.createElement("div")
  viewport.className = "np-toast-viewport"
  viewport.setAttribute("role", "region")
  viewport.setAttribute("aria-label", "Notifications")
  viewport.tabIndex = -1
  if (typeof viewport.showPopover === "function") {
    viewport.setAttribute("popover", "manual")
  }
  document.body.append(viewport)
  if (viewport.hasAttribute("popover")) viewport.showPopover()

  viewport.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "touch") setExpanded(true)
  })
  viewport.addEventListener("pointerleave", () => {
    if (!viewport.contains(document.activeElement)) setExpanded(false)
  })
  viewport.addEventListener("focusin", () => setExpanded(true))
  viewport.addEventListener("focusout", (event) => {
    if (viewport.contains(event.relatedTarget)) return
    if (!viewport.matches(":hover")) setExpanded(false)
  })

  return viewport
}

function raiseViewport() {
  if (!viewport || !viewport.hasAttribute("popover")) return
  if (!document.querySelector("dialog[open]")) return
  viewport.hidePopover()
  viewport.showPopover()
}

function setExpanded(value) {
  if (expanded === value) return
  expanded = value
  layout()
  syncTimers()
}

function measure(item) {
  const style = item.el.style
  style.setProperty("--toast-height", "auto")
  style.setProperty("--toast-frontmost-height", "auto")
  const height = item.el.offsetHeight
  return height
}

function layout() {
  const frontHeight = toasts.length ? toasts[0].height : 0
  let offset = 0

  toasts.forEach((item, index) => {
    const style = item.el.style
    style.setProperty("--toast-index", String(index))
    style.setProperty("--toast-height", `${item.height}px`)
    style.setProperty("--toast-frontmost-height", `${frontHeight}px`)
    style.setProperty("--toast-offset-y", `${offset}px`)
    offset += item.height

    item.el.toggleAttribute("data-expanded", expanded)
    item.content.toggleAttribute("data-expanded", expanded)
    item.content.toggleAttribute("data-behind", index > 0)
    item.el.toggleAttribute("data-limited", index >= config.limit)
  })
}

function start(item) {
  if (item.remaining <= 0) return
  item.started = Date.now()
  item.timer = setTimeout(() => close(item.id), item.remaining)
}

function pause(item) {
  if (!item.timer) return
  clearTimeout(item.timer)
  item.timer = 0
  item.remaining -= Date.now() - item.started
}

function syncTimers() {
  toasts.forEach((item) => {
    if (item.duration <= 0) return
    if (isPaused()) pause(item)
    else if (!item.timer) start(item)
  })
}

function schedule(item) {
  clearTimeout(item.timer)
  item.timer = 0
  const fallback = item.options.type === "loading" ? 0 : config.timeout
  item.duration = item.options.timeout ?? fallback
  item.remaining = item.duration
  if (item.duration > 0 && !isPaused()) start(item)
}

function button(classes, label) {
  const element = document.createElement("button")
  element.type = "button"
  element.className = classes
  if (label !== undefined) element.textContent = label
  return element
}

function render(item) {
  const { title, description, type, actionProps } = item.options
  const nodes = []

  item.el.setAttribute("role", type === "error" ? "alert" : "status")
  if (type) item.el.setAttribute("data-type", type)
  else item.el.removeAttribute("data-type")

  if (ICONS[type] && type !== "close") {
    const icon = document.createElement("span")
    icon.className = "np-toast-icon"
    if (type === "loading") icon.setAttribute("data-spin", "")
    icon.innerHTML = ICONS[type]
    nodes.push(icon)
  }

  const body = document.createElement("div")
  body.className = "np-toast-body"
  if (title) {
    const heading = document.createElement("h2")
    heading.className = "np-toast-title"
    heading.textContent = title
    body.append(heading)
  }
  if (description) {
    const text = document.createElement("p")
    text.className = "np-toast-description"
    text.textContent = description
    body.append(text)
  }
  nodes.push(body)

  if (actionProps && actionProps.children) {
    const action = button(
      "np-button np-button-sm np-toast-action",
      actionProps.children
    )
    action.addEventListener("click", (event) => {
      if (typeof actionProps.onClick === "function") actionProps.onClick(event)
      if (!event.defaultPrevented) close(item.id)
    })
    nodes.push(action)
  }

  const closeButton = button(
    "np-button np-button-ghost np-button-icon-sm np-toast-close np-button-rounded"
  )
  closeButton.setAttribute("aria-label", "Close toast")
  closeButton.innerHTML = `<span class="np-toast-close-icon">${ICONS.close}</span>`
  closeButton.addEventListener("click", () => close(item.id))
  nodes.push(closeButton)

  item.content.replaceChildren(...nodes)
}

function attachSwipe(item) {
  const el = item.el
  let origin = null

  const move = (mx, my) => {
    el.style.setProperty("--toast-swipe-movement-x", `${mx}px`)
    el.style.setProperty("--toast-swipe-movement-y", `${my}px`)
  }

  el.addEventListener("pointerdown", (event) => {
    if (
      event.button !== 0 ||
      event.target.closest("button, a, input, select, textarea")
    )
      return
    origin = { x: event.clientX, y: event.clientY, mx: 0, my: 0 }
    el.setPointerCapture(event.pointerId)
    el.setAttribute("data-swiping", "")
    swiping = true
    syncTimers()
  })

  el.addEventListener("pointermove", (event) => {
    if (!origin) return
    const directions = item.options.swipeDirection || config.swipeDirection
    let mx = event.clientX - origin.x
    let my = event.clientY - origin.y
    if (mx < 0 && !directions.includes("left")) mx = 0
    if (mx > 0 && !directions.includes("right")) mx = 0
    if (my < 0 && !directions.includes("up")) my = 0
    if (my > 0 && !directions.includes("down")) my = 0
    origin.mx = mx
    origin.my = my
    move(mx, my)
  })

  const end = () => {
    if (!origin) return
    const { mx, my } = origin
    origin = null
    swiping = false
    el.removeAttribute("data-swiping")

    if (Math.max(Math.abs(mx), Math.abs(my)) >= config.swipeThreshold) {
      const direction =
        Math.abs(mx) > Math.abs(my)
          ? mx < 0
            ? "left"
            : "right"
          : my < 0
            ? "up"
            : "down"
      el.setAttribute("data-swipe-direction", direction)
      close(item.id)
    } else {
      move(0, 0)
      syncTimers()
    }
  }

  el.addEventListener("pointerup", end)
  el.addEventListener("pointercancel", end)
  el.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close(item.id)
  })
}

function normalize(input, extra) {
  if (typeof input === "string") return { title: input, ...extra }
  return { ...input, ...extra }
}

export function add(input, extra) {
  const options = normalize(input, extra)
  const id = options.id ?? `np-toast-${++counter}`
  if (find(id)) return update(id, options)

  const el = document.createElement("div")
  el.className = "np-toast"
  el.tabIndex = 0
  el.setAttribute("aria-atomic", "true")
  el.setAttribute("data-starting-style", "")
  el.style.setProperty("--toast-swipe-movement-x", "0px")
  el.style.setProperty("--toast-swipe-movement-y", "0px")

  const content = document.createElement("div")
  content.className = "np-toast-content"
  el.append(content)

  const item = {
    id,
    el,
    content,
    options,
    height: 0,
    timer: 0,
    remaining: 0,
    duration: 0,
    started: 0,
    closing: false,
  }
  render(item)

  ensureViewport().prepend(el)
  raiseViewport()
  item.height = measure(item)
  toasts.unshift(item)
  layout()
  attachSwipe(item)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.removeAttribute("data-starting-style"))
  })

  schedule(item)
  return id
}

export function update(id, patch = {}) {
  const item = find(id)
  if (!item || item.closing) return id
  item.options = { ...item.options, ...normalize(patch) }
  render(item)
  item.height = measure(item)
  layout()
  schedule(item)
  return id
}

export function close(id) {
  if (id === undefined) {
    ;[...toasts].forEach((item) => close(item.id))
    return
  }

  const item = find(id)
  if (!item || item.closing) return

  item.closing = true
  clearTimeout(item.timer)
  item.timer = 0
  toasts.splice(toasts.indexOf(item), 1)
  item.el.setAttribute("data-ending-style", "")
  layout()
  if (typeof item.options.onClose === "function") item.options.onClose()
  if (!toasts.length) setExpanded(false)

  setTimeout(() => item.el.remove(), 600)
}

function pick(value, argument) {
  const resolved = typeof value === "function" ? value(argument) : value
  return normalize(resolved ?? {})
}

export function promise(task, messages = {}) {
  const id = add({ ...pick(messages.loading), type: "loading" })
  task.then(
    (result) =>
      update(id, {
        ...pick(messages.success, result),
        type: "success",
        timeout: undefined,
      }),
    (error) =>
      update(id, {
        ...pick(messages.error, error),
        type: "error",
        timeout: undefined,
      })
  )
  return task
}

export function configure(options = {}) {
  Object.assign(config, options)
  layout()
}

export const toast = {
  add,
  update,
  close,
  promise,
  configure,
  success: (title, extra) => add(title, { ...extra, type: "success" }),
  info: (title, extra) => add(title, { ...extra, type: "info" }),
  warning: (title, extra) => add(title, { ...extra, type: "warning" }),
  error: (title, extra) => add(title, { ...extra, type: "error" }),
  loading: (title, extra) => add(title, { ...extra, type: "loading" }),
}

export default toast

document.addEventListener("visibilitychange", syncTimers)

document.addEventListener("click", (event) => {
  const trigger =
    event.target instanceof Element
      ? event.target.closest("[data-np-toast-trigger]")
      : null
  if (!trigger) return

  const data = trigger.dataset
  const options = {
    title: data.toastTitle,
    description: data.toastDescription,
    type: data.toastType,
  }
  if (data.toastTimeout !== undefined)
    options.timeout = Number(data.toastTimeout)
  if (data.toastAction) options.actionProps = { children: data.toastAction }

  if (data.toastPromise !== undefined) {
    const delay = Number(data.toastPromise) || 2000
    const task = new Promise((resolve, reject) => {
      setTimeout(data.toastFail !== undefined ? reject : resolve, delay)
    })
    promise(task, {
      loading: data.toastLoading || "Loading…",
      success: data.toastSuccess || "Done",
      error: data.toastError || "Something went wrong",
    }).catch(() => {})
    return
  }

  add(options)
})

if (typeof window !== "undefined" && !window.npToast) window.npToast = toast
