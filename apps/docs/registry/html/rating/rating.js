;(function () {
  var SELECTOR = ".np-rating, [data-np-rating]"
  var STAR =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>'
  var instances = new WeakMap()

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
  }

  function round(value) {
    return Number(value.toFixed(6))
  }

  function bool(root, name) {
    return root.hasAttribute(name) && root.getAttribute(name) !== "false"
  }

  function parse(text) {
    if (text === null || text === "") return null
    var n = Number(text)
    return isNaN(n) || n <= 0 ? null : n
  }

  function isRtl(element) {
    return getComputedStyle(element).direction === "rtl"
  }

  function init(root) {
    if (instances.has(root)) return instances.get(root)

    var max = Math.max(
      1,
      Math.floor(Number(root.getAttribute("data-max")) || 5)
    )
    var stepAttr = Number(root.getAttribute("data-step"))
    var step = stepAttr > 0 && stepAttr <= 1 ? stepAttr : 1
    var deselectable = bool(root, "data-deselectable")
    var disabled = bool(root, "data-disabled")
    var readOnly = bool(root, "data-readonly")
    var required = bool(root, "data-required")
    var loop = bool(root, "data-loop")
    var name = root.getAttribute("data-name")
    var formId = root.getAttribute("data-form")
    var labelTemplate =
      root.getAttribute("data-label") || "{value} out of {max} stars"
    var defaultValue = parse(root.getAttribute("data-value"))
    var value = defaultValue === null ? null : Math.min(defaultValue, max)
    var preview = null

    var template = root.querySelector("template")
    var icon = template ? template.innerHTML : STAR
    root.textContent = ""

    function label(v) {
      return v === null || v === 0
        ? "No rating"
        : labelTemplate.replace("{value}", v).replace("{max}", max)
    }

    root.setAttribute("role", readOnly ? "img" : "radiogroup")
    if (disabled) root.setAttribute("data-disabled", "")
    if (readOnly) root.setAttribute("data-readonly", "")
    if (required) root.setAttribute("data-required", "")
    if (!readOnly && required) root.setAttribute("aria-required", "true")
    if (disabled) root.setAttribute("aria-disabled", "true")

    var items = []
    for (var i = 1; i <= max; i++) {
      var item = document.createElement(readOnly ? "span" : "button")
      item.className = "np-rating-item"
      item.setAttribute("data-index", String(i))
      if (readOnly) item.setAttribute("aria-hidden", "true")
      else {
        item.type = "button"
        item.setAttribute("role", "radio")
        if (disabled) item.disabled = true
      }
      item.innerHTML =
        '<span class="np-rating-icon" aria-hidden="true">' +
        icon +
        '</span><span class="np-rating-icon np-rating-icon-fill" aria-hidden="true">' +
        icon +
        "</span>"
      root.appendChild(item)
      items.push(item)
    }

    var input = null
    if (name || required) {
      input = document.createElement("input")
      input.className = "np-rating-input"
      input.tabIndex = -1
      input.setAttribute("aria-hidden", "true")
      if (name) input.name = name
      if (formId) input.setAttribute("form", formId)
      input.required = required
      root.appendChild(input)
      input.addEventListener("focus", function () {
        focusItem(value === null ? 1 : Math.ceil(value))
      })
    }

    function focusItem(index) {
      if (items[index - 1]) items[index - 1].focus()
    }

    function render() {
      var shown = preview !== null ? preview : value === null ? 0 : value
      var checkedIndex = value === null ? null : Math.ceil(value)
      items.forEach(function (item, k) {
        var index = k + 1
        var fill = round(clamp(shown - k, 0, 1))
        var checked = checkedIndex === index
        item.style.setProperty("--np-rating-fill", fill)
        toggle(item, "data-filled", fill === 1)
        toggle(item, "data-partial", fill > 0 && fill < 1)
        toggle(item, "data-checked", checked)
        toggle(item, "data-highlighted", preview !== null && fill > 0)
        toggle(item, "data-disabled", disabled)
        toggle(item, "data-readonly", readOnly)
        if (!readOnly) {
          item.setAttribute("aria-checked", checked ? "true" : "false")
          item.setAttribute("aria-label", label(checked ? value : index))
          item.tabIndex = checked || (value === null && index === 1) ? 0 : -1
        }
      })
      toggle(root, "data-previewing", preview !== null)
      if (
        readOnly &&
        !root.hasAttribute("aria-labelledby") &&
        !root.hasAttribute("data-has-label")
      ) {
        root.setAttribute("aria-label", label(value))
      }
      if (input) {
        input.value = value === null ? "" : String(value)
        input.disabled = disabled || (value === null && !required)
      }
    }

    function toggle(element, attribute, on) {
      if (on) element.setAttribute(attribute, "")
      else element.removeAttribute(attribute)
    }

    if (readOnly && root.hasAttribute("aria-label"))
      root.setAttribute("data-has-label", "")

    function change(next, reason, event) {
      if (next === value) return true
      var notice = new CustomEvent("np-rating-change", {
        bubbles: true,
        cancelable: true,
        detail: { value: next, reason: reason, event: event },
      })
      if (!root.dispatchEvent(notice)) return false
      value = next
      render()
      return true
    }

    function valueAt(event, item, index) {
      var rect = item.getBoundingClientRect()
      var position = rect.width ? (event.clientX - rect.left) / rect.width : 1
      if (isRtl(item)) position = 1 - position
      var steps = Math.max(1, Math.ceil(clamp(position, 0, 1) / step - 1e-9))
      return round(index - 1 + Math.min(1, steps * step))
    }

    function snap(v) {
      if (v === null || v <= 0) return null
      return round(Math.round(clamp(v, 0, max) / step) * step) || null
    }

    var api = {
      getValue: function () {
        return value
      },
      setValue: function (next, details) {
        if (disabled || readOnly) return false
        return change(
          snap(next),
          (details && details.reason) || "imperative",
          details && details.event
        )
      },
      focus: function () {
        focusItem(value === null ? 1 : Math.ceil(value))
      },
    }

    if (!readOnly && !disabled) {
      items.forEach(function (item, k) {
        var index = k + 1
        item.addEventListener("pointermove", function (event) {
          if (event.pointerType === "touch") return
          preview = valueAt(event, item, index)
          render()
        })
        item.addEventListener("click", function (event) {
          var checked = value !== null && Math.ceil(value) === index
          var next =
            event.detail === 0
              ? checked
                ? value
                : index
              : valueAt(event, item, index)
          if (deselectable && next === value) next = null
          change(next, "item-press", event)
        })
        item.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            event.preventDefault()
            var form = formId ? document.getElementById(formId) : item.form
            if (form && form.requestSubmit) form.requestSubmit()
            return
          }
          var rtl = isRtl(item)
          var direction = {
            ArrowRight: rtl ? -1 : 1,
            ArrowLeft: rtl ? 1 : -1,
            ArrowUp: 1,
            ArrowDown: -1,
          }[event.key]
          var next = null
          if (event.key === "Home") next = step
          else if (event.key === "End") next = max
          else if (direction !== undefined) {
            var moved = round((value || 0) + direction * step)
            if (moved > max) next = loop ? step : max
            else if (moved < step) next = loop ? max : value
            else next = moved
          } else return
          event.preventDefault()
          preview = null
          render()
          if (next === null || next === value) return
          if (change(next, "list-navigation", event)) focusItem(Math.ceil(next))
        })
      })
      root.addEventListener("pointerleave", function () {
        preview = null
        render()
      })
    }

    if (input) {
      var form = input.form
      if (form) {
        form.addEventListener("reset", function (event) {
          change(
            defaultValue === null ? null : Math.min(defaultValue, max),
            "reset",
            event
          )
        })
      }
    }

    render()
    instances.set(root, api)
    return api
  }

  function initAll(scope) {
    var nodes = (scope || document).querySelectorAll(SELECTOR)
    for (var i = 0; i < nodes.length; i++) init(nodes[i])
  }

  window.NepuiRating = {
    init: init,
    initAll: initAll,
    get: function (root) {
      return instances.get(root) || null
    },
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", function () {
      initAll()
    })
  else initAll()
})()
