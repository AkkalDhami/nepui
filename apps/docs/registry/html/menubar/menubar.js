;(function () {
  "use strict"

  var BAR = ".np-menubar, [data-np-menubar]"
  var MENU = ".np-menubar-menu, [data-np-menubar-menu]"
  var TRIGGER = ".np-menubar-trigger, [data-np-menubar-trigger]"
  var CONTENT = ".np-menubar-content, [data-np-menubar-content]"
  var SUB = ".np-menubar-sub, [data-np-menubar-sub]"
  var SUB_TRIGGER = ".np-menubar-sub-trigger, [data-np-menubar-sub-trigger]"
  var SUB_CONTENT = ".np-menubar-sub-content, [data-np-menubar-sub-content]"
  var ITEM = ".np-menubar-item, [data-np-menubar-item]"
  var CHECKBOX = ".np-menubar-checkbox-item, [data-np-menubar-checkbox-item]"
  var RADIO = ".np-menubar-radio-item, [data-np-menubar-radio-item]"
  var SEPARATOR = ".np-menubar-separator, [data-np-menubar-separator]"
  var LABEL = ".np-menubar-label, [data-np-menubar-label]"
  var RADIO_GROUP =
    ".np-menubar-radio-group, [data-np-menubar-radio-group], [role='group']"
  var ANY_ITEM = [ITEM, CHECKBOX, RADIO, SUB_TRIGGER].join(", ")
  var HOVER_DELAY = 100

  var ready = new WeakSet()
  var uid = 0

  function child(el, selector) {
    return (
      Array.prototype.find.call(el.children, function (c) {
        return c.matches(selector)
      }) || null
    )
  }

  function ensureId(el, prefix) {
    if (!el.id) el.id = prefix + "-" + ++uid
    return el.id
  }

  function isDisabled(el) {
    return (
      el.getAttribute("aria-disabled") === "true" ||
      el.hasAttribute("data-disabled")
    )
  }

  function setup(bar) {
    if (ready.has(bar)) return
    var menus = Array.prototype.filter.call(bar.children, function (c) {
      return c.matches(MENU)
    })
    if (!menus.length) return
    ready.add(bar)

    var current = null
    var hoverTimer = null

    function rtl() {
      return getComputedStyle(bar).direction === "rtl"
    }
    function triggerOf(menu) {
      return child(menu, TRIGGER)
    }
    function contentOf(menu) {
      return child(menu, CONTENT)
    }
    function menuOf(el) {
      return el.closest(MENU)
    }

    // ---- ARIA wiring ------------------------------------------------------
    if (!bar.hasAttribute("role")) bar.setAttribute("role", "menubar")

    function wireContent(content, labelledBy) {
      if (!content.hasAttribute("role")) content.setAttribute("role", "menu")
      content.hidden = true
      if (labelledBy && !content.hasAttribute("aria-labelledby"))
        content.setAttribute("aria-labelledby", labelledBy)
      Array.prototype.forEach.call(
        content.querySelectorAll("*"),
        function (el) {
          if (el.closest(CONTENT) !== content) return
          if (el.matches(SEPARATOR) && !el.hasAttribute("role"))
            el.setAttribute("role", "separator")
          if (el.matches(LABEL) && !el.hasAttribute("role"))
            el.setAttribute("role", "presentation")
          if (el.matches(ANY_ITEM)) {
            var role = el.matches(CHECKBOX)
              ? "menuitemcheckbox"
              : el.matches(RADIO)
                ? "menuitemradio"
                : "menuitem"
            if (!el.hasAttribute("role")) el.setAttribute("role", role)
            el.setAttribute("tabindex", "-1")
            if (role !== "menuitem" && !el.hasAttribute("aria-checked")) {
              el.setAttribute(
                "aria-checked",
                el.hasAttribute("data-checked") ? "true" : "false"
              )
            }
            if (el.matches(SUB_TRIGGER)) {
              el.setAttribute("aria-haspopup", "menu")
              el.setAttribute("aria-expanded", "false")
              var sub = el.closest(SUB)
              var subContent = sub && child(sub, CONTENT)
              if (subContent) {
                el.setAttribute(
                  "aria-controls",
                  ensureId(subContent, "np-menubar-sub")
                )
                wireContent(subContent, ensureId(el, "np-menubar-item"))
              }
            }
          }
        }
      )
    }

    menus.forEach(function (menu, i) {
      var trigger = triggerOf(menu)
      var content = contentOf(menu)
      if (!trigger || !content) return
      trigger.setAttribute("aria-haspopup", "menu")
      trigger.setAttribute("aria-expanded", "false")
      trigger.setAttribute(
        "aria-controls",
        ensureId(content, "np-menubar-menu")
      )
      trigger.setAttribute("tabindex", i === 0 ? "0" : "-1")
      wireContent(content, ensureId(trigger, "np-menubar-trigger"))
    })

    // ---- Helpers ----------------------------------------------------------
    function itemsOf(content) {
      return Array.prototype.filter.call(
        content.querySelectorAll(ANY_ITEM),
        function (el) {
          return el.closest(CONTENT) === content && !isDisabled(el)
        }
      )
    }

    function focusItem(content, which) {
      var items = itemsOf(content)
      if (!items.length) return
      var target = which === "last" ? items[items.length - 1] : items[0]
      target.focus({ preventScroll: true })
    }

    function closeSub(sub, focusTrigger) {
      var trigger = child(sub, SUB_TRIGGER)
      var content = child(sub, CONTENT)
      if (!content || content.hidden) return
      Array.prototype.forEach.call(
        content.querySelectorAll(SUB),
        function (inner) {
          closeSub(inner, false)
        }
      )
      content.hidden = true
      if (trigger) {
        trigger.setAttribute("aria-expanded", "false")
        trigger.removeAttribute("data-popup-open")
        if (focusTrigger) trigger.focus({ preventScroll: true })
      }
    }

    function openSub(trigger, which) {
      var sub = trigger.closest(SUB)
      var content = sub && child(sub, CONTENT)
      if (!content) return
      closeSiblingSubs(trigger, sub)
      content.hidden = false
      trigger.setAttribute("aria-expanded", "true")
      if (which) focusItem(content, which)
    }

    function closeSiblingSubs(item, keep) {
      var parent = item.closest(CONTENT)
      if (!parent) return
      Array.prototype.forEach.call(
        parent.querySelectorAll(SUB),
        function (sub) {
          if (sub !== keep && sub.closest(CONTENT) === parent)
            closeSub(sub, false)
        }
      )
    }

    function closeMenu(menu, focusTrigger) {
      var trigger = triggerOf(menu)
      var content = contentOf(menu)
      Array.prototype.forEach.call(
        content.querySelectorAll(SUB),
        function (sub) {
          closeSub(sub, false)
        }
      )
      content.hidden = true
      trigger.setAttribute("aria-expanded", "false")
      if (current === menu) current = null
      if (focusTrigger) trigger.focus({ preventScroll: true })
    }

    function openMenu(menu, which) {
      if (current && current !== menu) closeMenu(current, false)
      var trigger = triggerOf(menu)
      var content = contentOf(menu)
      content.hidden = false
      trigger.setAttribute("aria-expanded", "true")
      current = menu
      menus.forEach(function (m) {
        triggerOf(m).setAttribute("tabindex", m === menu ? "0" : "-1")
      })
      if (which) focusItem(content, which)
    }

    function closeAll(focusTrigger) {
      if (current) closeMenu(current, focusTrigger)
    }

    function moveMenu(from, step, openAfter) {
      var i = (menus.indexOf(from) + step + menus.length) % menus.length
      var next = menus[i]
      if (openAfter) openMenu(next, "first")
      else triggerOf(next).focus({ preventScroll: true })
    }

    function select(item) {
      item.dispatchEvent(
        new CustomEvent("np-menubar-select", {
          bubbles: true,
          detail: { item: item },
        })
      )
    }

    // ---- Pointer ----------------------------------------------------------
    bar.addEventListener("click", function (e) {
      var trigger = e.target.closest(TRIGGER)
      if (
        trigger &&
        trigger.parentNode &&
        menus.indexOf(trigger.parentNode) !== -1
      ) {
        if (isDisabled(trigger)) return
        var menu = menuOf(trigger)
        if (current === menu) closeMenu(menu, false)
        else openMenu(menu, e.detail === 0 ? "first" : null)
        return
      }

      var item = e.target.closest(ANY_ITEM)
      if (!item || isDisabled(item) || !bar.contains(item)) return

      if (item.matches(SUB_TRIGGER)) {
        openSub(item, e.detail === 0 ? "first" : null)
        return
      }
      if (item.matches(CHECKBOX)) {
        var on = item.getAttribute("aria-checked") !== "true"
        item.setAttribute("aria-checked", String(on))
        if (on) item.setAttribute("data-checked", "")
        else item.removeAttribute("data-checked")
        select(item)
        return
      }
      if (item.matches(RADIO)) {
        var group = item.closest(RADIO_GROUP) || item.closest(CONTENT)
        Array.prototype.forEach.call(
          group.querySelectorAll(RADIO),
          function (radio) {
            radio.setAttribute("aria-checked", "false")
            radio.removeAttribute("data-checked")
          }
        )
        item.setAttribute("aria-checked", "true")
        item.setAttribute("data-checked", "")
        select(item)
        return
      }
      select(item)
      closeAll(true)
    })

    bar.addEventListener("mouseover", function (e) {
      var trigger = e.target.closest(TRIGGER)
      if (
        trigger &&
        current &&
        trigger.parentNode &&
        menus.indexOf(trigger.parentNode) !== -1
      ) {
        var menu = menuOf(trigger)
        if (menu !== current && !isDisabled(trigger)) openMenu(menu, null)
        return
      }
      var item = e.target.closest(ANY_ITEM)
      if (!item || isDisabled(item) || !bar.contains(item)) return
      item.focus({ preventScroll: true })
      clearTimeout(hoverTimer)
      if (item.matches(SUB_TRIGGER)) {
        hoverTimer = setTimeout(function () {
          openSub(item, null)
        }, HOVER_DELAY)
      } else {
        hoverTimer = setTimeout(function () {
          closeSiblingSubs(item, null)
        }, HOVER_DELAY)
      }
    })

    document.addEventListener("pointerdown", function (e) {
      if (current && !bar.contains(e.target)) closeAll(false)
    })

    // ---- Focus highlight --------------------------------------------------
    bar.addEventListener("focusin", function (e) {
      var item = e.target.closest(ANY_ITEM)
      if (item) item.setAttribute("data-highlighted", "")
      var trigger = e.target.closest(TRIGGER)
      if (trigger && menus.indexOf(trigger.parentNode) !== -1) {
        menus.forEach(function (m) {
          triggerOf(m).setAttribute(
            "tabindex",
            triggerOf(m) === trigger ? "0" : "-1"
          )
        })
      }
    })

    bar.addEventListener("focusout", function (e) {
      var item = e.target.closest(ANY_ITEM)
      if (item) item.removeAttribute("data-highlighted")
    })

    // ---- Keyboard ---------------------------------------------------------
    bar.addEventListener("keydown", function (e) {
      var forward = rtl() ? "ArrowLeft" : "ArrowRight"
      var backward = rtl() ? "ArrowRight" : "ArrowLeft"
      var key = e.key

      var trigger = e.target.closest(TRIGGER)
      if (
        trigger &&
        trigger.parentNode &&
        menus.indexOf(trigger.parentNode) !== -1
      ) {
        var menu = menuOf(trigger)
        if (key === forward) {
          e.preventDefault()
          moveMenu(menu, 1, !!current)
        } else if (key === backward) {
          e.preventDefault()
          moveMenu(menu, -1, !!current)
        } else if (key === "ArrowDown") {
          e.preventDefault()
          openMenu(menu, "first")
        } else if (key === "ArrowUp") {
          e.preventDefault()
          openMenu(menu, "last")
        } else if (key === "Home" || key === "End") {
          e.preventDefault()
          var edge = key === "Home" ? menus[0] : menus[menus.length - 1]
          if (current) openMenu(edge, "first")
          else triggerOf(edge).focus({ preventScroll: true })
        } else if (key === "Escape" && current) {
          e.preventDefault()
          closeAll(true)
        }
        return
      }

      var item = e.target.closest(ANY_ITEM)
      if (!item || !bar.contains(item)) return
      var content = item.closest(CONTENT)
      var inSub = content.matches(SUB_CONTENT)
      var items = itemsOf(content)
      var index = items.indexOf(item)

      if (key === "ArrowDown") {
        e.preventDefault()
        items[(index + 1) % items.length].focus({ preventScroll: true })
      } else if (key === "ArrowUp") {
        e.preventDefault()
        items[(index - 1 + items.length) % items.length].focus({
          preventScroll: true,
        })
      } else if (key === "Home") {
        e.preventDefault()
        items[0].focus({ preventScroll: true })
      } else if (key === "End") {
        e.preventDefault()
        items[items.length - 1].focus({ preventScroll: true })
      } else if (key === forward) {
        e.preventDefault()
        if (item.matches(SUB_TRIGGER)) openSub(item, "first")
        else if (!inSub && current) moveMenu(current, 1, true)
      } else if (key === backward) {
        e.preventDefault()
        if (inSub) closeSub(content.closest(SUB), true)
        else if (current) moveMenu(current, -1, true)
      } else if (key === "Enter" || key === " ") {
        e.preventDefault()
        if (item.matches(SUB_TRIGGER)) openSub(item, "first")
        else item.click()
      } else if (key === "Escape") {
        e.preventDefault()
        closeAll(true)
      } else if (key === "Tab") {
        closeAll(false)
      } else if (key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        var ch = key.toLowerCase()
        for (var step = 1; step <= items.length; step++) {
          var candidate = items[(index + step) % items.length]
          if (candidate.textContent.trim().toLowerCase().indexOf(ch) === 0) {
            candidate.focus({ preventScroll: true })
            break
          }
        }
      }
    })
  }

  function init(root) {
    var scope = root || document
    if (scope.matches && scope.matches(BAR)) setup(scope)
    scope.querySelectorAll(BAR).forEach(setup)
  }

  window.NepuiMenubar = { init: init }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      init()
    })
  } else {
    init()
  }
})()
