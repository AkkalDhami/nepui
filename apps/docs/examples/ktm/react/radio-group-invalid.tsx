"use client"

import { Field, FieldLabel } from "@/registry/react/field"
import { RadioGroup, RadioGroupItem } from "@/registry/react/radio-group"

export default function RadioGroupInvalid() {
  return (
    <RadioGroup aria-label="Notifications" style={{ width: "fit-content" }}>
      <Field orientation="horizontal" data-invalid>
        <RadioGroupItem value="email" id="inv-r1" aria-invalid />
        <FieldLabel htmlFor="inv-r1">Email</FieldLabel>
      </Field>

      <Field orientation="horizontal" data-invalid>
        <RadioGroupItem value="sms" id="inv-r2" aria-invalid />
        <FieldLabel htmlFor="inv-r2">SMS</FieldLabel>
      </Field>

      <Field orientation="horizontal" data-invalid>
        <RadioGroupItem value="push" id="inv-r3" aria-invalid />
        <FieldLabel htmlFor="inv-r3">Push notification</FieldLabel>
      </Field>
    </RadioGroup>
  )
}
