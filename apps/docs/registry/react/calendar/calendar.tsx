"use client"

import { useEffect, useRef, type ComponentProps } from "react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"
import { cn } from "cn"

import { Button } from "@/registry/react/button"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./calendar.css"

const navButton =
  "np-button np-button-ghost np-button-icon np-calendar-nav-button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  bordered = true,
  locale,
  formatters,
  components,
  ...props
}: ComponentProps<typeof DayPicker> & {
  bordered?: boolean
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(className)}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn(
          "np-calendar",
          bordered && "np-calendar-bordered",
          defaultClassNames.root
        ),
        months: cn("np-calendar-months", defaultClassNames.months),
        month: cn("np-calendar-month", defaultClassNames.month),
        nav: cn("np-calendar-nav", defaultClassNames.nav),
        button_previous: cn(
          navButton,
          "np-calendar-nav-button-previous",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          navButton,
          "np-calendar-nav-button-next",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "np-calendar-month-caption",
          defaultClassNames.month_caption
        ),
        dropdowns: cn("np-calendar-dropdowns", defaultClassNames.dropdowns),
        dropdown_root: cn(
          "np-calendar-dropdown-root",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("np-calendar-dropdown", defaultClassNames.dropdown),
        caption_label: cn(
          "np-calendar-caption-label",
          defaultClassNames.caption_label
        ),
        month_grid: cn("np-calendar-month-grid", defaultClassNames.month_grid),
        weekdays: cn("np-calendar-weekdays", defaultClassNames.weekdays),
        weekday: cn("np-calendar-weekday", defaultClassNames.weekday),
        week: cn("np-calendar-week", defaultClassNames.week),
        week_number_header: cn(
          "np-calendar-week-number-header",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "np-calendar-week-number",
          defaultClassNames.week_number
        ),
        day: cn("np-calendar-day", defaultClassNames.day),
        range_start: cn(
          "np-calendar-range-start",
          defaultClassNames.range_start
        ),
        range_middle: cn(
          "np-calendar-range-middle",
          defaultClassNames.range_middle
        ),
        range_end: cn("np-calendar-range-end", defaultClassNames.range_end),
        today: cn("np-calendar-today", defaultClassNames.today),
        outside: cn("np-calendar-outside", defaultClassNames.outside),
        disabled: cn("np-calendar-disabled", defaultClassNames.disabled),
        hidden: cn("np-calendar-hidden", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...rest }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={cn(className)}
            {...rest}
          />
        ),
        Chevron: ({ className, orientation, ...rest }) => {
          const path =
            orientation === "left"
              ? "m15 18-6-6 6-6"
              : orientation === "right"
                ? "m9 18 6-6-6-6"
                : orientation === "up"
                  ? "m18 15-6-6-6 6"
                  : "m6 9 6 6 6-6"

          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={className}
              {...rest}
            >
              <path d={path} />
            </svg>
          )
        },
        DayButton: ({ ...rest }) => (
          <CalendarDayButton locale={locale} {...rest} />
        ),
        WeekNumber: ({ children, ...rest }) => (
          <td {...rest}>
            <div className="np-calendar-week-number-cell">{children}</div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn("np-calendar-day-button", className)}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
