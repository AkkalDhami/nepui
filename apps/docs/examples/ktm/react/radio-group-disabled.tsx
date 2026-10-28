"use client"

import { Field, FieldLabel } from "@/registry/react/field"
import { RadioGroup, RadioGroupItem } from "@/registry/react/radio-group"

export default function RadioGroupDisabled() {
  return (
    <RadioGroup
      defaultValue="free"
      aria-label="Plan"
      style={{ width: "fit-content" }}
    >
      <Field orientation="horizontal">
        <RadioGroupItem value="free" id="dis-r1" />
        <FieldLabel htmlFor="dis-r1">Free</FieldLabel>
      </Field>

      <Field orientation="horizontal" data-disabled>
        <RadioGroupItem value="pro" id="dis-r2" disabled />
        <FieldLabel htmlFor="dis-r2">Pro</FieldLabel>
      </Field>

      <Field orientation="horizontal" data-disabled>
        <RadioGroupItem value="enterprise" id="dis-r3" disabled />
        <FieldLabel htmlFor="dis-r3">Enterprise</FieldLabel>
      </Field>
    </RadioGroup>
  )
}
