"use client"

import { useState, type CSSProperties } from "react"

import { Calendar, CalendarDayButton } from "@/registry/react/calendar"

export default function CalendarCellSize() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 11, 8))

  return (
    <Calendar
      mode="single"
      defaultMonth={date}
      selected={date}
      onSelect={setDate}
      style={{ "--np-calendar-cell-size": "2.75rem" } as CSSProperties}
      components={{
        DayButton: ({ children, modifiers, day, ...props }) => {
          const weekend = day.date.getDay() === 0 || day.date.getDay() === 6

          return (
            <CalendarDayButton day={day} modifiers={modifiers} {...props}>
              {children}
              {!modifiers.outside && <span>{weekend ? "$120" : "$100"}</span>}
            </CalendarDayButton>
          )
        },
      }}
    />
  )
}
