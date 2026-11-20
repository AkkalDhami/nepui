"use client"

import { useState } from "react"

import { Calendar } from "@/registry/react/calendar"

const booked = {
  from: new Date(2026, 0, 12),
  to: new Date(2026, 0, 26),
}

export default function CalendarBooked() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 0, 8))

  return (
    <Calendar
      mode="single"
      defaultMonth={date}
      selected={date}
      onSelect={setDate}
      disabled={booked}
      modifiers={{ booked }}
      modifiersClassNames={{ booked: "np-calendar-booked" }}
    />
  )
}
