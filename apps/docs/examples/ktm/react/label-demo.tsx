"use client"

import { Checkbox } from "@/registry/react/checkbox"
import { Label } from "@/registry/react/label"

export default function LabelDemo() {
  return (
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
  )
}
