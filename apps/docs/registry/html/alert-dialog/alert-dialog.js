;(function () {
  const supportsCommands =
    typeof HTMLButtonElement !== "undefined" &&
    "commandForElement" in HTMLButtonElement.prototype

  function getTarget(button) {
    const id = button.getAttribute("commandfor")
    return id ? document.getElementById(id) : null
  }

  function run(button) {
    const command = button.getAttribute("command")
    const target = getTarget(button)
    if (!(target instanceof HTMLDialogElement)) return

    if (command === "show-modal" && !target.open) target.showModal()
    else if (command === "close") target.close(button.value || undefined)
    else if (command === "request-close") {
      if (typeof target.requestClose === "function") target.requestClose()
      else target.close()
    }
  }

  if (!supportsCommands) {
    document.addEventListener("click", (event) => {
      const button =
        event.target instanceof Element
          ? event.target.closest("button[commandfor][command]")
          : null
      if (!button || button.disabled) return
      run(button)
    })
  }
})()
