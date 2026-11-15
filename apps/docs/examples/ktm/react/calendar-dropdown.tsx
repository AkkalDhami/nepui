"use client"

import { useState } from "react"

import { Calendar } from "@/registry/react/calendar"

export default function CalendarDropdown() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      captionLayout="dropdown"
      startMonth={new Date(1926, 0)}
      endMonth={new Date(2036, 11)}
      bordered
    />
  )
}
