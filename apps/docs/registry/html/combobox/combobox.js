;(function () {
  "use strict"

  if (typeof document === "undefined" || window.npCombobox) return

  const part = (name) => `.np-combobox-${name}, [data-np-combobox-${name}]`
  const ROOT = ".np-combobox, [data-np-combobox]"
  const CONTENT = part("content")
  const LIST = part("list")
  const ITEM = part("item")
  const GROUP = part("group")
  const LABEL = part("label")
  const SEPARATOR = part("separator")
  const EMPTY = part("empty")
  const TRIGGER = part("trigger")
  const CLEAR = part("clear")
  const CHIPS = part("chips")
  const CHIP_REMOVE = part("chip-remove")
  const VALUE = part("value")
  const INPUT_GROUP = ".np-input-group, [data-np-input-group]"
  const DISABLED = '[aria-disabled="true"], [data-disabled]'

  const CAN_POPOVER =
    typeof HTMLElement !== "undefined" && "showPopover" in HTMLElement.prototype

  const GAP = 6
  const EDGE = 8

  const states = new WeakMap()
  const open = new Set()
  let uid = 0

  const isDisabled = (el) => el.disabled === true || el.matches(DISABLED)
  const norm = (text) =>
    text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()
  const labelOf = (item) =>
    item.getAttribute("data-label") ??
    item.textContent.replace(/\s+/g, " ").trim()
  const valueOf = (item) => item.getAttribute("data-value") ?? labelOf(item)
  const isReadonly = (s) => s.input.readOnly

  function init(scope) {
    const target = scope || document
    const roots = target.matches && target.matches(ROOT) ? [target] : []
    roots.push(...target.querySelectorAll(ROOT))
    roots.forEach(setup)
  }

  function setup(root) {
    if (states.has(root)) return

    const input = root.querySelector("input:not([type='hidden'])")
    const content = root.querySelector(CONTENT)
    const list = root.querySelector(LIST)
    if (!input || !content || !list) return

    const id = `np-combobox-${++uid}`
    const s = {
      root,
      id,
      input,
      content,
      list,
      trigger: root.querySelector(TRIGGER),
      clear: root.querySelector(CLEAR),
      chips: root.querySelector(CHIPS),
      valueEl: root.querySelector(VALUE),
      empty: content.querySelector(EMPTY),
      multiple: root.matches("[data-multiple], .np-combobox-multiple"),
      autoHighlight: root.matches(
        "[data-auto-highlight], .np-combobox-auto-highlight"
      ),
      popupMode: content.contains(input),
      placeholder: input.getAttribute("placeholder") || "",
      items: Array.from(list.querySelectorAll(ITEM)),
      groups: Array.from(list.querySelectorAll(GROUP)),
      separators: Array.from(list.querySelectorAll(SEPARATOR)),
      selected: [],
      highlighted: null,
      query: "",
      isOpen: false,
      reflow: null,
    }
    states.set(root, s)

    // ARIA
    list.id = list.id || `${id}-list`
    list.setAttribute("role", "listbox")
    if (s.multiple) list.setAttribute("aria-multiselectable", "true")

    input.setAttribute("role", "combobox")
    input.setAttribute("aria-autocomplete", "list")
    input.setAttribute("aria-haspopup", "listbox")
    input.setAttribute("aria-expanded", "false")
    input.setAttribute("aria-controls", list.id)
    input.setAttribute("autocomplete", "off")

    if (s.empty) s.empty.setAttribute("aria-live", "polite")

    s.groups.forEach((group, index) => {
      group.setAttribute("role", "group")
      const label = group.querySelector(LABEL)
      if (label) {
        label.id = label.id || `${id}-group-${index}`
        group.setAttribute("aria-labelledby", label.id)
      }
    })

    s.items.forEach((item, index) => {
      item.id = item.id || `${id}-item-${index}`
      item.setAttribute("role", "option")
      if (isDisabled(item)) item.setAttribute("aria-disabled", "true")

      const indicator = document.createElement("span")
      indicator.className = "np-combobox-item-indicator"
      indicator.setAttribute("aria-hidden", "true")
      item.appendChild(indicator)

      if (item.getAttribute("aria-selected") === "true") {
        if (!s.multiple) s.selected = []
        s.selected.push(item)
      }
    })

    if (s.trigger) {
      s.trigger.setAttribute("aria-haspopup", "listbox")
      s.trigger.setAttribute("aria-expanded", "false")
      s.trigger.setAttribute("aria-controls", list.id)
      if (
        !s.trigger.hasAttribute("aria-label") &&
        !s.trigger.textContent.trim()
      ) {
        s.trigger.setAttribute("aria-label", "Open options")
      }
      if (!s.popupMode) s.trigger.setAttribute("tabindex", "-1")
    }

    if (s.clear) {
      if (!s.clear.hasAttribute("aria-label"))
        s.clear.setAttribute("aria-label", "Clear")
      s.clear.setAttribute("tabindex", "-1")
    }

    if (s.chips) content.setAttribute("data-chips", "")

    if (CAN_POPOVER) content.setAttribute("popover", "manual")
    else content.hidden = true

    // Events
    input.addEventListener("input", () => onInput(s))
    input.addEventListener("keydown", (event) => onKeydown(s, event))
    input.addEventListener("click", () => {
      if (!s.popupMode) openPopup(s)
    })
    if (s.trigger) {
      s.trigger.addEventListener("keydown", (event) => {
        if (
          s.popupMode &&
          (event.key === "ArrowDown" || event.key === "ArrowUp")
        ) {
          event.preventDefault()
          openPopup(s)
        }
      })
    }
    list.addEventListener("pointermove", (event) => {
      const item = event.target.closest(ITEM)
      if (item && item !== s.highlighted && !isDisabled(item))
        highlight(s, item, false)
    })
    root.addEventListener("click", (event) => onClick(s, event))
    // Keep focus where it is when pressing the popup, trigger, clear or chips.
    root.addEventListener("mousedown", (event) => {
      const target = event.target
      if (target.closest("input")) return
      if (
        target.closest(CONTENT) ||
        target.closest(TRIGGER) ||
        target.closest(CLEAR) ||
        target.closest(CHIP_REMOVE)
      ) {
        event.preventDefault()
      }
    })
    root.addEventListener("focusout", (event) => {
      if (!s.isOpen) return
      const next = event.relatedTarget
      if (next && root.contains(next)) return
      closePopup(s)
    })

    sync(s)
  }

  function sync(s) {
    s.items.forEach((item) => {
      const on = s.selected.includes(item)
      item.setAttribute("aria-selected", on ? "true" : "false")
      item.toggleAttribute("data-selected", on)
    })

    // Chips
    if (s.chips) {
      s.chips
        .querySelectorAll("[data-np-generated]")
        .forEach((el) => el.remove())
      const removeLabel = s.root.getAttribute("data-remove-label") || "Remove"
      s.selected.forEach((item) => {
        const label = labelOf(item)
        const chip = document.createElement("div")
        chip.className = "np-combobox-chip"
        chip.setAttribute("data-np-generated", "")
        chip.append(label)

        const remove = document.createElement("button")
        remove.type = "button"
        remove.className = "np-combobox-chip-remove"
        remove.setAttribute("aria-label", `${removeLabel} ${label}`)
        remove._npItem = item
        chip.append(remove)

        s.input.parentNode.insertBefore(chip, s.input)
      })
      s.input.setAttribute(
        "placeholder",
        s.selected.length ? "" : s.placeholder
      )
    }

    // Hidden inputs for forms
    s.root
      .querySelectorAll("input[data-np-generated]")
      .forEach((el) => el.remove())
    const name = s.root.getAttribute("data-name")
    if (name) {
      const values = s.selected.map(valueOf)
      ;(s.multiple ? values : values.slice(0, 1)).forEach((value) => {
        const hidden = document.createElement("input")
        hidden.type = "hidden"
        hidden.name = name
        hidden.value = value
        hidden.setAttribute("data-np-generated", "")
        s.root.append(hidden)
      })
    }

    // Text
    const first = s.selected[0]
    if (s.popupMode && s.valueEl) {
      s.valueEl.textContent =
        first && !s.multiple
          ? labelOf(first)
          : s.valueEl.getAttribute("data-placeholder") || ""
      if (s.trigger)
        s.trigger.toggleAttribute("data-placeholder", !s.selected.length)
    } else if (!s.multiple && !s.isOpen) {
      s.input.value = first ? labelOf(first) : ""
    } else if (s.multiple && !s.isOpen) {
      s.input.value = ""
    }

    if (s.clear) {
      s.clear.hidden = !(s.selected.length || s.input.value)
    }
  }

  function dispatchChange(s) {
    s.root.dispatchEvent(
      new CustomEvent("np-combobox-change", {
        bubbles: true,
        detail: { value: getValue(s), items: s.selected.slice() },
      })
    )
  }

  function filter(s) {
    const query = norm(s.query.trim())
    let visible = 0

    s.items.forEach((item) => {
      const haystack = norm(
        `${labelOf(item)} ${item.getAttribute("data-keywords") || ""}`
      )
      const match = !query || haystack.includes(query)
      item.hidden = !match
      if (match) visible += 1
    })

    s.groups.forEach((group) => {
      group.hidden = !Array.from(group.querySelectorAll(ITEM)).some(
        (item) => !item.hidden
      )
    })
    s.separators.forEach((separator) => {
      separator.hidden = Boolean(query)
    })

    s.content.toggleAttribute("data-empty", visible === 0)
    s.list.toggleAttribute("data-empty", visible === 0)

    highlight(s, null)
    if (s.autoHighlight && query) highlight(s, navigable(s)[0] || null, true)
  }

  function navigable(s) {
    return s.items.filter(
      (item) => !item.hidden && !isDisabled(item) && !item.closest("[hidden]")
    )
  }

  function highlight(s, item, scroll) {
    if (s.highlighted) s.highlighted.removeAttribute("data-highlighted")
    s.highlighted = item
    if (item) {
      item.setAttribute("data-highlighted", "")
      s.input.setAttribute("aria-activedescendant", item.id)
      if (scroll) item.scrollIntoView({ block: "nearest" })
    } else {
      s.input.removeAttribute("aria-activedescendant")
    }
  }

  function move(s, direction) {
    const items = navigable(s)
    if (!items.length) return
    const index = items.indexOf(s.highlighted)
    let next
    if (direction > 0) next = index === -1 ? items[0] : items[index + 1] || null
    else
      next = index === -1 ? items[items.length - 1] : items[index - 1] || null
    highlight(s, next, true)
  }

  function openPopup(s) {
    if (s.isOpen || isDisabled(s.input) || isDisabled(s.root) || isReadonly(s))
      return

    s.isOpen = true
    open.add(s)
    filter(s)

    if (CAN_POPOVER) {
      if (!s.content.matches(":popover-open")) s.content.showPopover()
    } else {
      s.content.hidden = false
    }

    s.input.setAttribute("aria-expanded", "true")
    if (s.trigger) s.trigger.setAttribute("aria-expanded", "true")
    s.root.setAttribute("data-popup-open", "")

    place(s)
    s.reflow = () => place(s)
    window.addEventListener("resize", s.reflow)
    window.addEventListener("scroll", s.reflow, true)

    const selected = s.selected[0]
    if (selected && !s.query) selected.scrollIntoView({ block: "nearest" })
    if (s.popupMode) s.input.focus()

    s.root.dispatchEvent(
      new CustomEvent("np-combobox-open-change", {
        bubbles: true,
        detail: { open: true },
      })
    )
  }

  function closePopup(s, restoreFocus) {
    if (!s.isOpen) return

    s.isOpen = false
    open.delete(s)
    s.query = ""
    highlight(s, null)

    if (CAN_POPOVER) {
      if (s.content.matches(":popover-open")) s.content.hidePopover()
    } else {
      s.content.hidden = true
    }

    s.input.setAttribute("aria-expanded", "false")
    if (s.trigger) s.trigger.setAttribute("aria-expanded", "false")
    s.root.removeAttribute("data-popup-open")

    window.removeEventListener("resize", s.reflow)
    window.removeEventListener("scroll", s.reflow, true)

    if (s.popupMode) s.input.value = ""
    sync(s)

    if (restoreFocus) (s.popupMode ? s.trigger : s.input)?.focus()

    s.root.dispatchEvent(
      new CustomEvent("np-combobox-open-change", {
        bubbles: true,
        detail: { open: false },
      })
    )
  }

  function place(s) {
    const anchor = s.popupMode
      ? s.trigger || s.root
      : s.chips || s.input.closest(INPUT_GROUP) || s.input
    const rect = anchor.getBoundingClientRect()
    const content = s.content
    const vh = window.innerHeight
    const vw = window.innerWidth
    const rtl = getComputedStyle(anchor).direction === "rtl"

    content.style.setProperty("--anchor-width", `${rect.width}px`)
    if (!CAN_POPOVER) return

    content.style.setProperty("--available-width", `${vw - EDGE * 2}px`)
    content.style.setProperty("--available-height", `${vh - EDGE * 2}px`)

    const natural = content.offsetHeight
    const below = vh - rect.bottom - GAP - EDGE
    const above = rect.top - GAP - EDGE
    const side = natural > below && above > below ? "top" : "bottom"
    const room = Math.max(side === "top" ? above : below, 120)
    content.style.setProperty("--available-height", `${room}px`)

    const width = content.offsetWidth
    let left = rtl ? rect.right - width : rect.left
    left = Math.max(EDGE, Math.min(left, vw - width - EDGE))

    content.style.left = `${left}px`
    content.style.right = "auto"
    if (side === "bottom") {
      content.style.top = `${rect.bottom + GAP}px`
      content.style.bottom = "auto"
    } else {
      content.style.top = "auto"
      content.style.bottom = `${vh - rect.top + GAP}px`
    }
    content.setAttribute("data-side", side)
    content.style.setProperty(
      "--transform-origin",
      `${side === "bottom" ? "top" : "bottom"} ${rtl ? "right" : "left"}`
    )
  }

  function select(s, item) {
    if (isDisabled(item)) return
    const index = s.selected.indexOf(item)

    if (s.multiple) {
      if (index === -1) s.selected.push(item)
      else s.selected.splice(index, 1)
      s.input.value = ""
    } else {
      s.selected = [item]
    }

    s.query = ""
    sync(s)
    dispatchChange(s)
    closePopup(s, s.popupMode)
    if (!s.popupMode) s.input.focus()
  }

  function clearAll(s) {
    if (s.selected.length) {
      s.selected = []
      sync(s)
      dispatchChange(s)
    }
    s.query = ""
    s.input.value = ""
    sync(s)
    if (s.isOpen) filter(s)
    s.input.focus()
  }

  function onInput(s) {
    s.query = s.input.value

    // Emptying the field of a single combobox clears its value.
    if (
      !s.multiple &&
      !s.popupMode &&
      s.input.value === "" &&
      s.selected.length
    ) {
      s.selected = []
      sync(s)
      dispatchChange(s)
    }

    openPopup(s)
    if (s.isOpen) filter(s)
    if (s.clear) s.clear.hidden = !(s.selected.length || s.input.value)
  }

  function onKeydown(s, event) {
    if (event.isComposing) return

    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault()
        const down = event.key === "ArrowDown"
        if (!s.isOpen) {
          openPopup(s)
          const items = navigable(s)
          highlight(
            s,
            s.selected[0] ||
              (down ? items[0] : items[items.length - 1]) ||
              null,
            true
          )
        } else {
          move(s, down ? 1 : -1)
        }
        break
      }
      case "Enter":
        if (s.isOpen && s.highlighted) {
          event.preventDefault()
          select(s, s.highlighted)
        }
        break
      case "Escape":
        if (s.isOpen) {
          event.preventDefault()
          event.stopPropagation()
          closePopup(s, s.popupMode)
        }
        break
      case "Tab":
        closePopup(s)
        break
      case "Backspace":
        if (s.multiple && !s.input.value && s.selected.length) {
          s.selected.pop()
          sync(s)
          dispatchChange(s)
        }
        break
      default:
    }
  }

  function onClick(s, event) {
    const target = event.target

    const remove = target.closest(CHIP_REMOVE)
    if (remove && remove._npItem) {
      const index = s.selected.indexOf(remove._npItem)
      if (index !== -1) s.selected.splice(index, 1)
      sync(s)
      dispatchChange(s)
      s.input.focus()
      return
    }

    if (target.closest(CLEAR)) {
      clearAll(s)
      return
    }

    if (target.closest(TRIGGER)) {
      if (s.isOpen) closePopup(s, s.popupMode)
      else {
        if (!s.popupMode) s.input.focus()
        openPopup(s)
      }
      return
    }

    const item = target.closest(ITEM)
    if (item && s.items.includes(item)) select(s, item)
  }

  document.addEventListener("pointerdown", (event) => {
    open.forEach((s) => {
      if (!s.root.contains(event.target)) closePopup(s)
    })
  })

  function getValue(rootOrState) {
    const s =
      rootOrState && rootOrState.root ? rootOrState : states.get(rootOrState)
    if (!s) return null
    const values = s.selected.map(valueOf)
    return s.multiple ? values : (values[0] ?? "")
  }

  function setValue(root, value) {
    const s = states.get(root)
    if (!s) return
    const wanted = (Array.isArray(value) ? value : [value]).map(String)
    s.selected = s.items.filter((item) => wanted.includes(valueOf(item)))
    if (!s.multiple) s.selected = s.selected.slice(0, 1)
    sync(s)
  }

  window.npCombobox = { init, getValue, setValue }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init())
  } else {
    init()
  }
})()
