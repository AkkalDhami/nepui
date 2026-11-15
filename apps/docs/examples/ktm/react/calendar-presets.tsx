"use client"

import { useState } from "react"

import { Button } from "@/registry/react/button"
import { Calendar } from "@/registry/react/calendar"

const base = new Date()

function inDays(days: number) {
  return new Date(base.getFullYear(), base.getMonth(), base.getDate() + days)
}

export default function CalendarPresets() {
  const [date, setDate] = useState<Date | undefined>(base)
  const [month, setMonth] = useState<Date>(base)

  function pick(days: number) {
    const next = inDays(days)
    setDate(next)
    setMonth(next)
  }

  return (
    <div
      style={{
        width: "fit-content",
        border: "1px solid var(--np-border)",
        borderRadius: "var(--np-radius-lg)",
      }}
    >
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        month={month}
        onMonthChange={setMonth}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          padding: "0.75rem",
          borderTop: "1px solid var(--np-border)",
        }}
      >
        <Button variant="outline" size="sm" onClick={() => pick(0)}>
          Today
        </Button>
        <Button variant="outline" size="sm" onClick={() => pick(1)}>
          Tomorrow
        </Button>
        <Button variant="outline" size="sm" onClick={() => pick(3)}>
          In 3 days
        </Button>
        <Button variant="outline" size="sm" onClick={() => pick(7)}>
          In a week
        </Button>
        <Button variant="outline" size="sm" onClick={() => pick(14)}>
          In 2 weeks
        </Button>
      </div>
    </div>
  )
}
