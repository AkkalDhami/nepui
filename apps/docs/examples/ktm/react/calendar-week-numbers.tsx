"use client"

import { useState } from "react"

import { Calendar } from "@/registry/react/calendar"

export default function CalendarWeekNumbers() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      defaultMonth={date}
      selected={date}
      onSelect={setDate}
      showWeekNumber
    />
  )
}
