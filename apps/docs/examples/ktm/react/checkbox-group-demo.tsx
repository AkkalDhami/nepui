"use client"

import { Checkbox } from "@/registry/react/checkbox"
import { CheckboxGroup } from "@/registry/react/checkbox-group"
import { Label } from "@/registry/react/label"

export default function CheckboxGroupDemo() {
  return (
    <CheckboxGroup aria-label="Select frameworks" defaultValue={["next"]}>
      <Label>
        <Checkbox value="next" />
        Next.js
      </Label>
      <Label>
        <Checkbox value="vite" />
        Vite
      </Label>
      <Label>
        <Checkbox value="astro" />
        Astro
      </Label>
    </CheckboxGroup>
  )
}
