"use client"

import { DatePicker } from "@/registry/react/date-picker"
import { Label } from "@/registry/react/label"

export default function DatePickerDob() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Label htmlFor="dob">Date of birth</Label>
      <DatePicker
        id="dob"
        placeholder="Select date"
        formatOptions={{ dateStyle: "long" }}
        calendarProps={{
          captionLayout: "dropdown",
          startMonth: new Date(1926, 0),
          endMonth: new Date(2036, 11),
        }}
        style={{ width: "14rem" }}
      />
    </div>
  )
}
