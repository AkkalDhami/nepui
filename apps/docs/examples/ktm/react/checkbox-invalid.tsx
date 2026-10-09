"use client"

import { Checkbox } from "@/registry/react/checkbox"
import { Label } from "@/registry/react/label"

export default function CheckboxInvalid() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Checkbox id="invalid" aria-invalid />
      <Label htmlFor="invalid">You must accept to continue</Label>
    </div>
  )
}
