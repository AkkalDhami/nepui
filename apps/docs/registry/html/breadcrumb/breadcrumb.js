;(function () {
  "use strict"

  if (typeof document === "undefined" || window.npBreadcrumb) return

  const NAV = ".np-breadcrumb, [data-np-breadcrumb]"
  const LIST = ".np-breadcrumb-list, [data-np-breadcrumb-list]"
  const ITEM = ".np-breadcrumb-item, [data-np-breadcrumb-item]"
  const SEP = ".np-breadcrumb-separator, [data-np-breadcrumb-separator]"
  const TOGGLE = "[data-np-breadcrumb-toggle]"
  const HIDDEN = "[data-np-collapsed]"

  const initialized = new WeakSet()

  const readInt = (value, fallback) => {
    const n = parseInt(value, 10)
    return Number.isNaN(n) || n < 0 ? fallback : n
  }

  const nextSeparator = (item) => {
    const next = item.nextElementSibling
    return next && next.matches(SEP) ? next : null
  }

  function collapse(nav) {
    if (!nav || nav.hasAttribute("data-collapsed")) return

    const max = readInt(nav.getAttribute("data-max-items"), 0)
    const list = nav.querySelector(LIST)
    if (!max || !list) return

    const items = Array.from(list.children).filter((el) => el.matches(ITEM))
    if (items.length <= max) return

    const before = readInt(nav.getAttribute("data-items-before"), 1)
    const after = readInt(nav.getAttribute("data-items-after"), 2)
    const hiddenItems = items.slice(before, items.length - after)
    if (hiddenItems.length === 0) return

    // Hide each middle item and the separator after it. The separator after the
    // last hidden item stays: it now follows the ellipsis.
    hiddenItems.forEach((item, index) => {
      item.hidden = true
      item.setAttribute("data-np-collapsed", "")

      const separator = nextSeparator(item)
      if (separator && index < hiddenItems.length - 1) {
        separator.hidden = true
        separator.setAttribute("data-np-collapsed", "")
      }
    })

    const button = document.createElement("button")
    button.type = "button"
    button.className = "np-breadcrumb-ellipsis"
    button.setAttribute("aria-expanded", "false")
    button.setAttribute(
      "aria-label",
      nav.getAttribute("data-ellipsis-label") || "Show hidden items"
    )

    const toggle = document.createElement("li")
    toggle.className = "np-breadcrumb-item"
    toggle.setAttribute("data-np-breadcrumb-toggle", "")
    toggle.appendChild(button)

    list.insertBefore(toggle, hiddenItems[0])
    nav.setAttribute("data-collapsed", "")
  }

  function expand(nav) {
    if (!nav || !nav.hasAttribute("data-collapsed")) return

    const revealed = Array.from(nav.querySelectorAll(HIDDEN))
    revealed.forEach((el) => {
      el.hidden = false
      el.removeAttribute("data-np-collapsed")
    })

    const toggle = nav.querySelector(TOGGLE)
    if (toggle) toggle.remove()
    nav.removeAttribute("data-collapsed")

    const firstLink = revealed
      .find((el) => el.matches(ITEM))
      ?.querySelector("a, button")
    if (firstLink) firstLink.focus()

    nav.dispatchEvent(
      new CustomEvent("np-breadcrumb-expand", { bubbles: true })
    )
  }

  function init(root) {
    const scope = root || document
    const navs = scope.querySelectorAll(
      ".np-breadcrumb[data-max-items], [data-np-breadcrumb][data-max-items]"
    )
    navs.forEach((nav) => {
      if (initialized.has(nav)) return
      initialized.add(nav)
      collapse(nav)
    })
  }

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return

    const toggle = event.target.closest(TOGGLE)
    if (!toggle) return

    expand(toggle.closest(NAV))
  })

  window.npBreadcrumb = { init, collapse, expand }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init())
  } else {
    init()
  }
})()
