;(function () {
  "use strict"

  var GROUP = ".np-resizable, [data-np-resizable]"
  var PANEL = ".np-resizable-panel, [data-np-resizable-panel]"
  var HANDLE = ".np-resizable-handle, [data-np-resizable-handle]"

  function kids(group, selector) {
    return Array.prototype.filter.call(group.children, function (el) {
      return el.matches(selector)
    })
  }

  function isVertical(group) {
    return group.matches(
      '.np-resizable-vertical, [data-orientation="vertical"]'
    )
  }

  function num(value, fallback) {
    var n = parseFloat(value)
    return isNaN(n) ? fallback : n
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
  }

  function setup(group) {
    if (group.__npResizable) return
    group.__npResizable = true

    var panels = kids(group, PANEL)
    var handles = kids(group, HANDLE)
    var vertical = isVertical(group)
    var sizes = []

    // Read the starting sizes, then scale them to add up to 100.
    panels.forEach(function (panel) {
      var raw =
        panel.getAttribute("data-default-size") ||
        panel.style.getPropertyValue("--np-resizable-size")
      sizes.push(num(raw, 1))
    })
    var sum = sizes.reduce(function (a, b) {
      return a + b
    }, 0)
    sizes = sizes.map(function (s) {
      return (s / sum) * 100
    })

    function minOf(i) {
      return num(panels[i].getAttribute("data-min-size"), 0)
    }
    function maxOf(i) {
      return num(panels[i].getAttribute("data-max-size"), 100)
    }

    // The range the first panel of a pair can take, given the second one's limits.
    function rangeOf(i) {
      var total = sizes[i] + sizes[i + 1]
      return {
        lo: Math.max(minOf(i), total - maxOf(i + 1)),
        hi: Math.min(maxOf(i), total - minOf(i + 1)),
        total: total,
      }
    }

    function render() {
      panels.forEach(function (panel, i) {
        panel.style.setProperty("--np-resizable-size", String(sizes[i]))
      })
      handles.forEach(function (handle, i) {
        var range = rangeOf(i)
        handle.setAttribute("aria-valuenow", String(Math.round(sizes[i])))
        handle.setAttribute("aria-valuemin", String(Math.round(range.lo)))
        handle.setAttribute("aria-valuemax", String(Math.round(range.hi)))
      })
    }

    function setPair(i, first) {
      var range = rangeOf(i)
      var next = clamp(first, range.lo, Math.max(range.lo, range.hi))
      if (next === sizes[i]) return
      sizes[i + 1] = range.total - next
      sizes[i] = next
      render()
      group.dispatchEvent(
        new CustomEvent("np-resizable-change", {
          bubbles: true,
          detail: { sizes: sizes.slice() },
        })
      )
    }

    function disabled(handle) {
      return (
        handle.getAttribute("aria-disabled") === "true" ||
        handle.hasAttribute("data-disabled")
      )
    }

    handles.forEach(function (handle, i) {
      if (!panels[i] || !panels[i + 1]) return

      if (!handle.hasAttribute("role")) handle.setAttribute("role", "separator")
      if (!handle.hasAttribute("tabindex") && !disabled(handle))
        handle.tabIndex = 0
      // A separator's orientation is the line itself, across the group's.
      handle.setAttribute(
        "aria-orientation",
        vertical ? "horizontal" : "vertical"
      )
      if (panels[i].id) handle.setAttribute("aria-controls", panels[i].id)

      var start = null

      handle.addEventListener("pointerdown", function (event) {
        if (
          disabled(handle) ||
          (event.pointerType === "mouse" && event.button !== 0)
        )
          return
        var a = panels[i].getBoundingClientRect()
        var b = panels[i + 1].getBoundingClientRect()
        // Pixels that the two panels share, to turn movement into percent.
        var pair = vertical ? a.height + b.height : a.width + b.width
        start = {
          pos: vertical ? event.clientY : event.clientX,
          first: sizes[i],
          perPixel: pair > 0 ? (sizes[i] + sizes[i + 1]) / pair : 0,
          flip: !vertical && getComputedStyle(group).direction === "rtl",
        }
        handle.setPointerCapture(event.pointerId)
        handle.setAttribute("data-dragging", "")
        group.setAttribute("data-resizing", "")
        event.preventDefault()
      })

      handle.addEventListener("pointermove", function (event) {
        if (!start) return
        var delta = (vertical ? event.clientY : event.clientX) - start.pos
        if (start.flip) delta = -delta
        setPair(i, start.first + delta * start.perPixel)
      })

      function stop(event) {
        if (!start) return
        start = null
        handle.removeAttribute("data-dragging")
        group.removeAttribute("data-resizing")
        if (handle.hasPointerCapture(event.pointerId)) {
          handle.releasePointerCapture(event.pointerId)
        }
      }
      handle.addEventListener("pointerup", stop)
      handle.addEventListener("pointercancel", stop)

      handle.addEventListener("keydown", function (event) {
        if (disabled(handle)) return
        var step = num(handle.getAttribute("data-step"), 10)
        var rtl = !vertical && getComputedStyle(group).direction === "rtl"
        var grow = vertical ? "ArrowDown" : rtl ? "ArrowLeft" : "ArrowRight"
        var shrink = vertical ? "ArrowUp" : rtl ? "ArrowRight" : "ArrowLeft"
        var range = rangeOf(i)

        if (event.key === grow) setPair(i, sizes[i] + step)
        else if (event.key === shrink) setPair(i, sizes[i] - step)
        else if (event.key === "Home") setPair(i, range.lo)
        else if (event.key === "End") setPair(i, range.hi)
        else return
        event.preventDefault()
      })
    })

    render()
  }

  function init(group) {
    if (group) setup(group)
  }

  function initAll(root) {
    Array.prototype.forEach.call(
      (root || document).querySelectorAll(GROUP),
      setup
    )
  }

  window.NepuiResizable = { init: init, initAll: initAll }

  // Groups that are added after the page loaded (a docs preview, a router, an
  // injected fragment) are set up as soon as they appear...
  if (window.MutationObserver) {
    new MutationObserver(function (records) {
      records.forEach(function (record) {
        Array.prototype.forEach.call(record.addedNodes, function (node) {
          if (node.nodeType !== 1) return
          if (node.matches(GROUP)) setup(node)
          Array.prototype.forEach.call(node.querySelectorAll(GROUP), setup)
        })
      })
    }).observe(document.documentElement, { childList: true, subtree: true })
  }

  // ...and, as a safety net, a group is set up the first time you touch one of
  // its handles. These listeners run before the handle's own, so the very
  // first key press or drag already works.
  ;["pointerdown", "keydown", "focusin"].forEach(function (type) {
    document.addEventListener(
      type,
      function (event) {
        var target = event.composedPath ? event.composedPath()[0] : event.target
        if (!target || !target.closest) return
        var handle = target.closest(HANDLE)
        var group = handle && handle.parentElement
        if (group && group.matches(GROUP)) setup(group)
      },
      true
    )
  })

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initAll()
    })
  } else {
    initAll()
  }
})()

/**
 * nepui — Resizable (HTML behaviour)
 *
 * A tiny, dependency-free helper that makes `.np-resizable` / `[data-np-resizable]`
 * resizable:
 *   - drag a handle with a mouse, a pen or a finger
 *   - arrow keys, Home and End on a focused handle
 *   - keeps aria-valuenow, aria-valuemin and aria-valuemax on each handle in sync
 *
 * The CSS (resizable.css) does not depend on this file. Without it the panels
 * still lay out from `--np-resizable-size`; they just cannot be resized.
 *
 * Markup:
 *   group    .np-resizable            add .np-resizable-vertical to stack panels
 *   panel    .np-resizable-panel      data-default-size="30"
 *   handle   .np-resizable-handle     between two panels; the script adds role="separator" and tabindex="0"
 *
 * Attributes:
 *   data-default-size               on a panel: its share of the group. 25 and 75 make a quarter and three quarters;
 *                                   "25%" works too. Default 1, so panels without it share equally.
 *   data-min-size / data-max-size   on a panel: a percent of the group. Defaults 0 and 100.
 *   data-step                       on a handle: percent moved per arrow key. Default 10.
 *   data-disabled                   on a handle: it cannot be moved.
 *
 * Event: "np-resizable-change" bubbles from the group. detail: { sizes }, in percent.
 *
 * Sizes always add up to 100. Arrow keys move the handle by `data-step`,
 * Home and End move it as far as the two panels allow. In `dir="rtl"` the
 * left and right arrows swap.
 *
 * A group added after the page loaded is set up on its own. You can still call
 * `NepuiResizable.init(group)` yourself.
 *
 * Keyboard: a handle needs `tabindex="0"` to take focus before the script has
 * run. The demos set `role="separator" tabindex="0"` in the markup.
 */
