;(function (global) {
  "use strict"

  var WRAPPER = ".np-menu, [data-np-menu], .np-menu-sub, [data-np-menu-sub]"
  var SUB_WRAPPER = ".np-menu-sub, [data-np-menu-sub]"
  var ITEM =
    '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]'
  var PADDING = 8
  var HOVER_OPEN_DELAY = 100
  var HOVER_CLOSE_GRACE = 150
  var TYPEAHEAD_RESET = 500

  //  * Positioning (pure, so it can be tested without a browser)

  function clamp(value, min, max) {
    if (max < min) return min
    return Math.min(Math.max(value, min), max)
  }

  function physicalSide(side, rtl) {
    if (side === "inline-end") return rtl ? "left" : "right"
    if (side === "inline-start") return rtl ? "right" : "left"
    return side
  }

  /**
   * a    anchor rect   { left, top, right, bottom, width, height }
   * size popup size    { width, height }
   * vp   viewport      { width, height }
   * o    { side, align, sideOffset, alignOffset, rtl, padding }
   */
  function computePosition(a, size, vp, o) {
    var pad = o.padding
    var off = o.sideOffset
    var ao = o.alignOffset
    var rtl = o.rtl
    var side = physicalSide(o.side, rtl)
    var vertical = side === "top" || side === "bottom"
    var w = size.width
    var h = size.height
    var x
    var y
    var maxHeight

    if (vertical) {
      var below = vp.height - a.bottom - off - pad
      var above = a.top - off - pad

      if (side === "bottom" && h > below && above > below) side = "top"
      else if (side === "top" && h > above && below > above) side = "bottom"

      maxHeight = Math.max(0, side === "bottom" ? below : above)
      h = Math.min(h, maxHeight)
      y = side === "bottom" ? a.bottom + off : a.top - off - h

      if (o.align === "center") x = a.left + (a.width - w) / 2 + ao
      else if (o.align === "end") x = rtl ? a.left + ao : a.right - w - ao
      else x = rtl ? a.right - w - ao : a.left + ao

      x = clamp(x, pad, vp.width - w - pad)
    } else {
      var right = vp.width - a.right - off - pad
      var left = a.left - off - pad

      if (side === "right" && w > right && left > right) side = "left"
      else if (side === "left" && w > left && right > left) side = "right"

      maxHeight = Math.max(0, vp.height - pad * 2)
      h = Math.min(h, maxHeight)
      x = side === "right" ? a.right + off : a.left - off - w

      if (o.align === "center") y = a.top + (a.height - h) / 2 + ao
      else if (o.align === "end") y = a.bottom - h - ao
      else y = a.top + ao

      x = clamp(x, pad, vp.width - w - pad)
      y = clamp(y, pad, vp.height - h - pad)
    }

    var originX
    var originY
    if (vertical) {
      originX = clamp(a.left + a.width / 2 - x, 0, w)
      originY = side === "bottom" ? 0 : h
    } else {
      originX = side === "right" ? 0 : w
      originY = clamp(a.top + a.height / 2 - y, 0, h)
    }

    return {
      x: x,
      y: y,
      side: side,
      maxHeight: maxHeight,
      originX: originX,
      originY: originY,
    }
  }

  //  * Helpers

  var uid = 0
  var openMenus = new Set()
  var frame = 0

  function isDisabled(el) {
    return (
      el.disabled === true ||
      el.getAttribute("aria-disabled") === "true" ||
      el.hasAttribute("data-disabled")
    )
  }

  function isOpen(content) {
    return content.matches(":popover-open")
  }

  function itemsOf(content) {
    return Array.prototype.filter.call(
      content.querySelectorAll(ITEM),
      function (item) {
        return item.closest('[role="menu"]') === content && !isDisabled(item)
      }
    )
  }

  function isSubTrigger(item) {
    return (
      item.hasAttribute("aria-haspopup") && item.hasAttribute("popovertarget")
    )
  }

  function rootOf(content) {
    var current = content
    for (;;) {
      var parent =
        current.parentElement && current.parentElement.closest('[role="menu"]')
      if (!parent) return current
      current = parent
    }
  }

  function closeOpenSubmenus(content) {
    var open = content.querySelectorAll(":popover-open")
    for (var i = open.length - 1; i >= 0; i--) open[i].hidePopover()
  }

  function schedulePlacement() {
    if (frame) return
    frame = requestAnimationFrame(function () {
      frame = 0
      openMenus.forEach(function (menu) {
        menu.place()
      })
    })
  }

  function num(value, fallback) {
    var n = parseFloat(value)
    return isNaN(n) ? fallback : n
  }

  //  * One menu (a root menu or a submenu)

  function setup(wrapper) {
    if (wrapper.__npMenu) return

    var trigger = wrapper.querySelector(":scope > [popovertarget]")
    if (!trigger) return
    var content = document.getElementById(trigger.getAttribute("popovertarget"))
    if (!content) return

    wrapper.__npMenu = true
    var sub = wrapper.matches(SUB_WRAPPER)
    var parentContent = sub ? wrapper.closest('[role="menu"]') : null
    var focusOnOpen = null // "first" | "last" | null
    var hoverTimer = 0
    var typeahead = ""
    var typeaheadTimer = 0

    content.__npTrigger = trigger

    /* ARIA */
    if (!trigger.id) trigger.id = "np-menu-trigger-" + ++uid
    trigger.setAttribute("aria-haspopup", "menu")
    trigger.setAttribute("aria-controls", content.id)
    trigger.setAttribute("aria-expanded", "false")
    if (!content.hasAttribute("popover")) content.setAttribute("popover", "")
    if (!content.hasAttribute("role")) content.setAttribute("role", "menu")
    if (
      !content.hasAttribute("aria-label") &&
      !content.hasAttribute("aria-labelledby")
    ) {
      content.setAttribute("aria-labelledby", trigger.id)
    }
    content.setAttribute("tabindex", "-1")
    Array.prototype.forEach.call(
      content.querySelectorAll(ITEM),
      function (item) {
        item.setAttribute("tabindex", "-1")
      }
    )

    /* Positioning */
    function place() {
      var ds = content.dataset
      var r = trigger.getBoundingClientRect()
      var opts = {
        side: ds.npSide || (sub ? "inline-end" : "bottom"),
        align: ds.npAlign || "start",
        sideOffset: num(ds.npSideOffset, sub ? 0 : 4),
        alignOffset: num(ds.npAlignOffset, sub ? -4 : 0),
        rtl: getComputedStyle(content).direction === "rtl",
        padding: PADDING,
      }

      content.style.maxHeight = ""
      content.style.left = "0px"
      content.style.top = "0px"

      var size = { width: content.offsetWidth, height: content.offsetHeight }
      var vp = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      }
      var p = computePosition(r, size, vp, opts)

      content.style.maxHeight = Math.floor(p.maxHeight) + "px"
      content.style.left = Math.round(p.x) + "px"
      content.style.top = Math.round(p.y) + "px"
      content.setAttribute("data-side", p.side)
      content.style.setProperty(
        "--transform-origin",
        p.originX + "px " + p.originY + "px"
      )
      content.style.setProperty("--anchor-width", r.width + "px")
    }

    var tracked = { place: place }

    content.addEventListener("toggle", function (event) {
      var open = event.newState === "open"
      trigger.setAttribute("aria-expanded", String(open))

      if (open) {
        place()
        openMenus.add(tracked)
        var items = itemsOf(content)
        if (focusOnOpen === "first" && items.length)
          items[0].focus({ preventScroll: true })
        else if (focusOnOpen === "last" && items.length)
          items[items.length - 1].focus({ preventScroll: true })
        else if (!sub) content.focus({ preventScroll: true })
        focusOnOpen = null
        if (sub) trigger.setAttribute("data-popup-open", "")
      } else {
        openMenus.delete(tracked)
        focusOnOpen = null
        if (sub) trigger.removeAttribute("data-popup-open")
      }
    })

    function openMenu(focus) {
      focusOnOpen = focus || null
      if (isOpen(content)) {
        var items = itemsOf(content)
        if (focus === "first" && items.length) items[0].focus()
        if (focus === "last" && items.length) items[items.length - 1].focus()
        focusOnOpen = null
      } else {
        content.showPopover()
      }
    }

    /* Trigger */
    trigger.addEventListener("click", function (event) {
      if (sub) {
        // A submenu opens and stays open; it is not toggled by a click.
        event.preventDefault()
        if (!isOpen(content)) openMenu("first")
        return
      }
      // Enter / Space fire a click with detail 0: focus the first item.
      if (event.detail === 0) focusOnOpen = "first"
    })

    trigger.addEventListener("keydown", function (event) {
      var rtl = getComputedStyle(trigger).direction === "rtl"
      var forward = rtl ? "ArrowLeft" : "ArrowRight"

      if (sub) {
        if (event.key === forward) {
          event.preventDefault()
          openMenu("first")
        }
        return
      }
      if (event.key === "ArrowDown") {
        event.preventDefault()
        openMenu("first")
      } else if (event.key === "ArrowUp") {
        event.preventDefault()
        openMenu("last")
      }
    })

    if (sub) {
      // Hover a submenu trigger: open after a short delay.
      trigger.addEventListener("pointerenter", function (event) {
        if (event.pointerType !== "mouse") return
        clearTimeout(hoverTimer)
        clearTimeout(parentContent.__npGrace)
        hoverTimer = setTimeout(function () {
          if (!isOpen(content)) openMenu(null)
        }, HOVER_OPEN_DELAY)
      })
      trigger.addEventListener("pointerleave", function () {
        clearTimeout(hoverTimer)
      })
      // Pointer reached the submenu: cancel the pending close of the parent.
      content.addEventListener("pointerenter", function () {
        clearTimeout(parentContent.__npGrace)
      })
    }

    /* Hover highlight follows the pointer (focus moves to the hovered item) */
    content.addEventListener("pointermove", function (event) {
      if (event.pointerType !== "mouse") return
      var item = event.target.closest(ITEM)
      if (
        !item ||
        item.closest('[role="menu"]') !== content ||
        isDisabled(item)
      )
        return
      if (document.activeElement !== item) item.focus({ preventScroll: true })

      if (!isSubTrigger(item)) {
        // Moving to a plain item closes an open submenu after a grace period,
        // so the pointer can cross other items on its way to the submenu.
        clearTimeout(content.__npGrace)
        content.__npGrace = setTimeout(function () {
          closeOpenSubmenus(content)
        }, HOVER_CLOSE_GRACE)
      }
    })

    content.addEventListener("pointerleave", function () {
      var active = document.activeElement
      if (
        active &&
        active !== content &&
        active.closest('[role="menu"]') === content
      ) {
        content.focus({ preventScroll: true })
      }
    })

    /* Choosing an item */
    content.addEventListener("click", function (event) {
      var item = event.target.closest(ITEM)
      if (
        !item ||
        item.closest('[role="menu"]') !== content ||
        isDisabled(item)
      )
        return
      if (isSubTrigger(item)) return

      var role = item.getAttribute("role")
      var checked

      if (role === "menuitemcheckbox") {
        checked = item.getAttribute("aria-checked") !== "true"
        item.setAttribute("aria-checked", String(checked))
      } else if (role === "menuitemradio") {
        var group =
          item.closest('[role="group"], [role="radiogroup"]') || content
        Array.prototype.forEach.call(
          group.querySelectorAll('[role="menuitemradio"]'),
          function (radio) {
            radio.setAttribute("aria-checked", String(radio === item))
          }
        )
        checked = true
      }

      item.dispatchEvent(
        new CustomEvent("np-menu:select", {
          bubbles: true,
          detail: {
            item: item,
            role: role,
            checked: checked,
            value: item.getAttribute("data-value"),
          },
        })
      )

      var closeAttr = item.getAttribute("data-np-close-on-click")
      var closes = closeAttr ? closeAttr === "true" : role === "menuitem"
      if (closes) {
        var root = rootOf(content)
        if (isOpen(root)) root.hidePopover()
        if (root.__npTrigger) root.__npTrigger.focus()
      }
    })

    /* Keyboard inside the menu */
    content.addEventListener("keydown", function (event) {
      var target = event.target
      if (target !== content && target.closest('[role="menu"]') !== content)
        return

      var rtl = getComputedStyle(content).direction === "rtl"
      var forward = rtl ? "ArrowLeft" : "ArrowRight"
      var back = rtl ? "ArrowRight" : "ArrowLeft"
      var items = itemsOf(content)
      var index = items.indexOf(document.activeElement)
      var next = null

      if (event.key === "ArrowDown")
        next = items[index < 0 ? 0 : (index + 1) % items.length]
      else if (event.key === "ArrowUp")
        next =
          items[
            index < 0
              ? items.length - 1
              : (index - 1 + items.length) % items.length
          ]
      else if (event.key === "Home") next = items[0]
      else if (event.key === "End") next = items[items.length - 1]
      else if (event.key === forward) {
        var current = document.activeElement
        if (
          current &&
          isSubTrigger(current) &&
          current.closest('[role="menu"]') === content
        ) {
          event.preventDefault()
          current.dispatchEvent(
            new KeyboardEvent("keydown", { key: forward, bubbles: false })
          )
        }
        return
      } else if (event.key === back) {
        if (sub) {
          event.preventDefault()
          if (isOpen(content)) content.hidePopover()
          trigger.focus()
        }
        return
      } else if (event.key === "Tab") {
        event.preventDefault()
        var root = rootOf(content)
        if (isOpen(root)) root.hidePopover()
        if (root.__npTrigger) root.__npTrigger.focus()
        return
      } else if (
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        event.key !== " "
      ) {
        // Typeahead: jump to the next item whose text starts with the typed letters.
        clearTimeout(typeaheadTimer)
        typeahead += event.key.toLowerCase()
        typeaheadTimer = setTimeout(function () {
          typeahead = ""
        }, TYPEAHEAD_RESET)

        var start = index + (typeahead.length === 1 ? 1 : 0)
        for (var i = 0; i < items.length; i++) {
          var candidate = items[(start + i) % items.length]
          if (
            candidate.textContent.trim().toLowerCase().indexOf(typeahead) === 0
          ) {
            next = candidate
            break
          }
        }
        if (!next) return
      } else {
        return
      }

      if (next) {
        event.preventDefault()
        next.focus({ preventScroll: false })
      }
    })
  }

  //  * Public API

  function init(root) {
    var scope = root || document
    if (scope.matches && scope.matches(WRAPPER)) setup(scope)
    Array.prototype.forEach.call(scope.querySelectorAll(WRAPPER), setup)
  }

  function resolveContent(target) {
    if (!target) return null
    if (target.matches("[popover]")) return target
    return (
      target.querySelector(":scope > [popover]") ||
      target.querySelector("[popover]")
    )
  }

  function open(target) {
    var content = resolveContent(target)
    if (content && !isOpen(content)) content.showPopover()
  }

  function close(target) {
    var content = resolveContent(target)
    if (content && isOpen(content)) content.hidePopover()
  }

  global.NpMenu = {
    init: init,
    open: open,
    close: close,
    computePosition: computePosition,
  }

  if (typeof document !== "undefined") {
    var start = function () {
      init(document)
      if (typeof MutationObserver !== "undefined") {
        new MutationObserver(function (records) {
          records.forEach(function (record) {
            Array.prototype.forEach.call(record.addedNodes, function (node) {
              if (node.nodeType === 1) init(node)
            })
          })
        }).observe(document.body, { childList: true, subtree: true })
      }
      window.addEventListener("resize", schedulePlacement)
      window.addEventListener("scroll", schedulePlacement, true)
    }

    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", start)
    else start()
  }
})(typeof window !== "undefined" ? window : globalThis)
