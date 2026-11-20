const SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
const CHEVRONS = {
  left: `${SVG}<path d="m15 18-6-6 6-6"/></svg>`,
  right: `${SVG}<path d="m9 18 6-6-6-6"/></svg>`,
  down: `${SVG}<path d="m6 9 6 6 6-6"/></svg>`,
}
const NAV = "np-button np-button-ghost np-button-icon np-calendar-nav-button"
const DAY_BUTTON =
  "np-button np-button-ghost np-button-icon np-calendar-day-button"

let uid = 0

function parseISO(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec((value || "").trim())
  return match ? new Date(+match[1], +match[2] - 1, +match[3]) : undefined
}

function parseMonth(value) {
  const match = /^(\d{4})-(\d{2})$/.exec((value || "").trim())
  return match ? new Date(+match[1], +match[2] - 1, 1) : undefined
}

function toISO(date) {
  const y = String(date.getFullYear()).padStart(4, "0")
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

const same = (a, b) => !!a && !!b && toISO(a) === toISO(b)
const addDays = (d, n) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1)

function addMonths(d, n) {
  const target = new Date(d.getFullYear(), d.getMonth() + n, 1)
  const last = new Date(
    target.getFullYear(),
    target.getMonth() + 1,
    0
  ).getDate()
  return new Date(
    target.getFullYear(),
    target.getMonth(),
    Math.min(d.getDate(), last)
  )
}

function isoWeek(date) {
  const t = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  t.setDate(t.getDate() - ((t.getDay() + 6) % 7) + 3)
  const first = new Date(t.getFullYear(), 0, 4)
  return (
    1 +
    Math.round(((t - first) / 86400000 - 3 + ((first.getDay() + 6) % 7)) / 7)
  )
}

function parseMatchers(text) {
  return (text || "")
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean)
    .map((token) => {
      const [a, b] = token.split("/")
      const from = parseISO(a)
      const to = b ? parseISO(b) : from
      return from && to ? { from, to } : null
    })
    .filter(Boolean)
}

const inMatchers = (list, date) =>
  list.some((m) => date >= m.from && date <= m.to)
const flag = (value) => value !== undefined && value !== "false"

function createCalendar(root) {
  const data = root.dataset
  const today = new Date()
  const locale = data.locale || document.documentElement.lang || undefined
  const mode =
    data.mode === "multiple" || data.mode === "range" ? data.mode : "single"
  const months = Math.max(1, Number(data.months) || 1)
  const layout = data.captionLayout || "label"
  const showOutside = data.showOutsideDays !== "false"
  const showWeekNumber = flag(data.showWeekNumber)
  const fixedWeeks = flag(data.fixedWeeks)
  const required = flag(data.required)
  const weekStartsOn =
    data.weekStartsOn !== undefined ? Number(data.weekStartsOn) % 7 : 0
  const min = parseISO(data.min)
  const max = parseISO(data.max)
  const startYear = min
    ? min.getFullYear()
    : Number(data.startYear) || today.getFullYear() - 100
  const endYear = max
    ? max.getFullYear()
    : Number(data.endYear) || today.getFullYear() + 10
  const disabled = parseMatchers(data.disabledDates)
  const booked = parseMatchers(data.bookedDates)
  const disabledWeekdays = (data.disabledWeekdays || "")
    .split(",")
    .filter(Boolean)
    .map(Number)
  const labels = {
    previous: data.labelPrevious || "Go to the Previous Month",
    next: data.labelNext || "Go to the Next Month",
    month: data.labelMonth || "Choose the Month",
    year: data.labelYear || "Choose the Year",
    weekNumber: data.labelWeekNumber || "Week",
  }
  const id = `np-calendar-${++uid}`

  const fmt = {
    caption: new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    }),
    month: new Intl.DateTimeFormat(locale, { month: "short" }),
    weekday: new Intl.DateTimeFormat(locale, { weekday: "short" }),
    weekdayLong: new Intl.DateTimeFormat(locale, { weekday: "long" }),
    full: new Intl.DateTimeFormat(locale, { dateStyle: "full" }),
    number: new Intl.NumberFormat(locale),
    year: new Intl.NumberFormat(locale, { useGrouping: false }),
  }
  const english = (locale || navigator.language || "en")
    .toLowerCase()
    .startsWith("en")

  const state = { value: undefined, month: startOfMonth(today), focus: today }
  if (mode === "single") state.value = parseISO(data.value)
  if (mode === "multiple")
    state.value = (data.value || "").split(",").map(parseISO).filter(Boolean)
  if (mode === "range") {
    const [from, to] = (data.value || "").split(/[/,]/).map(parseISO)
    state.value = from ? { from, to } : undefined
  }

  const initial =
    parseMonth(data.month) ||
    (mode === "single" && state.value) ||
    (mode === "multiple" && state.value[0]) ||
    (mode === "range" && state.value && state.value.from) ||
    today
  state.month = startOfMonth(initial)
  state.focus = initial instanceof Date ? initial : today

  let input = null
  if (data.name) {
    input = document.createElement("input")
    input.type = "hidden"
    input.name = data.name
  }

  const isDisabled = (d) =>
    (min && d < min) ||
    (max && d > max) ||
    disabledWeekdays.includes(d.getDay()) ||
    inMatchers(disabled, d)

  function isSelected(d) {
    const v = state.value
    if (mode === "single") return same(v, d)
    if (mode === "multiple") return v.some((x) => same(x, d))
    if (!v) return false
    return (
      same(v.from, d) ||
      same(v.to, d) ||
      (v.from && v.to && d > v.from && d < v.to)
    )
  }

  function serialize() {
    const v = state.value
    if (mode === "single") return v ? toISO(v) : null
    if (mode === "multiple") return v.map(toISO)
    return v ? { from: toISO(v.from), to: v.to ? toISO(v.to) : null } : null
  }

  function commit() {
    const value = serialize()
    if (input) {
      input.value =
        mode === "multiple"
          ? value.join(",")
          : mode === "range"
            ? value
              ? `${value.from}/${value.to || ""}`
              : ""
            : value || ""
    }
    root.dispatchEvent(
      new CustomEvent("np-calendar-change", {
        bubbles: true,
        detail: { mode, value },
      })
    )
  }

  function select(date) {
    if (isDisabled(date)) return
    if (mode === "single") {
      state.value = same(state.value, date) && !required ? undefined : date
    } else if (mode === "multiple") {
      const has = state.value.some((x) => same(x, date))
      state.value = has
        ? state.value.filter((x) => !same(x, date))
        : [...state.value, date]
    } else {
      const v = state.value
      if (!v || !v.from || v.to) state.value = { from: date, to: undefined }
      else if (date < v.from) state.value = { from: date, to: v.from }
      else state.value = { from: v.from, to: date }
    }
    state.focus = date
    reveal(date)
    commit()
    render(true)
  }

  function reveal(date) {
    const first = state.month
    const last = addMonths(first, months - 1)
    if (date < first) state.month = startOfMonth(date)
    else if (date > new Date(last.getFullYear(), last.getMonth() + 1, 0)) {
      state.month = addMonths(startOfMonth(date), -(months - 1))
    }
  }

  function make(tag, className, text) {
    const el = document.createElement(tag)
    if (className) el.className = className
    if (text !== undefined) el.textContent = text
    return el
  }

  function weekdayLabel(date) {
    const text = fmt.weekday.format(date)
    return english ? text.slice(0, 2) : text
  }

  function weeksOf(monthStart) {
    const last = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth() + 1,
      0
    )
    const lead = (monthStart.getDay() - weekStartsOn + 7) % 7
    let cursor = addDays(monthStart, -lead)
    const weeks = []
    while (cursor <= last || (fixedWeeks && weeks.length < 6)) {
      weeks.push(Array.from({ length: 7 }, (_, i) => addDays(cursor, i)))
      cursor = addDays(cursor, 7)
    }
    return weeks
  }

  function dropdown(kind, monthStart, offset) {
    const wrap = make("span", "np-calendar-dropdown-root")
    const select = make("select", "np-calendar-dropdown")
    select.setAttribute(
      "aria-label",
      kind === "month" ? labels.month : labels.year
    )
    select.dataset.kind = kind
    select.dataset.offset = String(offset)

    if (kind === "month") {
      for (let m = 0; m < 12; m++) {
        const option = make(
          "option",
          "",
          fmt.month.format(new Date(2026, m, 1))
        )
        option.value = String(m)
        option.selected = m === monthStart.getMonth()
        const day = new Date(monthStart.getFullYear(), m, 1)
        const end = new Date(monthStart.getFullYear(), m + 1, 0)
        option.disabled = (min && end < min) || (max && day > max)
        select.append(option)
      }
    } else {
      for (let y = startYear; y <= endYear; y++) {
        const option = make("option", "", fmt.year.format(y))
        option.value = String(y)
        option.selected = y === monthStart.getFullYear()
        select.append(option)
      }
    }

    const label = make("span", "np-calendar-caption-label")
    label.setAttribute("aria-hidden", "true")
    label.append(
      kind === "month"
        ? fmt.month.format(monthStart)
        : fmt.year.format(monthStart.getFullYear())
    )
    const chevron = make("span")
    chevron.style.display = "inline-flex"
    chevron.innerHTML = CHEVRONS.down
    label.append(chevron)
    wrap.append(select, label)
    return wrap
  }

  function caption(monthStart, offset) {
    const box = make("div", "np-calendar-month-caption")
    if (layout === "label") {
      const label = make(
        "span",
        "np-calendar-caption-label",
        fmt.caption.format(monthStart)
      )
      label.id = `${id}-caption-${offset}`
      label.setAttribute("role", "status")
      label.setAttribute("aria-live", "polite")
      box.append(label)
      return box
    }
    const group = make("div", "np-calendar-dropdowns")
    if (layout === "dropdown" || layout === "dropdown-months")
      group.append(dropdown("month", monthStart, offset))
    if (layout === "dropdown" || layout === "dropdown-years")
      group.append(dropdown("year", monthStart, offset))
    box.append(group)
    return box
  }

  function dayCell(date, monthStart, offset, lastMonthStart, tabTarget) {
    const outside = date.getMonth() !== monthStart.getMonth()
    const between =
      outside &&
      ((date < monthStart && offset > 0) ||
        (date >
          new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0) &&
          offset < months - 1))
    const hidden = outside && (!showOutside || between)
    const td = make("td", "np-calendar-day")
    td.setAttribute("role", "gridcell")

    if (hidden) {
      td.classList.add("np-calendar-hidden")
      td.dataset.hidden = "true"
      return td
    }

    const off = isDisabled(date)
    const selected = isSelected(date)
    const v = state.value
    const rangeStart = mode === "range" && v && same(v.from, date)
    const rangeEnd = mode === "range" && v && v.to && same(v.to, date)
    const rangeMiddle =
      mode === "range" && v && v.from && v.to && date > v.from && date < v.to

    if (same(date, today)) {
      td.classList.add("np-calendar-today")
      td.dataset.today = "true"
    }
    if (outside) {
      td.classList.add("np-calendar-outside")
      td.dataset.outside = "true"
    }
    if (off) {
      td.classList.add("np-calendar-disabled")
      td.dataset.disabled = "true"
    }
    if (inMatchers(booked, date)) {
      td.classList.add("np-calendar-booked")
      td.dataset.booked = "true"
    }
    if (selected) {
      td.dataset.selected = "true"
      td.setAttribute("aria-selected", "true")
    }
    if (rangeStart && v.to) td.classList.add("np-calendar-range-start")
    if (rangeEnd) td.classList.add("np-calendar-range-end")
    if (rangeMiddle) td.classList.add("np-calendar-range-middle")

    const button = make("button", DAY_BUTTON, fmt.number.format(date.getDate()))
    button.type = "button"
    const weekend = date.getDay() === 0 || date.getDay() === 6
    const custom = root.npCalendar && root.npCalendar.dayNote
    const note = custom
      ? custom(date)
      : weekend
        ? data.dayNoteWeekend
        : data.dayNoteWeekday
    if (note && !outside) button.append(make("span", "", note))
    button.disabled = off
    button.dataset.day = toISO(date)
    button.tabIndex = tabTarget && same(date, tabTarget) ? 0 : -1
    button.setAttribute(
      "aria-label",
      (same(date, today) ? "Today, " : "") + fmt.full.format(date)
    )
    if (selected && mode === "single") button.dataset.selectedSingle = "true"
    if (selected && mode === "multiple") button.dataset.selectedSingle = "true"
    if (rangeStart) button.dataset.rangeStart = "true"
    if (rangeEnd) button.dataset.rangeEnd = "true"
    if (rangeStart && !v.to) button.dataset.selectedSingle = "true"
    if (rangeMiddle) button.dataset.rangeMiddle = "true"
    td.append(button)
    return td
  }

  function tabTargetDate() {
    const first = state.month
    const lastDay = new Date(first.getFullYear(), first.getMonth() + months, 0)
    const inside = (d) => d >= first && d <= lastDay && !isDisabled(d)
    if (inside(state.focus)) return state.focus
    const selected =
      mode === "single"
        ? [state.value]
        : mode === "multiple"
          ? state.value
          : state.value
            ? [state.value.from]
            : []
    const hit = selected.find((d) => d && inside(d))
    if (hit) return hit
    if (inside(today)) return today
    for (let d = first; d <= lastDay; d = addDays(d, 1))
      if (!isDisabled(d)) return d
    return first
  }

  function render(restoreFocus) {
    const tabTarget = tabTargetDate()
    const wrapper = make("div", "np-calendar-months")
    const nav = make("div", "np-calendar-nav")

    const previous = make("button", `${NAV} np-calendar-nav-button-previous`)
    previous.type = "button"
    previous.dataset.nav = "previous"
    previous.setAttribute("aria-label", labels.previous)
    previous.innerHTML = CHEVRONS.left
    const next = make("button", `${NAV} np-calendar-nav-button-next`)
    next.type = "button"
    next.dataset.nav = "next"
    next.setAttribute("aria-label", labels.next)
    next.innerHTML = CHEVRONS.right
    const lastShown = addMonths(state.month, months - 1)
    if (min && state.month <= startOfMonth(min))
      previous.setAttribute("aria-disabled", "true")
    if (max && lastShown >= startOfMonth(max))
      next.setAttribute("aria-disabled", "true")
    nav.append(previous, next)
    wrapper.append(nav)

    for (let i = 0; i < months; i++) {
      const monthStart = addMonths(state.month, i)
      const month = make("div", "np-calendar-month")
      month.append(caption(monthStart, i))

      const table = make("table", "np-calendar-month-grid")
      table.setAttribute("role", "grid")
      if (layout === "label")
        table.setAttribute("aria-labelledby", `${id}-caption-${i}`)
      else table.setAttribute("aria-label", fmt.caption.format(monthStart))

      const head = make("thead")
      head.setAttribute("aria-hidden", "true")
      const headRow = make("tr", "np-calendar-weekdays")
      if (showWeekNumber)
        headRow.append(make("th", "np-calendar-week-number-header"))
      for (let d = 0; d < 7; d++) {
        const date = new Date(2026, 0, 4 + ((weekStartsOn + d) % 7))
        const th = make("th", "np-calendar-weekday", weekdayLabel(date))
        th.scope = "col"
        th.setAttribute("aria-label", fmt.weekdayLong.format(date))
        headRow.append(th)
      }
      head.append(headRow)

      const body = make("tbody")
      for (const week of weeksOf(monthStart)) {
        const row = make("tr", "np-calendar-week")
        if (showWeekNumber) {
          const monday = week.find((d) => d.getDay() === 1) || week[0]
          const cell = make("td", "np-calendar-week-number")
          cell.setAttribute("role", "rowheader")
          cell.setAttribute(
            "aria-label",
            `${labels.weekNumber} ${isoWeek(monday)}`
          )
          cell.append(
            make(
              "div",
              "np-calendar-week-number-cell",
              String(isoWeek(monday)).padStart(2, "0")
            )
          )
          row.append(cell)
        }
        for (const date of week)
          row.append(dayCell(date, monthStart, i, lastShown, tabTarget))
        body.append(row)
      }

      table.append(head, body)
      month.append(table)
      wrapper.append(month)
    }

    root.replaceChildren(wrapper)
    if (input) root.append(input)

    if (restoreFocus) {
      const target = root.querySelector(
        `button[data-day="${toISO(state.focus)}"]`
      )
      if (target) target.focus({ preventScroll: true })
    }
  }

  function goToMonth(date, focus) {
    state.month = startOfMonth(date)
    render(focus)
  }

  function nextEnabled(from, step) {
    let d = from
    for (let i = 0; i < 400; i++) {
      d = addDays(d, step)
      if (!isDisabled(d)) return d
    }
    return from
  }

  root.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null
    if (!target) return

    const nav = target.closest("[data-nav]")
    if (nav && root.contains(nav)) {
      if (nav.getAttribute("aria-disabled") === "true") return
      goToMonth(
        addMonths(state.month, nav.dataset.nav === "next" ? 1 : -1),
        false
      )
      return
    }

    const day = target.closest("button[data-day]")
    if (day && root.contains(day)) {
      const date = parseISO(day.dataset.day)
      if (date) select(date)
    }
  })

  root.addEventListener("change", (event) => {
    const el = event.target
    if (!(el instanceof HTMLSelectElement) || !el.dataset.kind) return
    const offset = Number(el.dataset.offset) || 0
    const current = addMonths(state.month, offset)
    const chosen =
      el.dataset.kind === "month"
        ? new Date(current.getFullYear(), Number(el.value), 1)
        : new Date(Number(el.value), current.getMonth(), 1)
    goToMonth(addMonths(chosen, -offset), false)
    const again = root.querySelector(
      `select[data-kind="${el.dataset.kind}"][data-offset="${offset}"]`
    )
    if (again) again.focus({ preventScroll: true })
  })

  root.addEventListener("keydown", (event) => {
    const button =
      event.target instanceof Element
        ? event.target.closest("button[data-day]")
        : null
    if (!button) return
    const rtl = getComputedStyle(root).direction === "rtl"
    const current = parseISO(button.dataset.day)
    let next = null

    switch (event.key) {
      case "ArrowLeft":
        next = nextEnabled(current, rtl ? 1 : -1)
        break
      case "ArrowRight":
        next = nextEnabled(current, rtl ? -1 : 1)
        break
      case "ArrowUp":
        next = nextEnabled(current, -7)
        break
      case "ArrowDown":
        next = nextEnabled(current, 7)
        break
      case "Home":
        next = addDays(current, -((current.getDay() - weekStartsOn + 7) % 7))
        break
      case "End":
        next = addDays(current, 6 - ((current.getDay() - weekStartsOn + 7) % 7))
        break
      case "PageUp":
        next = addMonths(current, event.shiftKey ? -12 : -1)
        break
      case "PageDown":
        next = addMonths(current, event.shiftKey ? 12 : 1)
        break
      default:
        return
    }

    event.preventDefault()
    if (!next || next.getTime() === current.getTime()) return
    if ((min && next < min) || (max && next > max)) return
    state.focus = next
    reveal(next)
    render(true)
  })

  root.classList.add("np-calendar")
  root.npCalendar = {
    getValue: serialize,
    setValue(value) {
      if (mode === "single") state.value = parseISO(value)
      if (mode === "multiple")
        state.value = (value || []).map(parseISO).filter(Boolean)
      if (mode === "range") {
        const from = value && parseISO(value.from)
        state.value = from ? { from, to: parseISO(value.to) } : undefined
      }
      commit()
      render(false)
    },
    goToMonth(value) {
      const date = parseMonth(value) || parseISO(value)
      if (date) goToMonth(date, false)
    },
  }

  render(false)
  commit()
}

document.addEventListener("click", (event) => {
  const trigger =
    event.target instanceof Element
      ? event.target.closest("[data-np-calendar-set]")
      : null
  if (!trigger) return
  const target = document.querySelector(trigger.dataset.target || "")
  if (!target || !target.npCalendar) return

  const raw = trigger.dataset.npCalendarSet
  const offset = /^[+-]\d+$/.test(raw) ? Number(raw) : null
  const date = offset === null ? parseISO(raw) : addDays(new Date(), offset)
  if (!date) return

  target.npCalendar.setValue(toISO(date))
  target.npCalendar.goToMonth(toISO(date))
})

export function initCalendars(scope = document) {
  scope.querySelectorAll("[data-np-calendar]").forEach((el) => {
    if (el.npCalendar) return
    createCalendar(el)
  })
}

initCalendars()

new MutationObserver(() => initCalendars()).observe(document.documentElement, {
  childList: true,
  subtree: true,
})
