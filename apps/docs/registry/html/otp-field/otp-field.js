;(function () {
  var rootSelector = ".np-otp-field, [data-np-otp-field]"
  var inputSelector = ".np-otp-field-input, [data-np-otp-field-input]"
  var patterns = {
    numeric: /[0-9]/,
    alpha: /[a-zA-Z]/,
    alphanumeric: /[a-zA-Z0-9]/,
    none: /[\s\S]/,
  }

  function slots(root) {
    return Array.prototype.slice.call(root.querySelectorAll(inputSelector))
  }

  function clean(root, text) {
    var pattern =
      patterns[root.getAttribute("data-validation")] || patterns.numeric
    if (root.hasAttribute("data-uppercase")) text = text.toUpperCase()
    return Array.prototype.filter
      .call(text, function (character) {
        return pattern.test(character)
      })
      .join("")
  }

  function readValue(root) {
    return slots(root)
      .map(function (slot) {
        return slot.value
      })
      .join("")
  }

  function updateHidden(root) {
    var hidden = root.querySelector('input[type="hidden"]')
    if (hidden) hidden.value = readValue(root)
  }

  function sync(root) {
    updateHidden(root)
    var list = slots(root)
    var complete =
      list.length > 0 &&
      list.every(function (slot) {
        return slot.value !== ""
      })
    if (!complete) return
    root.dispatchEvent(
      new CustomEvent("np-otp-complete", {
        bubbles: true,
        detail: { value: readValue(root) },
      })
    )
    if (root.hasAttribute("data-auto-submit")) {
      var form = root.closest("form")
      if (form && form.requestSubmit) form.requestSubmit()
    }
  }

  function fill(root, start, text) {
    var list = slots(root)
    var characters = clean(root, text)
    var index = start

    for (
      var i = 0;
      i < characters.length && index < list.length;
      i++, index++
    ) {
      list[index].value = characters.charAt(i)
    }

    var nextIndex = Math.min(index, list.length - 1)
    list[nextIndex].focus()

    sync(root)
  }

  function slotOf(event) {
    var target = event.target
    if (!target || !target.matches || !target.matches(inputSelector))
      return null
    var root = target.closest(rootSelector)
    return root ? { root: root, slot: target, list: slots(root) } : null
  }

  document.addEventListener("input", function (event) {
    var hit = slotOf(event)
    if (!hit) return

    var text = event.data || hit.slot.value
    var index = hit.list.indexOf(hit.slot)

    if (!text) {
      sync(hit.root)
      return
    }

    hit.slot.value = ""

    fill(hit.root, index, text)
  })

  document.addEventListener("keydown", function (event) {
    var hit = slotOf(event)
    if (!hit) return
    var index = hit.list.indexOf(hit.slot)
    var target = null
    if (event.key === "Backspace" && hit.slot.value === "" && index > 0) {
      target = hit.list[index - 1]
      target.value = ""
      sync(hit.root)
    } else if (event.key === "ArrowLeft") {
      target = hit.list[Math.max(index - 1, 0)]
    } else if (event.key === "ArrowRight") {
      target = hit.list[Math.min(index + 1, hit.list.length - 1)]
    } else if (event.key === "Home") {
      target = hit.list[0]
    } else if (event.key === "End") {
      target = hit.list[hit.list.length - 1]
    }
    if (target) {
      event.preventDefault()
      target.focus()
    }
  })

  document.addEventListener("paste", function (event) {
    var hit = slotOf(event)
    if (!hit) return
    var text = (event.clipboardData || window.clipboardData).getData("text")
    event.preventDefault()
    var start =
      clean(hit.root, text).length >= hit.list.length
        ? 0
        : hit.list.indexOf(hit.slot)
    fill(hit.root, start, text)
  })

  document.addEventListener("focusin", function (event) {
    var hit = slotOf(event)
    if (hit) hit.slot.select()
  })

  function init(root) {
    root.querySelectorAll(inputSelector).forEach(function (slot) {
      slot.removeAttribute("maxlength")
    })
    root.querySelectorAll(rootSelector).forEach(updateHidden)
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      init(document)
    })
  } else {
    init(document)
  }
})()
