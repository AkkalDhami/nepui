"use client"

import { Label } from "@/registry/react/label"
import { RadioGroup, RadioGroupItem } from "@/registry/react/radio-group"

export default function RadioGroupHorizontal() {
  return (
    <RadioGroup
      orientation="horizontal"
      defaultValue="md"
      aria-label="Size"
      style={{ width: "fit-content" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <RadioGroupItem value="sm" id="h-r1" />
        <Label htmlFor="h-r1">Small</Label>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <RadioGroupItem value="md" id="h-r2" />
        <Label htmlFor="h-r2">Medium</Label>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <RadioGroupItem value="lg" id="h-r3" />
        <Label htmlFor="h-r3">Large</Label>
      </div>
    </RadioGroup>
  )
}
