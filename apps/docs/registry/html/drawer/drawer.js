;(function () {
  var SEL = "dialog.np-drawer-content, dialog[data-np-drawer-content]"
  var INTERACTIVE =
    'a[href], button, input, select, textarea, label, summary, [contenteditable], [data-no-swipe], .np-drawer-panel:not([data-allow-selection="false"]), [data-np-drawer-panel]:not([data-allow-selection="false"])'

  function sideOf(d) {
    if (d.matches(".np-drawer-top, [data-side='top']")) return "top"
    if (d.matches(".np-drawer-left, [data-side='left']")) return "left"
    if (d.matches(".np-drawer-right, [data-side='right']")) return "right"
    return "bottom"
  }

  function canScroll(el, d, axis, sign) {
    // Is there an element between the target and the drawer that can still
    // scroll against the drag? Then let it scroll instead.
    for (var n = el; n && n !== d.parentNode; n = n.parentNode) {
      if (n.nodeType !== 1) continue
      var s = getComputedStyle(n)
      var scrollable =
        axis === "y"
          ? /(auto|scroll)/.test(s.overflowY) && n.scrollHeight > n.clientHeight
          : /(auto|scroll)/.test(s.overflowX) && n.scrollWidth > n.clientWidth
      if (!scrollable) continue
      var pos = axis === "y" ? n.scrollTop : n.scrollLeft
      var max =
        axis === "y"
          ? n.scrollHeight - n.clientHeight
          : n.scrollWidth - n.clientWidth
      // sign > 0: dragging toward +axis, which scrolls the content toward its start.
      if (sign > 0 ? pos > 0 : pos < max - 1) return true
    }
    return false
  }

  function init(d) {
    if (d.__npDrawer) return
    d.__npDrawer = true

    var side = sideOf(d)
    var axis = side === "top" || side === "bottom" ? "y" : "x"
    // The direction of dismissal along the axis: +1 for bottom/right, -1 for top/left.
    var dir = side === "bottom" || side === "right" ? 1 : -1
    var start = null

    function set(v) {
      d.style.setProperty("--np-drawer-swipe-" + axis, v + "px")
    }
    function reset() {
      d.removeAttribute("data-swiping")
      d.style.removeProperty("--np-drawer-swipe-x")
      d.style.removeProperty("--np-drawer-swipe-y")
    }

    d.addEventListener("pointerdown", function (e) {
      if (e.button !== 0 || start) return
      if (e.target.closest(INTERACTIVE)) return
      start = {
        x: e.clientX,
        y: e.clientY,
        t: performance.now(),
        id: e.pointerId,
        active: false,
        delta: 0,
      }
    })

    d.addEventListener("pointermove", function (e) {
      if (!start || e.pointerId !== start.id) return
      var dx = e.clientX - start.x
      var dy = e.clientY - start.y
      var along = axis === "y" ? dy : dx
      var across = axis === "y" ? dx : dy
      if (!start.active) {
        if (Math.abs(along) < 6 && Math.abs(across) < 6) return
        // Only a drag that is mostly along the axis and toward the edge.
        if (
          Math.abs(across) > Math.abs(along) ||
          along * dir <= 0 ||
          canScroll(e.target, d, axis, dir)
        ) {
          start = null
          return
        }
        start.active = true
        d.setPointerCapture(e.pointerId)
        d.setAttribute("data-swiping", "")
      }
      start.delta = Math.max(0, along * dir)
      set(start.delta * dir)
    })

    function end(e) {
      if (!start || e.pointerId !== start.id) return
      var s = start
      start = null
      if (!s.active) return
      var size = axis === "y" ? d.offsetHeight : d.offsetWidth
      var speed = s.delta / Math.max(1, performance.now() - s.t)
      var dismiss =
        e.type === "pointerup" && (s.delta > size / 3 || speed > 0.5)
      d.removeAttribute("data-swiping")
      if (dismiss) {
        d.close()
        // Let it finish leaving before the swipe offset is cleared.
        setTimeout(reset, 400)
      } else {
        reset()
      }
    }
    d.addEventListener("pointerup", end)
    d.addEventListener("pointercancel", end)
  }

  function initAll() {
    document.querySelectorAll(SEL).forEach(init)
  }

  window.NepuiDrawer = { init: init, initAll: initAll }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll)
  } else {
    initAll()
  }
})()
