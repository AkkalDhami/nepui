"use client"

import { useState } from "react"

import { Calendar } from "@/registry/react/calendar"

export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 10, 4))

  return <Calendar mode="single" selected={date} onSelect={setDate} />
}
