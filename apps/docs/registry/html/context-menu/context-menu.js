;(function () {
  var triggerSelector =
    ".np-context-menu-trigger, [data-np-context-menu-trigger]"
  var contentSelector =
    ".np-context-menu-content, [data-np-context-menu-content]"
  var subSelector = ".np-context-menu-sub, [data-np-context-menu-sub]"
  var subTriggerSelector =
    ".np-context-menu-sub-trigger, [data-np-context-menu-sub-trigger]"
  var subContentSelector =
    ".np-context-menu-sub-content, [data-np-context-menu-sub-content]"
  var menuSelector = contentSelector + ", " + subContentSelector
  var itemSelector =
    '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]'
  var openRoot = null
  var pressTimer = 0

  function closestMenu(element) {
    return element.closest ? element.closest(menuSelector) : null
  }

  function isDisabled(item) {
    return (
      item.hasAttribute("data-disabled") ||
      item.getAttribute("aria-disabled") === "true"
    )
  }

  function menuItems(menu) {
    return Array.prototype.filter.call(
      menu.querySelectorAll(itemSelector),
      function (item) {
        return closestMenu(item) === menu && !isDisabled(item)
      }
    )
  }

  function highlight(item) {
    if (!item) return
    var menu = closestMenu(item)
    Array.prototype.forEach.call(
      menu.querySelectorAll("[data-highlighted]"),
      function (other) {
        if (closestMenu(other) === menu)
          other.removeAttribute("data-highlighted")
      }
    )
    item.setAttribute("data-highlighted", "")
    item.focus({ preventScroll: true })
  }

  function show(menu) {
    menu.style.position = "fixed"
    menu.style.zIndex = "50"
    menu.hidden = false
    menu.setAttribute("data-open", "")
  }

  function hide(menu) {
    menu.removeAttribute("data-open")
    menu.hidden = true
    Array.prototype.forEach.call(
      menu.querySelectorAll("[data-highlighted]"),
      function (item) {
        item.removeAttribute("data-highlighted")
      }
    )
    Array.prototype.forEach.call(
      menu.querySelectorAll(subContentSelector),
      hide
    )
    Array.prototype.forEach.call(
      menu.querySelectorAll(subTriggerSelector),
      function (item) {
        item.setAttribute("aria-expanded", "false")
      }
    )
  }

  function place(menu, x, y) {
    menu.style.left = "0px"
    menu.style.top = "0px"
    var width = menu.offsetWidth
    var height = menu.offsetHeight
    var side = menu.getAttribute("data-side")
    var left = x
    var top = y
    if (side === "left") left = x - width
    if (side === "top") top = y - height
    if (left + width > window.innerWidth - 8) left = x - width
    if (top + height > window.innerHeight - 8) top = y - height
    menu.style.left = Math.max(8, left) + "px"
    menu.style.top = Math.max(8, top) + "px"
  }

  function closeAll() {
    if (!openRoot) return
    var trigger = document.querySelector(
      '[aria-controls="' + openRoot.id + '"]'
    )
    if (trigger) trigger.setAttribute("aria-expanded", "false")
    hide(openRoot)
    openRoot = null
  }

  function openMenu(menu, x, y, trigger) {
    closeAll()
    Array.prototype.forEach.call(
      menu.querySelectorAll(itemSelector),
      function (item) {
        if (!item.hasAttribute("tabindex")) item.setAttribute("tabindex", "-1")
      }
    )
    show(menu)
    place(menu, x, y)
    openRoot = menu
    menu.setAttribute("tabindex", "-1")
    menu.focus({ preventScroll: true })
    if (trigger) trigger.setAttribute("aria-expanded", "true")
  }

  function closeSub(sub) {
    var content = sub.querySelector(subContentSelector)
    var trigger = sub.querySelector(subTriggerSelector)
    if (content) hide(content)
    if (trigger) trigger.setAttribute("aria-expanded", "false")
  }

  function openSub(subTrigger) {
    var sub = subTrigger.closest(subSelector)
    var content = sub && sub.querySelector(subContentSelector)
    if (!content || !content.hidden) return
    show(content)
    var rect = subTrigger.getBoundingClientRect()
    content.style.left = "0px"
    content.style.top = "0px"
    var width = content.offsetWidth
    var height = content.offsetHeight
    var left =
      rect.right + width > window.innerWidth - 8
        ? rect.left - width
        : rect.right
    var top = rect.top - 4
    if (top + height > window.innerHeight - 8)
      top = Math.max(8, window.innerHeight - height - 8)
    content.style.left = left + "px"
    content.style.top = top + "px"
    subTrigger.setAttribute("aria-expanded", "true")
  }

  function activate(item) {
    var role = item.getAttribute("role")
    if (item.matches(subTriggerSelector)) {
      openSub(item)
      return
    }
    if (role === "menuitemcheckbox") {
      item.setAttribute(
        "aria-checked",
        item.getAttribute("aria-checked") === "true" ? "false" : "true"
      )
      return
    }
    if (role === "menuitemradio") {
      var group = item.closest('[role="group"]') || item.parentNode
      Array.prototype.forEach.call(
        group.querySelectorAll('[role="menuitemradio"]'),
        function (radio) {
          radio.setAttribute("aria-checked", radio === item ? "true" : "false")
        }
      )
      return
    }
    setTimeout(closeAll, 0)
  }

  document.addEventListener("contextmenu", function (event) {
    var target = event.target
    if (!target || !target.closest) return
    if (openRoot && target.closest(menuSelector)) {
      event.preventDefault()
      return
    }
    var trigger = target.closest(triggerSelector)
    var menu =
      trigger && document.getElementById(trigger.getAttribute("aria-controls"))
    if (!menu) return
    event.preventDefault()
    openMenu(menu, event.clientX, event.clientY, trigger)
  })

  document.addEventListener(
    "touchstart",
    function (event) {
      var target = event.target
      var trigger =
        target && target.closest ? target.closest(triggerSelector) : null
      var menu =
        trigger &&
        document.getElementById(trigger.getAttribute("aria-controls"))
      if (!menu || event.touches.length !== 1) return
      var touch = event.touches[0]
      pressTimer = setTimeout(function () {
        openMenu(menu, touch.clientX, touch.clientY, trigger)
      }, 500)
    },
    { passive: true }
  )

  ;["touchend", "touchmove", "touchcancel"].forEach(function (name) {
    document.addEventListener(
      name,
      function () {
        clearTimeout(pressTimer)
      },
      { passive: true }
    )
  })

  document.addEventListener(
    "pointerdown",
    function (event) {
      if (!openRoot) return
      var target = event.target
      if (target && target.closest && target.closest(menuSelector)) return
      closeAll()
    },
    true
  )

  document.addEventListener("click", function (event) {
    if (!openRoot) return
    var item =
      event.target && event.target.closest
        ? event.target.closest(itemSelector)
        : null
    if (item && openRoot.contains(item) && !isDisabled(item)) activate(item)
  })

  document.addEventListener("mouseover", function (event) {
    if (!openRoot) return
    var item =
      event.target && event.target.closest
        ? event.target.closest(itemSelector)
        : null
    if (!item || isDisabled(item)) return
    var menu = closestMenu(item)
    if (!menu || !openRoot.contains(menu)) return
    if (document.activeElement !== item) highlight(item)
    Array.prototype.forEach.call(
      menu.querySelectorAll(subSelector),
      function (sub) {
        if (closestMenu(sub) === menu && !sub.contains(item)) closeSub(sub)
      }
    )
    if (item.matches(subTriggerSelector)) openSub(item)
  })

  document.addEventListener("keydown", function (event) {
    if (!openRoot) return
    var active = document.activeElement
    var menu = (active && closestMenu(active)) || openRoot
    var items = menuItems(menu)
    var index = items.indexOf(active)
    var inSub = menu.matches(subContentSelector)
    if (event.key === "ArrowDown") {
      event.preventDefault()
      highlight(items[index + 1 >= items.length ? 0 : index + 1])
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      highlight(items[index <= 0 ? items.length - 1 : index - 1])
    } else if (event.key === "Home") {
      event.preventDefault()
      highlight(items[0])
    } else if (event.key === "End") {
      event.preventDefault()
      highlight(items[items.length - 1])
    } else if (
      event.key === "ArrowRight" &&
      active &&
      active.matches(subTriggerSelector)
    ) {
      event.preventDefault()
      openSub(active)
      var sub = active.closest(subSelector)
      var content = sub && sub.querySelector(subContentSelector)
      if (content) highlight(menuItems(content)[0])
    } else if (event.key === "ArrowLeft" && inSub) {
      event.preventDefault()
      var owner = menu.closest(subSelector)
      closeSub(owner)
      highlight(owner.querySelector(subTriggerSelector))
    } else if (
      (event.key === "Enter" || event.key === " ") &&
      active &&
      active.matches(itemSelector)
    ) {
      event.preventDefault()
      if (!isDisabled(active)) active.click()
    } else if (event.key === "Escape") {
      event.preventDefault()
      if (inSub) {
        var parent = menu.closest(subSelector)
        closeSub(parent)
        highlight(parent.querySelector(subTriggerSelector))
      } else {
        closeAll()
      }
    } else if (event.key === "Tab") {
      closeAll()
    }
  })

  window.addEventListener("blur", closeAll)
  window.addEventListener("resize", closeAll)
  window.addEventListener(
    "scroll",
    function (event) {
      var target = event.target
      if (
        openRoot &&
        !(target && target.nodeType === 1 && openRoot.contains(target))
      )
        closeAll()
    },
    true
  )

  function init() {
    Array.prototype.forEach.call(
      document.querySelectorAll(triggerSelector),
      function (trigger) {
        trigger.setAttribute("aria-haspopup", "menu")
        trigger.setAttribute("aria-expanded", "false")
      }
    )
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init)
  else init()
})()
