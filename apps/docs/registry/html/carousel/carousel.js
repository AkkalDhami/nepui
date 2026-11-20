;(function () {
  var ROOT = ".np-carousel, [data-np-carousel]"

  function init(root) {
    if (root.__npCarousel) return
    var viewport = root.querySelector(
      ":scope > .np-carousel-viewport, :scope > [data-np-carousel-viewport]"
    )
    if (!viewport) return
    root.__npCarousel = true

    var prev = root.querySelector(
      ":scope > .np-carousel-previous, :scope > [data-np-carousel-previous]"
    )
    var next = root.querySelector(
      ":scope > .np-carousel-next, :scope > [data-np-carousel-next]"
    )
    var dots = root.querySelector(
      ":scope > .np-carousel-dots, :scope > [data-np-carousel-dots]"
    )
    var vertical = root.matches(
      '.np-carousel-vertical, [data-orientation="vertical"]'
    )

    function items() {
      return Array.prototype.slice.call(
        viewport.querySelectorAll(".np-carousel-item, [data-np-carousel-item]")
      )
    }
    function rtl() {
      return !vertical && getComputedStyle(viewport).direction === "rtl"
    }
    function pos() {
      return Math.abs(vertical ? viewport.scrollTop : viewport.scrollLeft)
    }
    function max() {
      return vertical
        ? viewport.scrollHeight - viewport.clientHeight
        : viewport.scrollWidth - viewport.clientWidth
    }
    function size() {
      return vertical ? viewport.clientHeight : viewport.clientWidth
    }
    function step() {
      var list = items()
      if (list.length < 2) return size() || 1
      var a = list[0].getBoundingClientRect()
      var b = list[1].getBoundingClientRect()
      return Math.abs(vertical ? b.top - a.top : b.left - a.left) || 1
    }
    function count() {
      return Math.max(1, items().length - Math.round(size() / step()) + 1)
    }
    function index() {
      return Math.min(count() - 1, Math.round(pos() / step()))
    }
    function setDisabled(button, disabled) {
      if (!button) return
      if ("disabled" in button) button.disabled = disabled
      else if (disabled) button.setAttribute("aria-disabled", "true")
      else button.removeAttribute("aria-disabled")
    }

    var dotCount = -1
    function renderDots(n, i) {
      if (!dots) return
      if (n !== dotCount) {
        dotCount = n
        dots.textContent = ""
        for (var k = 0; k < n; k++) {
          var b = document.createElement("button")
          b.type = "button"
          b.className = "np-carousel-dot"
          b.setAttribute("aria-label", "Go to slide " + (k + 1))
          b.setAttribute("data-index", String(k))
          dots.appendChild(b)
        }
      }
      for (var m = 0; m < dots.children.length; m++) {
        if (m === i) dots.children[m].setAttribute("aria-current", "true")
        else dots.children[m].removeAttribute("aria-current")
      }
    }

    var last = -1
    var frame = 0
    function update() {
      frame = 0
      var p = pos()
      setDisabled(prev, p <= 1)
      setDisabled(next, p >= max() - 1)
      var i = index()
      renderDots(count(), i)
      if (i !== last) {
        last = i
        root.dispatchEvent(
          new CustomEvent("np-carousel-change", {
            bubbles: true,
            detail: { index: i, count: count() },
          })
        )
      }
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }

    var target = null
    var timer = 0
    function settle() {
      target = null
    }
    function go(delta) {
      var base = target !== null ? target : index()
      goTo(base + delta)
    }
    function goTo(to) {
      target = Math.max(0, Math.min(count() - 1, to))
      clearTimeout(timer)
      timer = setTimeout(settle, 700)
      var behavior = matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth"
      var offset = target * step()
      var value = vertical ? offset : rtl() ? -offset : offset
      viewport.scrollTo(
        vertical
          ? { top: value, behavior: behavior }
          : { left: value, behavior: behavior }
      )
    }

    if (dots) {
      dots.addEventListener("click", function (event) {
        var d = event.target.closest && event.target.closest("[data-index]")
        if (d && dots.contains(d)) goTo(Number(d.getAttribute("data-index")))
      })
    }
    var drag = null
    var moved = false
    var dragIndex = 0
    viewport.setAttribute("data-draggable", "")
    function endDrag() {
      viewport.removeAttribute("data-dragging")
    }
    viewport.addEventListener("pointerdown", function (event) {
      if (event.pointerType !== "mouse" || event.button !== 0) return
      if (
        event.target.closest &&
        event.target.closest("input, textarea, select, [contenteditable]")
      )
        return
      drag = {
        x: event.clientX,
        y: event.clientY,
        left: viewport.scrollLeft,
        top: viewport.scrollTop,
      }
      moved = false
      dragIndex = target !== null ? target : index()
    })
    viewport.addEventListener("pointermove", function (event) {
      if (!drag) return
      var dx = event.clientX - drag.x
      var dy = event.clientY - drag.y
      var d = vertical ? dy : dx
      if (!moved) {
        if (Math.abs(d) < 4) return
        moved = true
        clearTimeout(timer)
        target = null
        viewport.setAttribute("data-dragging", "")
        viewport.setPointerCapture(event.pointerId)
      }
      if (vertical) viewport.scrollTop = drag.top - dy
      else viewport.scrollLeft = drag.left - dx
    })
    function release(event) {
      if (!drag) return
      var d = vertical ? event.clientY - drag.y : event.clientX - drag.x
      drag = null
      if (!moved) return
      if (viewport.hasPointerCapture(event.pointerId))
        viewport.releasePointerCapture(event.pointerId)
      var forward = vertical ? d < 0 : rtl() ? d > 0 : d < 0
      var threshold = step() * 0.15
      var to = index()
      if (Math.abs(d) > threshold) to = dragIndex + (forward ? 1 : -1)
      endDrag()
      goTo(to)
    }
    viewport.addEventListener("pointerup", release)
    viewport.addEventListener("pointercancel", release)
    viewport.addEventListener(
      "click",
      function (event) {
        if (moved) {
          event.preventDefault()
          event.stopPropagation()
          moved = false
        }
      },
      true
    )
    viewport.addEventListener("dragstart", function (event) {
      event.preventDefault()
    })

    if (prev)
      prev.addEventListener("click", function () {
        go(-1)
      })
    if (next)
      next.addEventListener("click", function () {
        go(1)
      })

    root.addEventListener("keydown", function (event) {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      )
        return
      var t = event.target
      if (
        t &&
        (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))
      )
        return
      var back = vertical ? "ArrowUp" : rtl() ? "ArrowRight" : "ArrowLeft"
      var forward = vertical ? "ArrowDown" : rtl() ? "ArrowLeft" : "ArrowRight"
      if (event.key === back) {
        event.preventDefault()
        go(-1)
      } else if (event.key === forward) {
        event.preventDefault()
        go(1)
      }
    })

    viewport.addEventListener("scroll", schedule, { passive: true })
    viewport.addEventListener("scrollend", settle)
    if (typeof ResizeObserver !== "undefined")
      new ResizeObserver(schedule).observe(viewport)
    update()
  }

  function initAll() {
    document.querySelectorAll(ROOT).forEach(init)
  }

  window.NepuiCarousel = { init: init, initAll: initAll }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll)
  } else {
    initAll()
  }
})()
