"use client"

import { useState } from "react"

import { Checkbox } from "@/registry/react/checkbox"
import { CheckboxGroup } from "@/registry/react/checkbox-group"
import { Label } from "@/registry/react/label"

const frameworks = [
  { id: "next", name: "Next.js" },
  { id: "vite", name: "Vite" },
  { id: "astro", name: "Astro" },
]

export default function CheckboxGroupParent() {
  const [value, setValue] = useState<string[]>([])

  return (
    <CheckboxGroup
      allValues={frameworks.map((framework) => framework.id)}
      aria-labelledby="frameworks-caption"
      onValueChange={setValue}
      value={value}
    >
      <Label id="frameworks-caption">
        <Checkbox name="frameworks" parent />
        Frameworks
      </Label>
      {frameworks.map((framework) => (
        <Label className="np-checkbox-group-child" key={framework.id}>
          <Checkbox value={framework.id} />
          {framework.name}
        </Label>
      ))}
    </CheckboxGroup>
  )
}
