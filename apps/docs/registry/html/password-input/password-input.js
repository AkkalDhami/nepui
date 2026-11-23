;(function () {
  var ROOT = ".np-password-input, [data-np-password-input]"
  var CONTROL = ".np-password-input-control, [data-np-password-input-control]"
  var TOGGLE = ".np-password-input-toggle, [data-np-password-input-toggle]"
  var ACTION = ".np-password-input-action, [data-np-password-input-action]"
  var STRENGTH =
    ".np-password-input-strength, [data-np-password-input-strength]"
  var REQUIREMENTS =
    ".np-password-input-requirements, [data-np-password-input-requirements]"
  var FIELD = ".np-field, [data-np-field]"
  var LABELS = ["Enter a password", "Weak", "Fair", "Good", "Strong"]
  var CHARACTERS =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%"
  var idCounter = 0

  var RULES = {
    length: function (value, element) {
      return value.length >= (Number(element.getAttribute("data-min")) || 8)
    },
    number: function (value) {
      return /\d/.test(value)
    },
    letter: function (value) {
      return /[A-Za-z]/.test(value)
    },
    case: function (value) {
      return /[a-z]/.test(value) && /[A-Z]/.test(value)
    },
    symbol: function (value) {
      return /[^A-Za-z0-9]/.test(value)
    },
  }

  function defaultScore(value) {
    if (!value) return 0
    var passed = [
      value.length >= 8,
      /\d/.test(value),
      /[a-z]/.test(value) && /[A-Z]/.test(value),
      /[^A-Za-z0-9]/.test(value),
    ].filter(Boolean).length
    return Math.max(1, passed)
  }

  function randomPassword(length) {
    var out = ""
    var bytes
    if (window.crypto && window.crypto.getRandomValues)
      bytes = window.crypto.getRandomValues(new Uint32Array(length))
    else {
      bytes = []
      for (var i = 0; i < length; i++)
        bytes.push(Math.floor(Math.random() * 4294967296))
    }
    for (var j = 0; j < length; j++)
      out += CHARACTERS.charAt(bytes[j] % CHARACTERS.length)
    return out
  }

  function init(root) {
    if (root.hasAttribute("data-np-password-input-ready")) return
    var input = root.querySelector(CONTROL)
    if (!input) return
    root.setAttribute("data-np-password-input-ready", "")

    var toggle = root.querySelector(TOGGLE)
    var scope = root.closest(FIELD) || root.parentElement || root
    var strength = scope.querySelector(STRENGTH)
    var requirements = scope.querySelector(REQUIREMENTS)
    var form = input.form

    if (!input.id) input.id = "np-password-input-" + ++idCounter

    // ── visibility ──────────────────────────────────────────────
    function isVisible() {
      return input.type === "text"
    }

    function setVisible(visible, reason, event) {
      if (visible === isVisible()) return false
      input.type = visible ? "text" : "password"
      root.toggleAttribute("data-visible", visible)
      if (toggle)
        toggle.setAttribute("aria-pressed", visible ? "true" : "false")
      root.dispatchEvent(
        new CustomEvent("np-password-input:visible", {
          bubbles: true,
          detail: {
            visible: visible,
            reason: reason,
            originalEvent: event || null,
          },
        })
      )
      return true
    }

    // Match the markup the page started with.
    root.toggleAttribute("data-visible", isVisible())
    if (toggle) {
      toggle.setAttribute("aria-pressed", isVisible() ? "true" : "false")
      if (!toggle.hasAttribute("aria-controls"))
        toggle.setAttribute("aria-controls", input.id)
      if (!toggle.hasAttribute("type")) toggle.setAttribute("type", "button")

      // Keep the caret where it is when the pointer presses the toggle.
      toggle.addEventListener("mousedown", function (event) {
        event.preventDefault()
      })
      toggle.addEventListener("click", function (event) {
        var hadFocus = document.activeElement === input
        var start = input.selectionStart,
          end = input.selectionEnd,
          direction = input.selectionDirection
        if (!setVisible(!isVisible(), "toggle-press", event)) return
        // A pointer press from elsewhere brings focus back; a keyboard press keeps it on the toggle.
        if (event.detail > 0 && !hadFocus) input.focus({ preventScroll: true })
        if (start !== null && end !== null) {
          try {
            input.setSelectionRange(start, end, direction || undefined)
          } catch {
            // Ignore errors.
          }
        }
      })
    }

    // ── hide again on submit, reset and page hide ───────────────
    if (form) {
      form.addEventListener("submit", function (event) {
        // setVisible switches the input back to type="password" synchronously,
        // so the browser reads (and offers to save) a password field.
        setVisible(false, "form-submit", event)
      })
      form.addEventListener("reset", function (event) {
        setVisible(false, "reset", event)
        setTimeout(update, 0) // after the browser has restored the default value
      })
    }
    window.addEventListener("pagehide", function (event) {
      setVisible(false, "page-hide", event)
    })

    // ── Caps Lock ───────────────────────────────────────────────
    function syncCapsLock(event) {
      root.toggleAttribute(
        "data-capslock",
        !!(event.getModifierState && event.getModifierState("CapsLock"))
      )
    }
    input.addEventListener("keydown", syncCapsLock)
    input.addEventListener("keyup", syncCapsLock)
    input.addEventListener("mousedown", syncCapsLock)
    input.addEventListener("blur", function () {
      root.removeAttribute("data-capslock")
    })

    // ── strength + requirements ─────────────────────────────────
    function update() {
      var value = input.value
      var scorer =
        (window.NepuiPasswordInput && window.NepuiPasswordInput.score) ||
        defaultScore
      var level = Math.min(4, Math.max(0, Math.round(scorer(value))))

      if (strength) {
        var labels = (strength.getAttribute("data-labels") || "").split("|")
        var text = (labels.length === 5 ? labels : LABELS)[level]
        strength.setAttribute("data-level", String(level))
        strength.setAttribute("aria-valuenow", String(level))
        strength.setAttribute("aria-valuetext", text)
        var label = strength.querySelector(
          ".np-password-input-strength-label, [data-np-password-input-strength-label]"
        )
        if (label) label.textContent = text
      }

      if (requirements) {
        Array.prototype.forEach.call(
          requirements.querySelectorAll("li"),
          function (item) {
            var met = false
            var pattern = item.getAttribute("data-pattern")
            var rule = item.getAttribute("data-rule")
            if (pattern) {
              try {
                met = new RegExp(pattern).test(value)
              } catch {
                // Ignore errors.
              }
            } else if (rule && RULES[rule]) met = RULES[rule](value, item)
            item.toggleAttribute("data-met", met)
          }
        )
      }

      root.dispatchEvent(
        new CustomEvent("np-password-input:input", {
          bubbles: true,
          detail: { value: value, score: level },
        })
      )
    }
    input.addEventListener("input", update)
    update()

    // ── actions: copy, clear, generate ──────────────────────────
    Array.prototype.forEach.call(
      root.querySelectorAll(ACTION),
      function (button) {
        button.addEventListener("mousedown", function (event) {
          event.preventDefault()
        })
        button.addEventListener("click", function () {
          var action = button.getAttribute("data-action")
          if (action === "copy") {
            if (!input.value || !navigator.clipboard) return
            navigator.clipboard.writeText(input.value).then(function () {
              var original = button.getAttribute("aria-label")
              button.setAttribute("data-copied", "")
              button.setAttribute("aria-label", "Copied")
              setTimeout(function () {
                button.removeAttribute("data-copied")
                if (original) button.setAttribute("aria-label", original)
              }, 1500)
            })
          } else if (action === "clear") {
            input.value = ""
            input.dispatchEvent(new Event("input", { bubbles: true }))
            input.focus()
          } else if (action === "generate") {
            input.value = randomPassword(
              Number(button.getAttribute("data-length")) || 16
            )
            input.dispatchEvent(new Event("input", { bubbles: true }))
          }
        })
      }
    )

    root._npPasswordInput = {
      getValue: function () {
        return input.value
      },
      setValue: function (value) {
        input.value = value
        input.dispatchEvent(new Event("input", { bubbles: true }))
      },
      isVisible: isVisible,
      setVisible: function (visible) {
        return setVisible(!!visible, "imperative")
      },
      focus: function () {
        input.focus()
      },
    }
  }

  function initAll() {
    Array.prototype.forEach.call(document.querySelectorAll(ROOT), init)
  }

  window.NepuiPasswordInput = window.NepuiPasswordInput || {}
  window.NepuiPasswordInput.init = init
  window.NepuiPasswordInput.initAll = initAll

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", initAll)
  else initAll()
  // Roots added later (docs previews, frameworks) are enhanced too.
  new MutationObserver(initAll).observe(document.documentElement, {
    childList: true,
    subtree: true,
  })
})()
