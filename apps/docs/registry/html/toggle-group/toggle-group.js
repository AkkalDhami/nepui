;(function () {
  "use strict"

  if (typeof document === "undefined" || document.__npToggleGroup) return
  document.__npToggleGroup = true

  const GROUP = ".np-toggle-group, [data-np-toggle-group]"
  const ITEM = ".np-toggle, [data-np-toggle]"
  const DISABLED = '[aria-disabled="true"], [data-disabled]'
  const MULTIPLE = ".np-toggle-group-multiple, [data-multiple]"
  const VERTICAL = '.np-toggle-group-vertical, [data-orientation="vertical"]'

  const isDisabled = (el) => el.disabled === true || el.matches(DISABLED)

  const isPressed = (item) => item.getAttribute("aria-pressed") === "true"

  const setPressed = (item, pressed) => {
    item.setAttribute("aria-pressed", pressed ? "true" : "false")
  }

  /** Items that belong to this group, not to a group nested inside it. */
  const getItems = (group) =>
    Array.from(group.querySelectorAll(ITEM)).filter(
      (item) => item.closest(GROUP) === group
    )

  const getValue = (group) =>
    getItems(group)
      .filter(isPressed)
      .map((item) => item.getAttribute("value") ?? item.dataset.value)
      .filter((value) => value != null)

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return

    const item = event.target.closest(ITEM)
    if (!item) return

    const group = item.closest(GROUP)
    if (!group || isDisabled(item) || isDisabled(group)) return

    const pressed = !isPressed(item)

    if (!group.matches(MULTIPLE)) {
      for (const other of getItems(group)) {
        if (other !== item) setPressed(other, false)
      }
    }

    setPressed(item, pressed)

    group.dispatchEvent(
      new CustomEvent("np-toggle-group-change", {
        bubbles: true,
        detail: { item, pressed, value: getValue(group) },
      })
    )
  })

  document.addEventListener("keydown", (event) => {
    if (!(event.target instanceof Element)) return

    const item = event.target.closest(ITEM)
    if (!item) return

    const group = item.closest(GROUP)
    if (!group) return

    const vertical = group.matches(VERTICAL)
    const rtl = getComputedStyle(group).direction === "rtl"
    const nextKey = vertical ? "ArrowDown" : rtl ? "ArrowLeft" : "ArrowRight"
    const prevKey = vertical ? "ArrowUp" : rtl ? "ArrowRight" : "ArrowLeft"

    const items = getItems(group).filter((el) => !isDisabled(el))
    const index = items.indexOf(item)
    if (index === -1) return

    let target
    if (event.key === nextKey) target = items[(index + 1) % items.length]
    else if (event.key === prevKey)
      target = items[(index - 1 + items.length) % items.length]
    else if (event.key === "Home") target = items[0]
    else if (event.key === "End") target = items[items.length - 1]
    else return

    event.preventDefault()
    target.focus()
  })
})()
