"use client"

import { Checkbox } from "@/registry/react/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/registry/react/field"

export default function CheckboxInvalid() {
  return (
    <FieldGroup
      style={{
        marginInline: "auto",
        width: "15rem",
      }}
    >
      <Field orientation="horizontal" data-invalid>
        <Checkbox
          id="terms-checkbox-invalid"
          name="terms-checkbox-invalid"
          aria-invalid
        />
        <FieldLabel htmlFor="terms-checkbox-invalid">
          Accept terms and conditions
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}
