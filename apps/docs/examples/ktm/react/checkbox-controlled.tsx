"use client"

import * as React from "react"
import { Checkbox } from "@/registry/react/checkbox"
import { Label } from "@/registry/react/label"

export default function CheckboxControlled() {
  const [checked, setChecked] = React.useState(false)

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Checkbox id="ctrl" checked={checked} onCheckedChange={setChecked} />
      <Label htmlFor="ctrl">{checked ? "Checked" : "Unchecked"}</Label>
    </div>
  )
}
