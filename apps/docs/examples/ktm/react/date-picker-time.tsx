"use client"

import { DatePicker } from "@/registry/react/date-picker"
import { Input } from "@/registry/react/input"
import { Label } from "@/registry/react/label"

export default function DatePickerTime() {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <Label htmlFor="date-picker">Date</Label>
        <DatePicker
          id="date-picker"
          placeholder="Select date"
          style={{ width: "14rem" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <Label htmlFor="time-picker">Time</Label>
        <Input
          id="time-picker"
          type="time"
          step="1"
          defaultValue="10:30:00"
          style={{ width: "14rem" }}
        />
      </div>
    </div>
  )
}
