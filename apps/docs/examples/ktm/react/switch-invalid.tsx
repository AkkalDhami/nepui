"use client"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/registry/react/field"
import { Switch } from "@/registry/react/switch"

export default function SwitchInvalid() {
  return (
    <Field
      orientation="horizontal"
      data-invalid
      style={{ width: "100%", maxWidth: "24rem" }}
    >
      <FieldContent>
        <FieldLabel htmlFor="sw-inv">Accept terms and conditions</FieldLabel>
        <FieldDescription>
          You must accept the terms and conditions to continue.
        </FieldDescription>
      </FieldContent>
      <Switch id="sw-inv" aria-invalid />
    </Field>
  )
}
