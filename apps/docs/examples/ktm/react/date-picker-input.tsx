"use client"

import { useState } from "react"
import { CalendarBlankIcon } from "@phosphor-icons/react/ssr"

import { Calendar } from "@/registry/react/calendar"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/react/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/react/popover"
import { Field, FieldLabel } from "@/registry/react/field"

function formatDate(date: Date | undefined) {
  if (!date) return ""

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export default function DatePickerInput() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 5, 1))
  const [month, setMonth] = useState<Date | undefined>(date)
  const [value, setValue] = useState(formatDate(date))

  return (
    <Field style={{ width: "100%", maxWidth: "18rem" }}>
      <FieldLabel htmlFor="subscription-date">Subscription Date</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="subscription-date"
          value={value}
          placeholder="June 01, 2026"
          onChange={(event) => {
            setValue(event.target.value)
            const next = new Date(event.target.value)

            if (!Number.isNaN(next.getTime())) {
              setDate(next)
              setMonth(next)
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Select date"
                />
              }
            >
              <CalendarBlankIcon />
            </PopoverTrigger>
            <PopoverContent
              align="end"
              alignOffset={-8}
              sideOffset={10}
              className="np-date-picker-content"
            >
              <Calendar
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                captionLayout="dropdown"
                startMonth={new Date(1926, 0)}
                endMonth={new Date(2036, 11)}
                onSelect={(next) => {
                  setDate(next)
                  setValue(formatDate(next))
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
