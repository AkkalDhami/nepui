"use client"

import { DateRangePicker } from "@/registry/react/date-picker"
import { Label } from "@/registry/react/label"

export default function DatePickerRange() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Label htmlFor="date-range">Date Picker Range</Label>
      <DateRangePicker
        id="date-range"
        defaultValue={{ from: new Date(2026, 0, 20), to: new Date(2026, 1, 9) }}
        style={{ width: "18rem" }}
      />
    </div>
  )
}
