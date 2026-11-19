"use client"

import { Field, FieldDescription, FieldLabel } from "@/registry/react/field"
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputToggle,
} from "@/registry/react/password-input"

export default function PasswordInputDemo() {
  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <Field>
        <FieldLabel htmlFor="password-input-demo">Password</FieldLabel>
        <PasswordInput id="password-input-demo">
          <PasswordInputControl />
          <PasswordInputToggle />
        </PasswordInput>
        <FieldDescription>Use at least 8 characters.</FieldDescription>
      </Field>
    </div>
  )
}
