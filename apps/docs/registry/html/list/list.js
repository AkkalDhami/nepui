;(() => {
  const LIST = ".np-list, [data-np-list]"
  const LABEL = ".np-list-label, [data-np-list-label]"
  const TOGGLE = ".np-list-toggle, [data-np-list-toggle]"
  const CHEVRON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>'
  const instances = new WeakMap()
  let uid = 0

  const nextId = (prefix) => `${prefix}-${++uid}`
  const flag = (el, name) =>
    el.hasAttribute(name) && el.getAttribute(name) !== "false"
  const isDisabled = (li) =>
    li.getAttribute("aria-disabled") === "true" ||
    li.hasAttribute("data-disabled")
  const sublist = (li) => li.querySelector(":scope > ul, :scope > ol")
  const childMatching = (el, selector) =>
    el ? Array.from(el.children).find((c) => c.matches(selector)) || null : null
  const labelOf = (li) => childMatching(li, LABEL)
  const toggleOf = (li) => childMatching(labelOf(li), TOGGLE)
  const parentItem = (li) =>
    li.parentElement ? li.parentElement.closest("li") : null

  const textOf = (li) => {
    const label = labelOf(li)
    if (label) return label.textContent.trim()
    let text = ""
    li.childNodes.forEach((node) => {
      if (!(node.nodeType === 1 && node.matches("ul, ol")))
        text += node.textContent
    })
    return text.trim()
  }
  const valueOf = (li) =>
    li.dataset.value !== undefined ? li.dataset.value : textOf(li)

  function ensureLabel(li) {
    let label = labelOf(li)
    if (!label) {
      const sub = sublist(li)
      label = document.createElement("span")
      label.className = "np-list-label"
      while (li.firstChild && li.firstChild !== sub)
        label.appendChild(li.firstChild)
      li.insertBefore(label, sub)
    }
    let text = label.querySelector(".np-list-text")
    if (!text) {
      text = document.createElement("span")
      text.className = "np-list-text"
      Array.from(label.childNodes).forEach((node) => {
        if (!(node.nodeType === 1 && node.matches(TOGGLE)))
          text.appendChild(node)
      })
      label.appendChild(text)
    }
    if (!text.id) text.id = nextId("np-list-text")
    return label
  }

  function create(root) {
    const existing = instances.get(root)
    if (existing) return existing

    const rawSelection = root.getAttribute("data-selection")
    const selection =
      rawSelection === "single" || rawSelection === "multiple"
        ? rawSelection
        : "none"
    const collapsible = flag(root, "data-collapsible")
    const navigation = flag(root, "data-navigation") || selection !== "none"
    const loop = flag(root, "data-loop")
    const typeahead = { buffer: "", timer: 0 }
    let active = null
    let anchor = null

    const items = () => Array.from(root.querySelectorAll("li"))
    const isSelected = (li) => li.getAttribute("aria-selected") === "true"
    const isHidden = (li) => {
      let parent = parentItem(li)
      while (parent && root.contains(parent)) {
        if (parent.hasAttribute("data-collapsed")) return true
        parent = parentItem(parent)
      }
      return false
    }
    const visible = () =>
      items().filter((li) => !isDisabled(li) && !isHidden(li))
    const isHorizontal = () =>
      root.getAttribute("data-orientation") === "horizontal" ||
      root.classList.contains("np-list-horizontal")

    function setActive(li, focus) {
      items().forEach((item) => {
        item.tabIndex = item === li ? 0 : -1
      })
      active = li
      if (focus) li.focus()
    }

    function syncRoving() {
      if (!navigation) return
      const list = visible()
      const current =
        active && list.includes(active)
          ? active
          : list.find(isSelected) || list[0] || null
      items().forEach((item) => {
        item.tabIndex = item === current ? 0 : -1
      })
      active = current
    }

    function setExpanded(li, expanded) {
      if (!sublist(li)) return
      const wasExpanded = !li.hasAttribute("data-collapsed")
      if (expanded === wasExpanded) return
      li.toggleAttribute("data-collapsed", !expanded)
      const button = toggleOf(li)
      if (button) button.setAttribute("aria-expanded", String(expanded))
      if (!expanded && active && active !== li && li.contains(active)) {
        setActive(li, root.contains(document.activeElement))
      }
      root.dispatchEvent(
        new CustomEvent("np-list-toggle", {
          bubbles: true,
          detail: { item: li, expanded },
        })
      )
    }

    function ensureToggle(li) {
      const label = ensureLabel(li)
      let button = toggleOf(li)
      if (!button) {
        button = document.createElement("button")
        button.type = "button"
        button.className = "np-list-toggle"
        button.innerHTML = CHEVRON
        label.insertBefore(button, label.firstChild)
      }
      const sub = sublist(li)
      if (!sub.id) sub.id = nextId("np-list-sub")
      button.setAttribute("aria-controls", sub.id)
      button.setAttribute(
        "aria-labelledby",
        label.querySelector(".np-list-text").id
      )
      button.setAttribute(
        "aria-expanded",
        String(!li.hasAttribute("data-collapsed"))
      )
      if (navigation) button.tabIndex = -1
    }

    function setSelected(li, on) {
      li.setAttribute("aria-selected", String(on))
      li.toggleAttribute("data-selected", on)
    }

    function emitChange() {
      root.dispatchEvent(
        new CustomEvent("np-list-change", {
          bubbles: true,
          detail: { value: api.value },
        })
      )
    }

    function select(li) {
      if (isDisabled(li)) return
      if (selection === "single")
        items().forEach((item) => setSelected(item, item === li))
      else setSelected(li, !isSelected(li))
      anchor = li
      emitChange()
    }

    function selectRange(from, to) {
      const list = visible()
      let a = list.indexOf(from)
      let b = list.indexOf(to)
      if (a < 0 || b < 0) return
      if (a > b) [a, b] = [b, a]
      list.slice(a, b + 1).forEach((item) => setSelected(item, true))
      emitChange()
    }

    function selectAll() {
      visible().forEach((item) => setSelected(item, true))
      emitChange()
    }

    function clear() {
      items().forEach((item) => setSelected(item, false))
      emitChange()
    }

    function typeaheadTarget(key, list, index) {
      window.clearTimeout(typeahead.timer)
      typeahead.buffer += key.toLowerCase()
      typeahead.timer = window.setTimeout(() => {
        typeahead.buffer = ""
      }, 500)
      const buffer = typeahead.buffer
      const repeated = buffer.split("").every((char) => char === buffer[0])
      const search = repeated ? buffer[0] : buffer
      const start = repeated ? index + 1 : index
      const ordered = list.slice(start).concat(list.slice(0, start))
      return (
        ordered.find((item) => textOf(item).toLowerCase().startsWith(search)) ||
        null
      )
    }

    function onKeyDown(event) {
      if (!navigation || event.defaultPrevented) return
      const li = event.target
      if (
        !(li instanceof HTMLElement) ||
        li.tagName !== "LI" ||
        !root.contains(li)
      )
        return
      const list = visible()
      const index = list.indexOf(li)
      if (index < 0) return

      const rtl = getComputedStyle(root).direction === "rtl"
      const horizontal = isHorizontal()
      const next = horizontal ? (rtl ? "ArrowLeft" : "ArrowRight") : "ArrowDown"
      const prev = horizontal ? (rtl ? "ArrowRight" : "ArrowLeft") : "ArrowUp"
      const open = rtl ? "ArrowLeft" : "ArrowRight"
      const close = rtl ? "ArrowRight" : "ArrowLeft"
      const key = event.key
      let target = null
      let handled = true

      if (key === next) target = list[index + 1] || (loop ? list[0] : null)
      else if (key === prev)
        target = list[index - 1] || (loop ? list[list.length - 1] : null)
      else if (key === "Home") target = list[0]
      else if (key === "End") target = list[list.length - 1]
      else if (!horizontal && key === open && sublist(li)) {
        const child = list[index + 1]
        if (li.hasAttribute("data-collapsed")) setExpanded(li, true)
        else if (child && li.contains(child)) target = child
      } else if (!horizontal && key === close) {
        if (collapsible && sublist(li) && !li.hasAttribute("data-collapsed")) {
          setExpanded(li, false)
        } else {
          const parent = parentItem(li)
          if (parent && root.contains(parent)) target = parent
        }
      } else if (!horizontal && key === "*") {
        Array.from(li.parentElement.children).forEach((sibling) => {
          if (sibling.tagName === "LI") setExpanded(sibling, true)
        })
      } else if (key === "Enter" || key === " ") {
        if (selection !== "none") select(li)
        else if (collapsible && sublist(li))
          setExpanded(li, li.hasAttribute("data-collapsed"))
        else handled = false
      } else if (
        selection === "multiple" &&
        (event.ctrlKey || event.metaKey) &&
        key.toLowerCase() === "a"
      ) {
        selectAll()
      } else if (
        key.length === 1 &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        target = typeaheadTarget(key, list, index)
        handled = Boolean(target)
      } else {
        handled = false
      }

      if (target) {
        if (
          selection === "multiple" &&
          event.shiftKey &&
          (key === next || key === prev)
        ) {
          setSelected(li, true)
          setSelected(target, true)
          emitChange()
        }
        setActive(target, true)
      }
      if (handled) event.preventDefault()
    }

    function onClick(event) {
      const toggle = event.target.closest(TOGGLE)
      if (toggle && root.contains(toggle)) {
        const li = toggle.closest("li")
        if (li && !isDisabled(li)) {
          setExpanded(li, li.hasAttribute("data-collapsed"))
          if (navigation) setActive(li, true)
        }
        return
      }
      if (selection === "none") return
      if (event.target.closest("a, button, input, select, textarea")) return
      const li = event.target.closest("li")
      if (!li || !root.contains(li) || isDisabled(li)) return
      setActive(li, true)
      if (selection === "multiple" && event.shiftKey && anchor)
        selectRange(anchor, li)
      else select(li)
    }

    function onFocusIn(event) {
      if (!navigation) return
      const li = event.target
      if (
        li instanceof HTMLElement &&
        li.tagName === "LI" &&
        root.contains(li) &&
        !isDisabled(li)
      ) {
        setActive(li, false)
      }
    }

    const api = {
      root,
      get value() {
        return items().filter(isSelected).map(valueOf)
      },
      expand: (li) => setExpanded(li, true),
      collapse: (li) => setExpanded(li, false),
      toggle: (li) => setExpanded(li, li.hasAttribute("data-collapsed")),
      expandAll: () => items().forEach((li) => setExpanded(li, true)),
      collapseAll: () => items().forEach((li) => setExpanded(li, false)),
      focus: (li) => setActive(li, true),
      select,
      selectAll,
      clear,
      destroy() {
        root.removeEventListener("keydown", onKeyDown)
        root.removeEventListener("click", onClick)
        root.removeEventListener("focusin", onFocusIn)
        instances.delete(root)
      },
    }

    if (collapsible)
      root
        .querySelectorAll(LIST)
        .forEach((list) => list.setAttribute("data-collapsible", ""))
    items().forEach((li) => {
      if (!sublist(li)) return
      ensureLabel(li)
      if (collapsible) ensureToggle(li)
    })
    if (selection !== "none") {
      root.setAttribute("role", "listbox")
      if (selection === "multiple")
        root.setAttribute("aria-multiselectable", "true")
      items().forEach((li) => {
        li.setAttribute("role", "option")
        setSelected(li, isSelected(li) || li.hasAttribute("data-selected"))
      })
    }
    syncRoving()

    root.addEventListener("keydown", onKeyDown)
    root.addEventListener("click", onClick)
    root.addEventListener("focusin", onFocusIn)
    instances.set(root, api)
    return api
  }

  function init(scope) {
    ;(scope || document).querySelectorAll(LIST).forEach((el) => {
      if (el.parentElement && el.parentElement.closest(LIST)) return
      if (
        el.hasAttribute("data-navigation") ||
        el.hasAttribute("data-collapsible") ||
        el.hasAttribute("data-selection")
      ) {
        create(el)
      }
    })
  }

  window.NepuiList = { init, create, get: (el) => instances.get(el) || null }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", () => init())
  else init()
})()
