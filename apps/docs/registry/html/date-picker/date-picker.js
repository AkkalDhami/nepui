const COPY = [
  "mode",
  "value",
  "month",
  "months",
  "captionLayout",
  "startYear",
  "endYear",
  "showOutsideDays",
  "showWeekNumber",
  "fixedWeeks",
  "weekStartsOn",
  "min",
  "max",
  "disabledDates",
  "disabledWeekdays",
  "bookedDates",
  "required",
  "name",
  "locale",
  "dayNoteWeekday",
  "dayNoteWeekend",
  "labelPrevious",
  "labelNext",
  "labelMonth",
  "labelYear",
  "labelWeekNumber",
]

const SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
const ICON = `${SVG}<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`

let uid = 0

function parseISO(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec((value || "").trim())
  return match ? new Date(+match[1], +match[2] - 1, +match[3]) : undefined
}

function make(tag, className, attrs = {}) {
  const el = document.createElement(tag)
  if (className) el.className = className
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value)
  return el
}

function createDatePicker(host) {
  const id = `np-date-picker-${++uid}`
  const data = host.dataset
  const mode = data.mode === "range" ? "range" : "single"
  const editable = host.hasAttribute("data-editable") && mode === "single"
  const locale = data.locale || document.documentElement.lang || undefined
  const placeholder =
    data.placeholder || (mode === "range" ? "Pick a date range" : "Pick a date")
  const format = new Intl.DateTimeFormat(locale, {
    dateStyle: data.format || (mode === "range" ? "medium" : "long"),
  })
  const closeOnSelect = mode === "single" || data.closeOnSelect !== undefined

  const panel = make("div", "np-popover np-date-picker-content", {
    id: `${id}-panel`,
    popover: "",
    "data-align": editable ? "end" : data.align || "start",
  })
  const calendar = make("div", "np-calendar")
  calendar.setAttribute("data-np-calendar", "")
  for (const key of COPY) {
    if (data[key] !== undefined) calendar.dataset[key] = data[key]
  }
  if (mode === "range" && calendar.dataset.months === undefined)
    calendar.dataset.months = "2"
  panel.append(calendar)

  let trigger = null
  let label = null
  let input = null

  if (editable) {
    const group = make("div", "np-input-group", { id: `${id}-group` })
    input = make("input", "np-input-group-input", { type: "text", placeholder })
    if (data.id) input.id = data.id
    const addon = make("div", "np-input-group-addon np-input-group-addon-end")
    trigger = make(
      "button",
      "np-button np-button-ghost np-button-icon-xs np-input-group-button",
      {
        type: "button",
        popovertarget: panel.id,
        "aria-label": data.triggerLabel || "Select date",
      }
    )
    trigger.innerHTML = ICON
    addon.append(trigger)
    group.append(input, addon)
    panel.setAttribute("data-anchor", `#${group.id}`)
    panel.setAttribute("data-side-offset", "10")
    panel.setAttribute("data-align-offset", "-8")
    host.replaceChildren(group, panel)
  } else {
    trigger = make(
      "button",
      "np-button np-button-outline np-date-picker-trigger",
      {
        type: "button",
        popovertarget: panel.id,
      }
    )
    if (data.id) trigger.id = data.id
    if (host.hasAttribute("data-disabled")) trigger.disabled = true
    trigger.innerHTML = ICON
    label = make("span")
    trigger.append(label)
    host.replaceChildren(trigger, panel)
  }

  function text(value) {
    if (!value) return ""
    if (mode === "single") {
      const date = parseISO(value)
      return date ? format.format(date) : ""
    }
    const from = parseISO(value.from)
    const to = parseISO(value.to)
    if (!from) return ""
    return to
      ? `${format.format(from)} - ${format.format(to)}`
      : format.format(from)
  }

  function show(value) {
    const shown = text(value)
    if (label) {
      label.textContent = shown || placeholder
      trigger.setAttribute("data-empty", String(!shown))
    }
    if (input && document.activeElement !== input) input.value = shown
    host.toggleAttribute("data-empty", !shown)
  }

  const initial = (() => {
    if (!data.value) return null
    if (mode === "single") return data.value
    const [from, to] = data.value.split(/[/,]/)
    return { from, to: to || null }
  })()
  show(initial)

  host.addEventListener("nepui:calendarchange", (event) => {
    if (event.target !== calendar) return
    const { value } = event.detail
    show(value)

    const done = mode === "single" ? !!value : !!(value && value.to)
    if (done && closeOnSelect && panel.matches(":popover-open"))
      panel.hidePopover()

    host.dispatchEvent(
      new CustomEvent("nepui:datepickerchange", {
        bubbles: true,
        detail: { mode, value },
      })
    )
  })

  if (input) {
    input.addEventListener("change", () => {
      const date = new Date(input.value)
      if (!input.value) calendar.npCalendar?.setValue("")
      else if (!Number.isNaN(date.getTime())) {
        const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
        calendar.npCalendar?.setValue(iso)
        calendar.npCalendar?.goToMonth(iso)
      }
    })
    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault()
        if (!panel.matches(":popover-open")) panel.showPopover()
      }
    })
  }

  host.classList.add("np-date-picker")
  host.npDatePicker = {
    getValue: () =>
      calendar.npCalendar ? calendar.npCalendar.getValue() : initial,
    setValue: (value) => calendar.npCalendar?.setValue(value),
    open: () => panel.showPopover(),
    close: () => panel.hidePopover(),
  }
}

export function initDatePickers(scope = document) {
  scope.querySelectorAll("[data-np-date-picker]").forEach((host) => {
    if (host.npDatePicker) return
    createDatePicker(host)
  })
}

initDatePickers()

new MutationObserver(() => initDatePickers()).observe(
  document.documentElement,
  {
    childList: true,
    subtree: true,
  }
)
