"use client"

import { useState } from "react"

import { Field, FieldLabel } from "@/registry/react/field"
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputRequirement,
  PasswordInputRequirements,
  PasswordInputToggle,
} from "@/registry/react/password-input"

export default function PasswordInputRequirementsDemo() {
  const [password, setPassword] = useState("")

  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <Field>
        <FieldLabel htmlFor="password-input-requirements">
          Create a password
        </FieldLabel>
        <PasswordInput
          id="password-input-requirements"
          autoComplete="new-password"
          value={password}
          onValueChange={(value) => setPassword(value)}
        >
          <PasswordInputControl />
          <PasswordInputToggle />
        </PasswordInput>
        <PasswordInputRequirements>
          <PasswordInputRequirement met={password.length >= 8}>
            At least 8 characters
          </PasswordInputRequirement>
          <PasswordInputRequirement met={/\d/.test(password)}>
            A number
          </PasswordInputRequirement>
          <PasswordInputRequirement
            met={/[a-z]/.test(password) && /[A-Z]/.test(password)}
          >
            An uppercase and a lowercase letter
          </PasswordInputRequirement>
        </PasswordInputRequirements>
      </Field>
    </div>
  )
}
