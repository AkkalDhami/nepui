;(function () {
  const SELECTOR = ".np-copy-button, [data-np-copy-button]"
  const DEFAULT_TIMEOUT = 2000
  const DEFAULT_COPIED_TEXT = "Copied"

  const COPY_ICON = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5.5 5.5V3.75A1.75 1.75 0 0 1 7.25 2h5A1.75 1.75 0 0 1 14 3.75v5A1.75 1.75 0 0 1 12.25 10.5H10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <rect x="2" y="5.5" width="8.5" height="8.5" rx="1.75" stroke="currentColor" stroke-width="1.5"/>
    </svg>`

  const CHECK_ICON = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5l3.25 3.25L13 4.75" pathLength="1" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`

  const timers = new WeakMap()

  const el = (tag, attrs = {}, html) => {
    const node = document.createElement(tag)
    for (const [key, value] of Object.entries(attrs)) {
      node.setAttribute(key, value)
    }
    if (html != null) node.innerHTML = html
    return node
  }

  /* Build icon + label markup once */
  const enhance = (button) => {
    if (button.hasAttribute("data-np-ready")) return

    const label = button.textContent.trim()
    const copiedText = button.dataset.copiedText || DEFAULT_COPIED_TEXT

    button.textContent = ""

    const icons = el("span", { "data-np-icon-stack": "" })
    icons.append(
      el("span", { "data-copy-icon": "" }, COPY_ICON),
      el("span", { "data-copied-icon": "" }, CHECK_ICON)
    )
    button.append(icons)

    if (label) {
      const labels = el("span", { "data-np-label-stack": "" })
      const copyLabel = el("span", { "data-copy-label": "" })
      const copiedLabel = el("span", { "data-copied-label": "" })

      copyLabel.textContent = label
      copiedLabel.textContent = copiedText
      labels.append(copyLabel, copiedLabel)
      button.append(labels)
    }

    if (!button.hasAttribute("aria-label")) {
      button.setAttribute("aria-label", label || "Copy to clipboard")
    }

    button.dataset.copyAriaLabel = button.getAttribute("aria-label")
    button.dataset.copiedAriaLabel =
      button.dataset.copiedAriaLabel || button.getAttribute("aria-label")
    button.setAttribute("data-np-ready", "")
  }

  const getText = (button) => {
    if (button.dataset.copy != null) return button.dataset.copy

    const target = button.dataset.copyTarget
    if (!target) return null

    const element = document.querySelector(target)
    if (!element) return null

    return "value" in element ? element.value : element.textContent
  }

  const writeText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return
    }

    // Fallback for insecure contexts (http, file://) and browsers without
    // the async clipboard API.
    const active = document.activeElement
    const selection = document.getSelection()
    const previousRange =
      selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null

    const textarea = el("textarea")
    textarea.value = text
    // Keep it off-screen but focusable/selectable (display:none or
    // visibility:hidden makes selection fail in some engines).
    textarea.setAttribute("readonly", "")
    textarea.setAttribute("aria-hidden", "true")
    textarea.style.cssText =
      "position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:0;opacity:0;pointer-events:none"
    document.body.append(textarea)

    let ok = false
    try {
      textarea.focus({ preventScroll: true })
      // select() is a no-op on iOS Safari; setSelectionRange is required.
      textarea.select()
      textarea.setSelectionRange(0, text.length)
      ok = document.execCommand("copy")
    } finally {
      textarea.remove()
      // Restore whatever the user had focused/selected.
      if (active && typeof active.focus === "function") {
        active.focus({ preventScroll: true })
      }
      if (selection && previousRange) {
        selection.removeAllRanges()
        selection.addRange(previousRange)
      }
    }

    if (!ok) throw new Error("Copy failed")
  }

  const setCopied = (button, copied) => {
    button.toggleAttribute("data-copied", copied)

    button.setAttribute(
      "aria-label",
      copied
        ? button.dataset.copiedAriaLabel || "Copied"
        : button.dataset.copyAriaLabel || "Copy to clipboard"
    )
  }

  const copy = async (button) => {
    const text = getText(button)
    if (text == null) return

    try {
      await writeText(text.trim())
    } catch {
      button.dispatchEvent(
        new CustomEvent("np-copy-error", { bubbles: true, detail: { text } })
      )
      return
    }

    clearTimeout(timers.get(button))
    setCopied(button, true)

    button.dispatchEvent(
      new CustomEvent("np-copy", { bubbles: true, detail: { text } })
    )

    timers.set(
      button,
      setTimeout(
        () => setCopied(button, false),
        Number(button.dataset.copyTimeout) || DEFAULT_TIMEOUT
      )
    )
  }

  const init = (root = document) => {
    root.querySelectorAll(SELECTOR).forEach(enhance)
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(SELECTOR)

    if (!button || button.disabled) return
    if (button.getAttribute("aria-disabled") === "true") return

    enhance(button)
    copy(button)
  })

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init())
  } else {
    init()
  }

  window.npCopyButton = { init }
})()
