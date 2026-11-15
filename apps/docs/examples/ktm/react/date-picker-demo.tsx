"use client"

import { DatePicker } from "@/registry/react/date-picker"
import { Label } from "@/registry/react/label"

export default function DatePickerDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Label htmlFor="date">Date</Label>
      <DatePicker id="date" style={{ width: "14rem" }} />
    </div>
  )
}
