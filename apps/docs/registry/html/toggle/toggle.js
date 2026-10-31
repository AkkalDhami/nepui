;(function () {
  "use strict"

  if (typeof document === "undefined" || document.__npToggle) return
  document.__npToggle = true

  const TOGGLE = ".np-toggle, [data-np-toggle]"
  const GROUP = ".np-toggle-group, [data-np-toggle-group]"
  const DISABLED = '[aria-disabled="true"], [data-disabled]'

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return

    const toggle = event.target.closest(TOGGLE)
    if (!toggle) return

    // Group items are handled by toggle-group.js.
    if (toggle.closest(GROUP)) return

    if (toggle.disabled === true || toggle.matches(DISABLED)) return

    const pressed = toggle.getAttribute("aria-pressed") !== "true"
    toggle.setAttribute("aria-pressed", pressed ? "true" : "false")

    toggle.dispatchEvent(
      new CustomEvent("np-toggle-change", {
        bubbles: true,
        detail: { pressed },
      })
    )
  })
})()
