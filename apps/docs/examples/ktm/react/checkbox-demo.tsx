"use client"

import { Checkbox } from "@/registry/react/checkbox"
import { Label } from "@/registry/react/label"

export default function CheckboxDemo() {
  return (
    <div
      style={{
        display: "flex",
        gap: "1.25rem",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Checkbox id="default-checked-terms" defaultChecked />
        <Label htmlFor="default-checked-terms">
          Accept terms and conditions
        </Label>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Checkbox id="toggle-checkbox" name="toggle-checkbox" disabled />
        <Label htmlFor="toggle-checkbox">Enable notifications</Label>
      </div>
    </div>
  )
}
