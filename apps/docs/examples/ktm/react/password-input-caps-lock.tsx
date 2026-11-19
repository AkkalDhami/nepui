"use client"

import { Field, FieldDescription, FieldLabel } from "@/registry/react/field"
import {
  PasswordInput,
  PasswordInputCapsLock,
  PasswordInputControl,
  PasswordInputToggle,
} from "@/registry/react/password-input"

export default function PasswordInputCapsLockDemo() {
  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <Field>
        <FieldLabel htmlFor="password-input-caps-lock">Password</FieldLabel>
        <PasswordInput id="password-input-caps-lock">
          <PasswordInputControl />
          <PasswordInputCapsLock>Caps Lock</PasswordInputCapsLock>
          <PasswordInputToggle />
        </PasswordInput>
        <FieldDescription>
          Focus the field and press Caps Lock to see the warning.
        </FieldDescription>
      </Field>
    </div>
  )
}
