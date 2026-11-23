;(function () {
  var SELECTOR = ".np-timeline, [data-np-timeline]"
  var ITEM = ".np-timeline-item, [data-np-timeline-item]"
  var uid = 0
  var instances = new WeakMap()

  function items(root) {
    return Array.prototype.filter.call(root.children, function (child) {
      return child.matches(ITEM)
    })
  }

  function has(root, name) {
    return root.hasAttribute(name) && root.getAttribute(name) !== "false"
  }

  function status(root, item) {
    var explicit = item.getAttribute("data-status")
    if (explicit) return explicit
    var value = root.getAttribute("data-value")
    var step = item.getAttribute("data-step")
    if (value === null || step === null) return null
    value = Number(value)
    step = Number(step)
    return step <= value
      ? "complete"
      : step === value + 1
        ? "current"
        : "upcoming"
  }

  function init(root) {
    if (instances.has(root)) return instances.get(root)

    var horizontal =
      root.getAttribute("data-orientation") === "horizontal" ||
      root.classList.contains("np-timeline-horizontal")
    var feed = has(root, "data-feed")
    var loop = has(root, "data-loop")
    var last = null

    root.setAttribute(
      "data-orientation",
      horizontal ? "horizontal" : "vertical"
    )
    root.setAttribute("role", feed ? "feed" : "list")

    function sync() {
      var list = items(root)
      root.style.setProperty("--np-timeline-count", list.length)
      if (feed) {
        if (has(root, "data-busy")) root.setAttribute("aria-busy", "true")
        else root.removeAttribute("aria-busy")
      }
      list.forEach(function (item, index) {
        if (!item.id) item.id = "np-timeline-" + ++uid
        var id = item.id
        var s = status(root, item)
        item.style.setProperty("--np-timeline-index", index)
        item.setAttribute("role", feed ? "article" : "listitem")
        item.setAttribute(
          "data-orientation",
          root.getAttribute("data-orientation")
        )
        ;["complete", "current", "upcoming"].forEach(function (name) {
          if (s === name) item.setAttribute("data-" + name, "")
          else item.removeAttribute("data-" + name)
        })
        if (s === "current") item.setAttribute("aria-current", "step")
        else item.removeAttribute("aria-current")
        if (feed) {
          item.setAttribute("aria-posinset", index + 1)
          item.setAttribute("aria-setsize", list.length)
        }
        var title = item.querySelector(
          ".np-timeline-title, [data-np-timeline-title]"
        )
        var time = item.querySelector(
          ".np-timeline-time, [data-np-timeline-time]"
        )
        var description = item.querySelector(
          ".np-timeline-description, [data-np-timeline-description]"
        )
        var described = []
        if (title) {
          if (!title.id) title.id = id + "-title"
          item.setAttribute("aria-labelledby", title.id)
        }
        if (time) {
          if (!time.id) time.id = id + "-time"
          described.push(time.id)
        }
        if (description) {
          if (!description.id) description.id = id + "-description"
          described.push(description.id)
        }
        if (described.length)
          item.setAttribute("aria-describedby", described.join(" "))
        Array.prototype.forEach.call(
          item.querySelectorAll(
            ".np-timeline-marker, [data-np-timeline-marker], .np-timeline-connector, [data-np-timeline-connector]"
          ),
          function (part) {
            part.setAttribute("aria-hidden", "true")
            ;["complete", "current", "upcoming"].forEach(function (name) {
              if (s === name) part.setAttribute("data-" + name, "")
              else part.removeAttribute("data-" + name)
            })
          }
        )
      })
      var stop = last && list.indexOf(last) !== -1 ? last : null
      if (!stop)
        stop =
          list.filter(function (item) {
            return item.hasAttribute("data-current")
          })[0] || list[0]
      list.forEach(function (item) {
        item.tabIndex = item === stop ? 0 : -1
      })
    }

    root.addEventListener("focusin", function (event) {
      if (
        !event.target.matches ||
        !event.target.matches(ITEM) ||
        event.target.parentNode !== root
      )
        return
      last = event.target
      items(root).forEach(function (item) {
        item.tabIndex = item === last ? 0 : -1
      })
    })

    root.addEventListener("keydown", function (event) {
      var target = event.target
      if (
        !target.matches ||
        !target.matches(ITEM) ||
        target.parentNode !== root
      )
        return
      var list = items(root)
      var index = list.indexOf(target)
      var rtl = getComputedStyle(target).direction === "rtl"
      var forward = horizontal
        ? rtl
          ? "ArrowLeft"
          : "ArrowRight"
        : "ArrowDown"
      var backward = horizontal ? (rtl ? "ArrowRight" : "ArrowLeft") : "ArrowUp"
      var next = -1
      if (event.key === "Home") next = 0
      else if (event.key === "End") next = list.length - 1
      else if (event.key === forward || (feed && event.key === "PageDown"))
        next = index + 1
      else if (event.key === backward || (feed && event.key === "PageUp"))
        next = index - 1
      else return
      event.preventDefault()
      if (next >= list.length) next = loop ? 0 : list.length - 1
      if (next < 0) next = loop ? list.length - 1 : 0
      if (list[next]) list[next].focus()
    })

    new MutationObserver(sync).observe(root, {
      childList: true,
      attributes: true,
      attributeFilter: ["data-value", "data-busy"],
    })

    var api = {
      focus: function (value) {
        var list = items(root)
        var target = value
          ? list.filter(function (item) {
              return (
                item.getAttribute("data-value") === value || item.id === value
              )
            })[0]
          : list.filter(function (item) {
              return item.tabIndex === 0
            })[0]
        if (target) target.focus()
      },
      refresh: sync,
    }

    sync()
    instances.set(root, api)
    return api
  }

  function initAll(scope) {
    var nodes = (scope || document).querySelectorAll(SELECTOR)
    for (var i = 0; i < nodes.length; i++) init(nodes[i])
  }

  window.NepuiTimeline = {
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
