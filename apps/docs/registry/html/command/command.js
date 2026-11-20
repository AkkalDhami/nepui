;(function () {
  "use strict"

  if (typeof document === "undefined" || window.npCommand) return

  const part = (name) => `.np-command-${name}, [data-np-command-${name}]`
  const ROOT = ".np-command, [data-np-command]"
  const INPUT = part("input")
  const LIST = part("list")
  const ITEM = part("item")
  const GROUP = part("group")
  const HEADING = part("group-heading")
  const SEPARATOR = part("separator")
  const EMPTY = part("empty")
  const DISABLED = '[data-disabled="true"], [aria-disabled="true"]'
  const DIALOG = "dialog.np-command-dialog, dialog[data-np-command-dialog]"

  const states = new WeakMap()
  let uid = 0

  const norm = (text) =>
    text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()
  const isDisabled = (item) => item.matches(DISABLED)
  const labelOf = (item) => item.textContent.replace(/\s+/g, " ").trim()
  const valueOf = (item) => item.getAttribute("data-value") ?? labelOf(item)

  /** 1 is a perfect match, 0 is no match. Prefix, then word start, then substring, then letters in order. */
  function score(text, query) {
    if (!query) return 1
    if (text === query) return 1
    if (text.startsWith(query)) return 0.9
    const index = text.indexOf(query)
    if (index > -1) {
      return index === 0 || /[\s\-_/.]/.test(text[index - 1]) ? 0.8 : 0.6
    }

    let from = 0
    let last = -1
    let gaps = 0
    for (const char of query) {
      const found = text.indexOf(char, from)
      if (found === -1) return 0
      if (last !== -1) gaps += found - last - 1
      last = found
      from = found + 1
    }
    return Math.max(0.05, 0.4 - gaps * 0.01)
  }

  function init(scope) {
    const target = scope || document
    const roots = target.matches && target.matches(ROOT) ? [target] : []
    roots.push(...target.querySelectorAll(ROOT))
    roots.forEach(setup)
    ;(target.matches && target.matches(DIALOG) ? [target] : [])
      .concat(Array.from(target.querySelectorAll(DIALOG)))
      .forEach(setupDialog)
  }

  function setup(root) {
    if (states.has(root)) return

    const input = root.querySelector(INPUT)
    const list = root.querySelector(LIST)
    if (!input || !list) return

    const id = `np-command-${++uid}`
    const s = {
      root,
      id,
      input,
      list,
      empty: list.querySelector(EMPTY) || root.querySelector(EMPTY),
      items: Array.from(list.querySelectorAll(ITEM)),
      groups: Array.from(list.querySelectorAll(GROUP)),
      separators: Array.from(list.querySelectorAll(SEPARATOR)),
      noFilter: root.hasAttribute("data-no-filter"),
      loop: root.hasAttribute("data-loop"),
      selected: null,
      order: new Map(),
    }
    states.set(root, s)

    // Remember the written order, to restore it when the search is cleared.
    ;[list, ...s.groups].forEach((container) => {
      s.order.set(container, Array.from(container.children))
    })

    list.id = list.id || `${id}-list`
    list.setAttribute("role", "listbox")

    input.setAttribute("role", "combobox")
    input.setAttribute("aria-expanded", "true")
    input.setAttribute("aria-autocomplete", "list")
    input.setAttribute("aria-controls", list.id)
    input.setAttribute("autocomplete", "off")
    input.setAttribute("autocorrect", "off")
    input.setAttribute("spellcheck", "false")

    if (s.empty) s.empty.setAttribute("aria-live", "polite")

    s.groups.forEach((group, index) => {
      group.setAttribute("role", "group")
      const heading = group.querySelector(HEADING)
      if (heading) {
        heading.id = heading.id || `${id}-heading-${index}`
        heading.setAttribute("aria-hidden", "true")
        group.setAttribute("aria-labelledby", heading.id)
      }
    })

    s.items.forEach((item, index) => {
      item.id = item.id || `${id}-item-${index}`
      item.setAttribute("role", "option")
      item.setAttribute("aria-selected", "false")
    })

    input.addEventListener("input", () => filter(s))
    input.addEventListener("keydown", (event) => onKeydown(s, event))
    list.addEventListener("pointermove", (event) => {
      const item = event.target.closest(ITEM)
      if (item && item !== s.selected && !isDisabled(item))
        choose(s, item, false)
    })
    list.addEventListener("click", (event) => {
      const item = event.target.closest(ITEM)
      if (item && s.items.includes(item) && !isDisabled(item)) run(s, item)
    })

    filter(s)
  }

  function visibleItems(s) {
    return s.items.filter(
      (item) => !item.hidden && !isDisabled(item) && !item.closest("[hidden]")
    )
  }

  function filter(s) {
    const query = s.noFilter ? "" : norm(s.input.value.trim())
    const scores = new Map()
    let visible = 0

    s.items.forEach((item) => {
      const value = norm(valueOf(item))
      const keywords = norm(item.getAttribute("data-keywords") || "")
      const best = Math.max(score(value, query), score(keywords, query) * 0.8)
      scores.set(item, best)
      item.hidden = best === 0
      if (best > 0) visible += 1
    })

    s.groups.forEach((group) => {
      group.hidden = !Array.from(group.querySelectorAll(ITEM)).some(
        (item) => !item.hidden
      )
    })
    s.separators.forEach((separator) => {
      separator.hidden = Boolean(query)
    })

    if (s.empty) s.empty.hidden = visible > 0

    reorder(s, query, scores)
    choose(s, visibleItems(s)[0] || null, false)
    s.list.scrollTop = 0
  }

  /** Best matches first while searching, the written order when the search is empty. */
  function reorder(s, query, scores) {
    if (s.noFilter) return

    const groupScore = (group) =>
      Math.max(
        0,
        ...Array.from(group.querySelectorAll(ITEM)).map(
          (item) => scores.get(item) || 0
        )
      )

    s.order.forEach((written, container) => {
      if (!query) {
        written.forEach((child) => container.append(child))
        return
      }

      const units = written.filter(
        (child) => child.matches(ITEM) || child.matches(GROUP)
      )
      const others = written.filter((child) => !units.includes(child))
      const rank = (unit) =>
        unit.matches(ITEM) ? scores.get(unit) || 0 : groupScore(unit)
      const sorted = units
        .map((unit, index) => ({ unit, index, value: rank(unit) }))
        .sort((a, b) => b.value - a.value || a.index - b.index)
        .map((entry) => entry.unit)

      sorted.forEach((unit) => container.append(unit))
      others.forEach((child) => container.append(child))
    })
  }

  function choose(s, item, scroll) {
    if (s.selected) {
      s.selected.removeAttribute("data-selected")
      s.selected.setAttribute("aria-selected", "false")
    }
    s.selected = item
    if (item) {
      item.setAttribute("data-selected", "true")
      item.setAttribute("aria-selected", "true")
      s.input.setAttribute("aria-activedescendant", item.id)
      if (scroll) item.scrollIntoView({ block: "nearest" })
    } else {
      s.input.removeAttribute("aria-activedescendant")
    }
  }

  function move(s, step) {
    const items = visibleItems(s)
    if (!items.length) return
    const index = items.indexOf(s.selected)
    let next = index + step
    if (index === -1) next = step > 0 ? 0 : items.length - 1
    else if (next < 0) next = s.loop ? items.length - 1 : 0
    else if (next >= items.length) next = s.loop ? 0 : items.length - 1
    choose(s, items[next], true)
  }

  function onKeydown(s, event) {
    if (event.isComposing) return

    // The dialog shortcut wins over the vim-style Ctrl bindings, for example Ctrl+K.
    const dialog = s.root.closest(DIALOG)
    const reserved = (
      (dialog && dialog.getAttribute("data-shortcut")) ||
      ""
    ).toLowerCase()
    const ctrl =
      event.ctrlKey &&
      !event.metaKey &&
      !event.altKey &&
      event.key.toLowerCase() !== reserved

    if (
      event.key === "ArrowDown" ||
      (ctrl && (event.key === "n" || event.key === "j"))
    ) {
      event.preventDefault()
      move(s, 1)
    } else if (
      event.key === "ArrowUp" ||
      (ctrl && (event.key === "p" || event.key === "k"))
    ) {
      event.preventDefault()
      move(s, -1)
    } else if (event.key === "Home") {
      event.preventDefault()
      choose(s, visibleItems(s)[0] || null, true)
    } else if (event.key === "End") {
      event.preventDefault()
      const items = visibleItems(s)
      choose(s, items[items.length - 1] || null, true)
    } else if (event.key === "Enter") {
      if (s.selected) {
        event.preventDefault()
        s.selected.click()
      }
    }
  }

  function run(s, item) {
    s.root.dispatchEvent(
      new CustomEvent("np-command-select", {
        bubbles: true,
        detail: {
          item,
          value: valueOf(item),
        },
      })
    )

    const dialog = s.root.closest(DIALOG)
    if (dialog && !item.hasAttribute("data-keep-open")) dialog.close()
  }

  function setupDialog(dialog) {
    if (dialog._npCommand) return
    dialog._npCommand = true

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close()
    })
    dialog.addEventListener("close", () => {
      const root = dialog.querySelector(ROOT)
      const s = root && states.get(root)
      if (!s) return
      s.input.value = ""
      filter(s)
    })
  }

  function resolve(dialogOrId) {
    const el =
      typeof dialogOrId === "string"
        ? document.getElementById(dialogOrId)
        : dialogOrId
    return el && el.matches && el.matches("dialog") ? el : null
  }

  function open(dialogOrId) {
    const dialog = resolve(dialogOrId)
    if (!dialog || dialog.open) return
    dialog.showModal()
    const input = dialog.querySelector(INPUT)
    if (input) input.focus()
  }

  function close(dialogOrId) {
    const dialog = resolve(dialogOrId)
    if (dialog && dialog.open) dialog.close()
  }

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return
    const trigger = event.target.closest("[data-command-open]")
    if (trigger) open(trigger.getAttribute("data-command-open"))
  })

  document.addEventListener("keydown", (event) => {
    // A command input that already used the key (for example Ctrl+K as "previous") wins.
    if (event.defaultPrevented) return
    if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey)
      return
    const key = event.key.toLowerCase()
    const dialog = Array.from(
      document.querySelectorAll("dialog[data-shortcut]")
    ).find((el) => el.getAttribute("data-shortcut").toLowerCase() === key)
    if (!dialog) return
    event.preventDefault()
    if (dialog.open) close(dialog)
    else open(dialog)
  })

  window.npCommand = { init, open, close }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init())
  } else {
    init()
  }
})()
