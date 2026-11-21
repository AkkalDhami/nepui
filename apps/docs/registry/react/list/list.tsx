"use client"

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  SVGProps,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import "../tokens.css"
import "./list.css"

const listVariants = cva("np-list", {
  variants: {
    variant: {
      default: "",
      plain: "np-list-plain",
      divided: "np-list-divided",
      bordered: "np-list-bordered",
    },
    size: {
      default: "",
      sm: "np-list-sm",
      lg: "np-list-lg",
    },
    marker: {
      auto: "",
      disc: "np-list-disc",
      circle: "np-list-circle",
      square: "np-list-square",
      decimal: "np-list-decimal",
      "decimal-leading-zero": "np-list-decimal-leading-zero",
      "lower-alpha": "np-list-lower-alpha",
      "upper-alpha": "np-list-upper-alpha",
      "lower-roman": "np-list-lower-roman",
      "upper-roman": "np-list-upper-roman",
      "lower-greek": "np-list-lower-greek",
      outline: "np-list-outline",
      dash: "np-list-dash",
      check: "np-list-check",
      arrow: "np-list-arrow",
      none: "np-list-none",
    },
    orientation: {
      vertical: "",
      horizontal: "np-list-horizontal",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    marker: "auto",
    orientation: "vertical",
  },
})

type ListVariantProps = VariantProps<typeof listVariants>
type ListSelectionMode = "none" | "single" | "multiple"

interface ListContextValue {
  navigation: boolean
  collapsible: boolean
  selectionMode: ListSelectionMode
  selected: string[]
}

const ListContext = createContext<ListContextValue | null>(null)

const LABEL = ":scope > .np-list-label"
const TOGGLE = ":scope > .np-list-label > .np-list-toggle"
const SUBLIST = ":scope > ul, :scope > ol"

function isDisabled(li: HTMLElement) {
  return (
    li.getAttribute("aria-disabled") === "true" ||
    li.hasAttribute("data-disabled")
  )
}

function visibleItems(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLLIElement>("li")).filter((li) => {
    if (isDisabled(li)) return false
    let parent = li.parentElement?.closest("li") ?? null
    while (parent && root.contains(parent)) {
      if (parent.hasAttribute("data-collapsed")) return false
      parent = parent.parentElement?.closest("li") ?? null
    }
    return true
  })
}

function itemText(li: HTMLElement) {
  const label = li.querySelector(LABEL)
  if (label) return label.textContent?.trim() ?? ""
  let text = ""
  li.childNodes.forEach((node) => {
    if (!(node instanceof HTMLElement && node.matches("ul, ol"))) {
      text += node.textContent ?? ""
    }
  })
  return text.trim()
}

function itemValue(li: HTMLElement) {
  return li.dataset.value ?? itemText(li)
}

function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 6L9 17l-5-5"
      />
    </svg>
  )
}

interface ListProps extends ComponentProps<"ul"> {
  /** Render an `<ol>` instead of a `<ul>`. */
  ordered?: boolean
  /** Visual style of the list. */
  variant?: NonNullable<ListVariantProps["variant"]>
  /** Font size and toggle size. Nested lists inherit it. */
  size?: NonNullable<ListVariantProps["size"]>
  /** Marker type. Leave unset to cycle markers by nesting depth. */
  marker?: NonNullable<ListVariantProps["marker"]>
  /** Lay items out in a row. */
  orientation?: NonNullable<ListVariantProps["orientation"]>
  /** Draw guide lines beside nested lists. */
  guides?: boolean
  /** Place markers inside the item box. */
  inside?: boolean
  /** First number of an ordered list. */
  start?: number
  /** Count an ordered list down. */
  reversed?: boolean
  /** Roving tabindex with arrow-key navigation (root list only). */
  navigation?: boolean
  /** Wrap from the last item to the first and back. */
  loop?: boolean
  /** Show a toggle on items that contain a nested `List`. */
  collapsible?: boolean
  /** Turn the list into a single or multiple selection listbox (flat lists only). */
  selectionMode?: ListSelectionMode
  /** Selected item values (controlled). */
  value?: string[]
  /** Initially selected item values. */
  defaultValue?: string[]
  /** Called with the next selected values. */
  onValueChange?: (value: string[]) => void
}

function List({
  className,
  children,
  ordered = false,
  variant,
  size,
  marker,
  orientation,
  guides = false,
  inside = false,
  start,
  reversed,
  navigation = false,
  loop = false,
  collapsible = false,
  selectionMode = "none",
  value,
  defaultValue,
  onValueChange,
  onKeyDown,
  onClick,
  onFocus,
  ref,
  ...props
}: ListProps) {
  const parent = useContext(ListContext)
  const isRoot = parent === null
  const interactive = isRoot && (navigation || selectionMode !== "none")
  const rootRef = useRef<HTMLUListElement | null>(null)
  const activeRef = useRef<HTMLLIElement | null>(null)
  const anchorRef = useRef<HTMLLIElement | null>(null)
  const typeahead = useRef({ buffer: "", timer: 0 })
  const [inner, setInner] = useState<string[]>(defaultValue ?? [])
  const selected = value ?? inner
  const horizontal = orientation === "horizontal"

  const setRefs = useCallback(
    (node: HTMLUListElement | null) => {
      rootRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  const setActive = useCallback((li: HTMLLIElement | null, focus = true) => {
    const root = rootRef.current
    if (!root || !li) return
    root.querySelectorAll<HTMLLIElement>("li").forEach((item) => {
      item.tabIndex = item === li ? 0 : -1
    })
    activeRef.current = li
    if (focus) li.focus()
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!interactive || !root) return
    const list = visibleItems(root)
    const current =
      activeRef.current && list.includes(activeRef.current)
        ? activeRef.current
        : (list.find((li) => li.getAttribute("aria-selected") === "true") ??
          list[0] ??
          null)
    root.querySelectorAll<HTMLLIElement>("li").forEach((li) => {
      li.tabIndex = li === current ? 0 : -1
    })
    activeRef.current = current
  })

  const context = useMemo<ListContextValue>(
    () => ({
      navigation: navigation || selectionMode !== "none",
      collapsible,
      selectionMode,
      selected,
    }),
    [navigation, collapsible, selectionMode, selected]
  )

  function commit(next: string[]) {
    if (value === undefined) setInner(next)
    onValueChange?.(next)
  }

  function select(li: HTMLLIElement) {
    const itemId = itemValue(li)
    if (selectionMode === "single") commit([itemId])
    else {
      commit(
        selected.includes(itemId)
          ? selected.filter((v) => v !== itemId)
          : [...selected, itemId]
      )
    }
    anchorRef.current = li
  }

  function addToSelection(items: HTMLLIElement[]) {
    commit(Array.from(new Set([...selected, ...items.map(itemValue)])))
  }

  function findTypeahead(key: string, list: HTMLLIElement[], index: number) {
    const state = typeahead.current
    window.clearTimeout(state.timer)
    state.buffer += key.toLowerCase()
    state.timer = window.setTimeout(() => {
      state.buffer = ""
    }, 500)
    const buffer = state.buffer
    const repeated = buffer.split("").every((char) => char === buffer[0])
    const search = repeated ? buffer[0] : buffer
    const from = repeated ? index + 1 : index
    const sorted = list.slice(from).concat(list.slice(0, from))
    return (
      sorted.find((item) => itemText(item).toLowerCase().startsWith(search)) ??
      null
    )
  }

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    onKeyDown?.(event)
    const root = rootRef.current
    const li = event.target as HTMLElement
    if (event.defaultPrevented || !interactive || !root) return
    if (li.tagName !== "LI" || !root.contains(li)) return

    const list = visibleItems(root)
    const index = list.indexOf(li as HTMLLIElement)
    if (index < 0) return

    const rtl = getComputedStyle(root).direction === "rtl"
    const next = horizontal ? (rtl ? "ArrowLeft" : "ArrowRight") : "ArrowDown"
    const prev = horizontal ? (rtl ? "ArrowRight" : "ArrowLeft") : "ArrowUp"
    const open = rtl ? "ArrowLeft" : "ArrowRight"
    const close = rtl ? "ArrowRight" : "ArrowLeft"
    const key = event.key
    const hasSub = li.querySelector(SUBLIST) !== null
    const collapsed = li.hasAttribute("data-collapsed")
    const toggle = li.querySelector<HTMLButtonElement>(TOGGLE)
    let target: HTMLLIElement | null | undefined = null
    let handled = true

    if (key === next) target = list[index + 1] ?? (loop ? list[0] : null)
    else if (key === prev) {
      target = list[index - 1] ?? (loop ? list[list.length - 1] : null)
    } else if (key === "Home") target = list[0]
    else if (key === "End") target = list[list.length - 1]
    else if (!horizontal && key === open && hasSub) {
      const child = list[index + 1]
      if (collapsed) toggle?.click()
      else if (child && li.contains(child)) target = child
    } else if (!horizontal && key === close) {
      if (toggle && hasSub && !collapsed) toggle.click()
      else {
        const parentItem = li.parentElement?.closest("li")
        if (parentItem && root.contains(parentItem)) {
          target = parentItem as HTMLLIElement
        }
      }
    } else if (!horizontal && key === "*") {
      Array.from(li.parentElement?.children ?? []).forEach((sibling) => {
        if (sibling.tagName !== "LI" || !sibling.hasAttribute("data-collapsed"))
          return
        sibling.querySelector<HTMLButtonElement>(TOGGLE)?.click()
      })
    } else if (key === "Enter" || key === " ") {
      if (selectionMode !== "none") select(li as HTMLLIElement)
      else if (toggle) toggle.click()
      else handled = false
    } else if (
      selectionMode === "multiple" &&
      (event.ctrlKey || event.metaKey) &&
      key.toLowerCase() === "a"
    ) {
      addToSelection(list)
    } else if (
      key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      target = findTypeahead(key, list, index)
      handled = Boolean(target)
    } else {
      handled = false
    }

    if (target) {
      if (
        selectionMode === "multiple" &&
        event.shiftKey &&
        (key === next || key === prev)
      ) {
        addToSelection([li as HTMLLIElement, target])
      }
      setActive(target)
    }
    if (handled) event.preventDefault()
  }

  function handleClick(event: MouseEvent<HTMLUListElement>) {
    onClick?.(event)
    const root = rootRef.current
    const target = event.target as HTMLElement
    if (event.defaultPrevented || !interactive || !root) return
    const li = target.closest("li") as HTMLLIElement | null
    if (!li || !root.contains(li) || isDisabled(li)) return

    if (target.closest(".np-list-toggle")) {
      setActive(li)
      return
    }
    if (selectionMode === "none") return
    if (target.closest("a, button, input, select, textarea")) return
    setActive(li)
    if (selectionMode === "multiple" && event.shiftKey && anchorRef.current) {
      const from = visibleIndex(root, anchorRef.current)
      const to = visibleIndex(root, li)
      if (from >= 0 && to >= 0) {
        const range = visibleItems(root).slice(
          Math.min(from, to),
          Math.max(from, to) + 1
        )
        addToSelection(range)
        return
      }
    }
    select(li)
  }

  function handleFocus(event: FocusEvent<HTMLUListElement>) {
    onFocus?.(event)
    const li = event.target as HTMLElement
    if (!interactive || li.tagName !== "LI" || isDisabled(li)) return
    setActive(li as HTMLLIElement, false)
  }

  const Comp = (ordered ? "ol" : "ul") as "ul"
  const orderedProps = ordered ? ({ start, reversed } as object) : undefined
  const isCollapsible = isRoot ? collapsible : parent.collapsible

  const element = (
    <Comp
      data-slot="list"
      data-variant={variant}
      data-size={size}
      data-marker={marker}
      data-orientation={orientation}
      data-guides={guides ? "" : undefined}
      data-inside={inside ? "" : undefined}
      data-collapsible={isCollapsible ? "" : undefined}
      role={isRoot && selectionMode !== "none" ? "listbox" : undefined}
      aria-multiselectable={
        isRoot && selectionMode === "multiple" ? true : undefined
      }
      {...orderedProps}
      {...props}
      ref={setRefs}
      className={cn(
        listVariants({ variant, size, marker, orientation }),
        guides && "np-list-guides",
        inside && "np-list-inside",
        className
      )}
      onKeyDown={interactive ? handleKeyDown : onKeyDown}
      onClick={interactive ? handleClick : onClick}
      onFocus={interactive ? handleFocus : onFocus}
    >
      {children}
    </Comp>
  )

  if (!isRoot) return element
  return <ListContext.Provider value={context}>{element}</ListContext.Provider>
}

function visibleIndex(root: HTMLElement, li: HTMLLIElement) {
  return visibleItems(root).indexOf(li)
}

function isList(node: ReactNode): node is ReactElement<{ id?: string }> {
  return isValidElement(node) && node.type === List
}

interface ListItemProps extends ComponentProps<"li"> {
  /** Identifier used by selection. Required for selectable items. */
  value?: string
  /** Skip the item in keyboard navigation and selection. */
  disabled?: boolean
  /** Expanded state of a nested list (controlled). */
  expanded?: boolean
  /** Initial expanded state of a nested list. */
  defaultExpanded?: boolean
  /** Called when the nested list is toggled. */
  onExpandedChange?: (expanded: boolean) => void
}

function ListItem({
  className,
  children,
  value,
  disabled = false,
  expanded: expandedProp,
  defaultExpanded = true,
  onExpandedChange,
  ...props
}: ListItemProps) {
  const ctx = useContext(ListContext)
  const textId = useId()
  const subId = useId()
  const [innerExpanded, setInnerExpanded] = useState(defaultExpanded)
  const expanded = expandedProp ?? innerExpanded
  const nodes = Children.toArray(children)
  const subs = nodes.filter(isList)
  const content = nodes.filter((node) => !isList(node))
  const hasSub = subs.length > 0
  const collapsible = hasSub && ctx?.collapsible === true
  const selectable = ctx !== null && ctx.selectionMode !== "none"
  const selected =
    selectable &&
    value !== undefined &&
    (ctx?.selected.includes(value) ?? false)

  function toggle() {
    const next = !expanded
    if (expandedProp === undefined) setInnerExpanded(next)
    onExpandedChange?.(next)
  }

  return (
    <li
      data-slot="list-item"
      data-value={value}
      data-disabled={disabled ? "" : undefined}
      data-collapsed={collapsible && !expanded ? "" : undefined}
      aria-disabled={disabled || undefined}
      role={selectable ? "option" : undefined}
      aria-selected={selectable ? selected : undefined}
      {...props}
      className={cn("np-list-item", className)}
    >
      {hasSub ? (
        <>
          <span className="np-list-label" data-slot="list-label">
            {collapsible && (
              <button
                type="button"
                className="np-list-toggle"
                data-slot="list-toggle"
                aria-expanded={expanded}
                aria-controls={subId}
                aria-labelledby={textId}
                tabIndex={ctx?.navigation ? -1 : undefined}
                onClick={toggle}
              >
                <ChevronIcon />
              </button>
            )}
            <span id={textId} className="np-list-text">
              {content}
            </span>
          </span>
          {subs.map((sub, index) =>
            index === 0 ? cloneElement(sub, { id: sub.props.id ?? subId }) : sub
          )}
        </>
      ) : (
        children
      )}
    </li>
  )
}

export { List, ListItem, listVariants }
