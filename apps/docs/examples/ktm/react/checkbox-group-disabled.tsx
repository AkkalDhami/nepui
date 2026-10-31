"use client"

import { Checkbox } from "@/registry/react/checkbox"
import { CheckboxGroup } from "@/registry/react/checkbox-group"
import { Field, FieldContent, FieldLabel } from "@/registry/react/field"

export default function CheckboxGroupDisabled() {
  return (
    <CheckboxGroup aria-label="Select frameworks" defaultValue={["astro"]}>
      <Field orientation="horizontal">
        <Checkbox value="next" id="next" />
        <FieldContent>
          <FieldLabel htmlFor="next">Next.js</FieldLabel>
        </FieldContent>
      </Field>

      <Field orientation="horizontal">
        <Checkbox value="vite" id="vite" disabled />
        <FieldContent>
          <FieldLabel htmlFor="vite">Vite</FieldLabel>
        </FieldContent>
      </Field>

      <Field orientation="horizontal">
        <Checkbox value="astro" id="astro" disabled />
        <FieldContent>
          <FieldLabel htmlFor="astro">Astro</FieldLabel>
        </FieldContent>
      </Field>
    </CheckboxGroup>
  )
}
