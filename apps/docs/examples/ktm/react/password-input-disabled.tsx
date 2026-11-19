"use client"

import { Field, FieldDescription, FieldLabel } from "@/registry/react/field"
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputToggle,
} from "@/registry/react/password-input"

export default function PasswordInputDisabled() {
  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <Field>
        <FieldLabel htmlFor="password-input-disabled">Password</FieldLabel>
        <PasswordInput
          id="password-input-disabled"
          disabled
          defaultValue="hunter22"
        >
          <PasswordInputControl />
          <PasswordInputToggle />
        </PasswordInput>
        <FieldDescription>
          Your administrator manages this password.
        </FieldDescription>
      </Field>
    </div>
  )
}
