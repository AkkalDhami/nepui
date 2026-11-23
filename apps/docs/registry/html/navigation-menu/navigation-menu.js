;(function () {
  var SELECTOR = ".np-navigation-menu, [data-np-navigation-menu]"
  var ITEM = ".np-navigation-menu-item, [data-np-navigation-menu-item]"
  var CONTENT = ".np-navigation-menu-content, [data-np-navigation-menu-content]"
  var LINK = ".np-navigation-menu-link, [data-np-navigation-menu-link], a[href]"
  var CHEVRON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="np-navigation-menu-trigger-icon" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>'
  var uid = 0
  var instances = new WeakMap()

  function child(parent, selector) {
    return Array.prototype.filter.call(parent.children, function (c) {
      return c.matches(selector)
    })[0]
  }

  function init(root) {
    if (instances.has(root)) return instances.get(root)

    var openDelay = Number(root.getAttribute("data-delay"))
    var closeDelay = Number(root.getAttribute("data-close-delay"))
    if (isNaN(openDelay) || root.getAttribute("data-delay") === null)
      openDelay = 50
    if (isNaN(closeDelay) || root.getAttribute("data-close-delay") === null)
      closeDelay = 50

    var list = root.querySelector(
      ".np-navigation-menu-list, [data-np-navigation-menu-list]"
    )
    var items = Array.prototype.slice
      .call(list.children)
      .filter(function (child) {
        return child.matches(ITEM)
      })
    var current = null
    var timer = 0

    items.forEach(function (item) {
      var trigger = child(item, "button")
      var content = child(item, CONTENT)
      if (!trigger || !content) return
      if (!item.hasAttribute("data-value"))
        item.setAttribute("data-value", "item-" + ++uid)
      if (!content.id) content.id = "np-navigation-menu-content-" + ++uid
      trigger.setAttribute("aria-expanded", "false")
      trigger.setAttribute("aria-controls", content.id)
      if (
        !trigger.querySelector(
          ".np-navigation-menu-trigger-icon, [data-np-navigation-menu-trigger-icon]"
        )
      ) {
        trigger.insertAdjacentHTML("beforeend", CHEVRON)
      }
    })

    function triggerOf(item) {
      return child(item, "button[aria-controls]")
    }

    function set(item, value, silent) {
      if (item === current && value) return
      if (!value && item !== current) return
      var previous = current
      if (previous) {
        previous.removeAttribute("data-open")
        var t = triggerOf(previous)
        if (t) t.setAttribute("aria-expanded", "false")
      }
      current = value ? item : null
      if (current) {
        current.setAttribute("data-open", "")
        triggerOf(current).setAttribute("aria-expanded", "true")
      }
      if (!silent) {
        root.dispatchEvent(
          new CustomEvent("np-navigation-menu-change", {
            bubbles: true,
            detail: {
              value: current ? current.getAttribute("data-value") : null,
            },
          })
        )
      }
    }

    function later(fn, delay) {
      clearTimeout(timer)
      if (delay > 0) timer = setTimeout(fn, delay)
      else fn()
    }

    function close() {
      clearTimeout(timer)
      if (current) set(current, false)
    }

    function entries() {
      return items
        .map(function (item) {
          return triggerOf(item) || child(item, "a")
        })
        .filter(Boolean)
    }

    items.forEach(function (item) {
      var trigger = triggerOf(item)
      var content = child(item, CONTENT)

      item.addEventListener("pointerenter", function (event) {
        if (event.pointerType === "touch") return
        clearTimeout(timer)
        if (!trigger || !content) {
          later(close, closeDelay)
          return
        }
        later(
          function () {
            set(item, true)
          },
          current ? 0 : openDelay
        )
      })
      item.addEventListener("pointerleave", function (event) {
        if (event.pointerType === "touch" || item !== current) return
        later(close, closeDelay)
      })

      if (!trigger || !content) return

      trigger.addEventListener("click", function () {
        clearTimeout(timer)
        set(item, item !== current)
      })

      trigger.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown") {
          event.preventDefault()
          set(item, true)
          var first = content.querySelector(LINK)
          if (first) first.focus()
        }
      })

      content.addEventListener("keydown", function (event) {
        var links = Array.prototype.slice.call(content.querySelectorAll(LINK))
        var index = links.indexOf(document.activeElement)
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault()
          if (!links.length) return
          var next = event.key === "ArrowDown" ? index + 1 : index - 1
          if (next >= links.length) next = 0
          if (next < 0) next = links.length - 1
          links[next].focus()
        }
      })
    })

    root.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && current) {
        var t = triggerOf(current)
        close()
        if (t) t.focus()
        return
      }
      var all = entries()
      var index = all.indexOf(event.target)
      if (index === -1) return
      var rtl = getComputedStyle(root).direction === "rtl"
      var next = -1
      if (event.key === "ArrowRight") next = rtl ? index - 1 : index + 1
      else if (event.key === "ArrowLeft") next = rtl ? index + 1 : index - 1
      else if (event.key === "Home") next = 0
      else if (event.key === "End") next = all.length - 1
      else return
      event.preventDefault()
      if (next >= all.length) next = 0
      if (next < 0) next = all.length - 1
      all[next].focus()
    })

    root.addEventListener("focusout", function (event) {
      if (!current) return
      var to = event.relatedTarget
      if (to && root.contains(to)) {
        var item = to.closest(ITEM)
        if (item !== current && current) close()
        return
      }
      if (
        to === null &&
        event.target.closest &&
        event.target.closest(ITEM) === current &&
        !root.matches(":hover")
      ) {
        close()
      }
    })

    document.addEventListener("pointerdown", function (event) {
      if (current && !root.contains(event.target)) close()
    })

    var api = {
      open: function (value) {
        var item = items.filter(function (i) {
          return i.getAttribute("data-value") === value
        })[0]
        if (item && triggerOf(item)) set(item, true)
      },
      close: close,
    }
    instances.set(root, api)
    return api
  }

  function initAll(scope) {
    var nodes = (scope || document).querySelectorAll(SELECTOR)
    for (var i = 0; i < nodes.length; i++) init(nodes[i])
  }

  window.NepuiNavigationMenu = {
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
