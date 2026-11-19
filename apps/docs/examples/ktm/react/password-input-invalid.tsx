"use client"

import { Field, FieldError, FieldLabel } from "@/registry/react/field"
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputToggle,
} from "@/registry/react/password-input"

export default function PasswordInputInvalid() {
  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <Field data-invalid>
        <FieldLabel htmlFor="password-input-invalid">Password</FieldLabel>
        <PasswordInput id="password-input-invalid" invalid defaultValue="short">
          <PasswordInputControl aria-describedby="password-input-invalid-message" />
          <PasswordInputToggle />
        </PasswordInput>
        <FieldError id="password-input-invalid-message">
          Password must be at least 8 characters.
        </FieldError>
      </Field>
    </div>
  )
}
