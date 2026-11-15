"use client"

import { useState } from "react"

import { Input } from "@/registry/react/input"
import { Label } from "@/registry/react/label"
import { Calendar } from "@/registry/react/calendar"

const field = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: "0.5rem",
} as const

export default function CalendarTime() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div
      style={{
        width: "fit-content",
        border: "1px solid var(--np-border)",
        borderRadius: "var(--np-radius-lg)",
      }}
    >
      <Calendar mode="single" selected={date} onSelect={setDate} />
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          padding: "0.75rem",
          borderTop: "1px solid var(--np-border)",
        }}
      >
        <div style={field}>
          <Label htmlFor="time-from">Start Time</Label>
          <Input id="time-from" type="time" step="1" defaultValue="10:30:00" />
        </div>
        <div style={field}>
          <Label htmlFor="time-to">End Time</Label>
          <Input id="time-to" type="time" step="1" defaultValue="12:30:00" />
        </div>
      </div>
    </div>
  )
}
