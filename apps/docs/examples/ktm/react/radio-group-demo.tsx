"use client"

import { Label } from "@/registry/react/label"
import { RadioGroup, RadioGroupItem } from "@/registry/react/radio-group"

export default function RadioGroupDemo() {
  return (
    <RadioGroup
      defaultValue="comfortable"
      aria-label="Density"
      style={{ width: "fit-content" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <RadioGroupItem value="default" id="demo-r1" />
        <Label htmlFor="demo-r1">Default</Label>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <RadioGroupItem value="comfortable" id="demo-r2" />
        <Label htmlFor="demo-r2">Comfortable</Label>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <RadioGroupItem value="compact" id="demo-r3" />
        <Label htmlFor="demo-r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}
