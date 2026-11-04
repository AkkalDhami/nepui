;(function () {
  "use strict"

  var ROOT = ".np-tabs, [data-np-tabs]"
  var LIST = '[role="tablist"]'
  var TAB = '[role="tab"]'

  function tabsOf(list) {
    return Array.prototype.slice.call(list.querySelectorAll(TAB))
  }

  function isDisabled(tab) {
    return (
      tab.disabled ||
      tab.getAttribute("aria-disabled") === "true" ||
      tab.hasAttribute("data-disabled")
    )
  }

  function panelOf(tab) {
    var id = tab.getAttribute("aria-controls")
    return id ? document.getElementById(id) : null
  }

  function isSelected(tab) {
    return (
      tab.getAttribute("aria-selected") === "true" ||
      tab.hasAttribute("data-active")
    )
  }

  function select(list, tab, notify) {
    var changed = !isSelected(tab)

    tabsOf(list).forEach(function (item) {
      var on = item === tab
      var panel = panelOf(item)

      item.setAttribute("aria-selected", on ? "true" : "false")
      item.tabIndex = on ? 0 : -1
      if (on) item.setAttribute("data-active", "")
      else item.removeAttribute("data-active")

      if (panel) panel.hidden = !on
    })

    if (notify && changed) {
      list.dispatchEvent(
        new CustomEvent("np-tabs-change", {
          bubbles: true,
          detail: { tab: tab, panel: panelOf(tab) },
        })
      )
    }
  }

  function init() {
    Array.prototype.forEach.call(
      document.querySelectorAll(LIST),
      function (list) {
        if (!list.closest(ROOT)) return

        var tabs = tabsOf(list)
        var initial =
          tabs.filter(function (tab) {
            return isSelected(tab) && !isDisabled(tab)
          })[0] ||
          tabs.filter(function (tab) {
            return !isDisabled(tab)
          })[0]

        if (initial) select(list, initial, false)
      }
    )
  }

  document.addEventListener("click", function (event) {
    var tab = event.target.closest && event.target.closest(TAB)
    if (!tab || isDisabled(tab)) return

    var list = tab.closest(LIST)
    if (!list || !list.closest(ROOT)) return

    select(list, tab, true)
  })

  document.addEventListener("keydown", function (event) {
    var tab = event.target.closest && event.target.closest(TAB)
    if (!tab) return

    var list = tab.closest(LIST)
    var root = list && list.closest(ROOT)
    if (!root) return

    var vertical =
      list.getAttribute("aria-orientation") === "vertical" ||
      root.matches(".np-tabs-vertical, [data-orientation='vertical']")
    var rtl = getComputedStyle(list).direction === "rtl"
    var next = vertical ? "ArrowDown" : rtl ? "ArrowLeft" : "ArrowRight"
    var prev = vertical ? "ArrowUp" : rtl ? "ArrowRight" : "ArrowLeft"
    var loop = !list.hasAttribute("data-no-loop")

    var enabled = tabsOf(list).filter(function (item) {
      return !isDisabled(item)
    })
    var index = enabled.indexOf(tab)
    if (index === -1) return

    var target
    if (event.key === next)
      target = enabled[index + 1] || (loop ? enabled[0] : null)
    else if (event.key === prev)
      target = enabled[index - 1] || (loop ? enabled[enabled.length - 1] : null)
    else if (event.key === "Home") target = enabled[0]
    else if (event.key === "End") target = enabled[enabled.length - 1]
    else return

    event.preventDefault()
    if (!target) return

    target.focus()
    if (list.hasAttribute("data-activate-on-focus")) select(list, target, true)
  })

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
  } else {
    init()
  }
})()
