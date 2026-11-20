"use client"

import { useState, type ComponentProps, type CSSProperties } from "react"
import type { DateRange } from "react-day-picker"
import { cn } from "cn"

import { Button } from "@/registry/react/button"
import { Calendar } from "@/registry/react/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/react/popover"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./date-picker.css"

type CalendarOptions = Partial<
  Pick<
    ComponentProps<typeof Calendar>,
    | "captionLayout"
    | "startMonth"
    | "endMonth"
    | "disabled"
    | "locale"
    | "dir"
    | "numberOfMonths"
    | "showWeekNumber"
    | "defaultMonth"
    | "showOutsideDays"
    | "fixedWeeks"
    | "weekStartsOn"
    | "modifiers"
    | "modifiersClassNames"
  >
>

type PickerProps = {
  /** Text shown while nothing is selected. */
  placeholder?: string
  /** BCP 47 locale used to format the date. */
  locale?: string
  /** `Intl.DateTimeFormat` options used to format the date. */
  formatOptions?: Intl.DateTimeFormatOptions
  /** Alignment of the calendar panel against the trigger. */
  align?: "start" | "center" | "end"
  /** Extra props for the calendar, such as `captionLayout` or `disabled`. */
  calendarProps?: CalendarOptions
  disabled?: boolean
  /** Id of the trigger button, so a `Label` can point at it. */
  id?: string
  /** Name of a hidden input that holds the ISO value for forms. */
  name?: string
  className?: string
  style?: CSSProperties
}

function CalendarIcon() {
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
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}

function toISO(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${date.getFullYear()}-${month}-${day}`
}

function DatePicker(
  props: PickerProps & {
    value?: Date
    defaultValue?: Date
    onValueChange?: (date: Date | undefined) => void
  }
) {
  const {
    defaultValue,
    onValueChange,
    placeholder = "Pick a date",
    locale,
    formatOptions = { dateStyle: "long" },
    align = "start",
    calendarProps,
    disabled,
    id,
    name,
    className,
    style,
  } = props

  const [inner, setInner] = useState<Date | undefined>(defaultValue)
  const [open, setOpen] = useState(false)
  const date = "value" in props ? props.value : inner

  const text = date
    ? new Intl.DateTimeFormat(locale, formatOptions).format(date)
    : undefined

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id={id}
              variant="outline"
              disabled={disabled}
              data-empty={!date}
              className={cn("np-date-picker-trigger", className)}
              style={style}
            />
          }
        >
          <CalendarIcon />
          {text ?? <span>{placeholder}</span>}
        </PopoverTrigger>
        <PopoverContent align={align} className="np-date-picker-content">
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={(next) => {
              setInner(next)
              onValueChange?.(next)
              setOpen(false)
            }}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
      {name && (
        <input type="hidden" name={name} value={date ? toISO(date) : ""} />
      )}
    </>
  )
}

function DateRangePicker(
  props: PickerProps & {
    value?: DateRange
    defaultValue?: DateRange
    onValueChange?: (range: DateRange | undefined) => void
  }
) {
  const {
    defaultValue,
    onValueChange,
    placeholder = "Pick a date range",
    locale,
    formatOptions = { dateStyle: "medium" },
    align = "start",
    calendarProps,
    disabled,
    id,
    name,
    className,
    style,
  } = props

  const [inner, setInner] = useState<DateRange | undefined>(defaultValue)
  const range = "value" in props ? props.value : inner

  const format = new Intl.DateTimeFormat(locale, formatOptions)
  const text = range?.from
    ? range.to
      ? `${format.format(range.from)} - ${format.format(range.to)}`
      : format.format(range.from)
    : undefined

  return (
    <>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              id={id}
              variant="outline"
              disabled={disabled}
              data-empty={!range?.from}
              className={cn("np-date-picker-trigger", className)}
              style={style}
            />
          }
        >
          <CalendarIcon />
          {text ?? <span>{placeholder}</span>}
        </PopoverTrigger>
        <PopoverContent align={align} className="np-date-picker-content">
          <Calendar
            mode="range"
            numberOfMonths={2}
            defaultMonth={range?.from}
            selected={range}
            onSelect={(next) => {
              setInner(next)
              onValueChange?.(next)
            }}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
      {name && range?.from && (
        <input
          type="hidden"
          name={name}
          value={`${toISO(range.from)}/${range.to ? toISO(range.to) : ""}`}
        />
      )}
    </>
  )
}

export { DatePicker, DateRangePicker }
