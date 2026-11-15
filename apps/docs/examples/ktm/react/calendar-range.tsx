"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"

import { Calendar } from "@/registry/react/calendar"

export default function CalendarRange() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 0, 12),
    to: new Date(2026, 0, 24),
  })

  return (
    <Calendar
      mode="range"
      defaultMonth={range?.from}
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
    />
  )
}
