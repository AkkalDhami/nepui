;(function () {
  var selector =
    'input[type="range"].np-slider, input[type="range"][data-np-slider]'
  var groupSelector = ".np-slider-group, [data-np-slider-group]"

  function percentage(el) {
    var min = el.min === "" ? 0 : Number(el.min)
    var max = el.max === "" ? 100 : Number(el.max)
    return max > min ? ((Number(el.value) - min) / (max - min)) * 100 : 0
  }

  function syncGroup(group) {
    var inputs = group.querySelectorAll(selector)
    if (!inputs.length) return
    var values = Array.prototype.map.call(inputs, percentage)
    var start = inputs.length === 1 ? 0 : Math.min.apply(null, values)
    var end = Math.max.apply(null, values)
    group.style.setProperty("--np-slider-start", start + "%")
    group.style.setProperty("--np-slider-end", end + "%")
  }

  function sync(el) {
    el.style.setProperty("--np-slider-percentage", percentage(el) + "%")
    var group = el.closest(groupSelector)
    if (group) syncGroup(group)
  }

  function init(root) {
    root.querySelectorAll(selector).forEach(sync)
  }

  document.addEventListener("input", function (event) {
    if (event.target.matches && event.target.matches(selector))
      sync(event.target)
  })

  document.addEventListener("reset", function (event) {
    setTimeout(function () {
      init(event.target)
    })
  })

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      init(document)
    })
  } else {
    init(document)
  }
})()
