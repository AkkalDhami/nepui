"use client"

import { Checkbox } from "@/registry/react/checkbox"
import { Label } from "@/registry/react/label"

export default function CheckboxDisabled() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Checkbox id="d1" disabled />
        <Label htmlFor="d1">Disabled</Label>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Checkbox id="d2" disabled defaultChecked />
        <Label htmlFor="d2">Disabled checked</Label>
      </div>
    </div>
  )
}
