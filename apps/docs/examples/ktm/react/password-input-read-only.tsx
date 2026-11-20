"use client"

import { Field, FieldDescription, FieldLabel } from "@/registry/react/field"
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputToggle,
} from "@/registry/react/password-input"

export default function PasswordInputReadOnly() {
  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <Field>
        <FieldLabel htmlFor="password-input-read-only">Recovery key</FieldLabel>
        <PasswordInput
          id="password-input-read-only"
          readOnly
          autoComplete="off"
          defaultValue="7Hq2-vX9p-Lm4c"
        >
          <PasswordInputControl />
          <PasswordInputToggle aria-label="Show recovery key" />
        </PasswordInput>
        <FieldDescription>
          Keep it somewhere safe. You can show it, but not change it.
        </FieldDescription>
      </Field>
    </div>
  )
}
