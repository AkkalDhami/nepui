"use client"

import { Checkbox } from "@/registry/react/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/registry/react/field"

export default function CheckboxDisabled() {
  return (
    <FieldGroup
      style={{
        marginInline: "auto",
        width: "15rem",
      }}
    >
      <Field orientation="horizontal" data-disabled>
        <Checkbox
          id="toggle-checkbox-disabled"
          name="toggle-checkbox-disabled"
          disabled
        />
        <FieldLabel htmlFor="toggle-checkbox-disabled">
          Enable notifications
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}
