"use client"

import { Checkbox } from "@/registry/react/checkbox"
import { Label } from "@/registry/react/label"

export default function CheckboxDefaultChecked() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Checkbox id="newsletter" defaultChecked />
      <Label htmlFor="newsletter">Subscribe to the newsletter</Label>
    </div>
  )
}
