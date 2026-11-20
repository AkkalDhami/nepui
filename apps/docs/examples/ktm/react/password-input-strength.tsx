"use client"

import { useState } from "react"

import { Field, FieldDescription, FieldLabel } from "@/registry/react/field"
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputStrength,
  PasswordInputToggle,
} from "@/registry/react/password-input"

const labels = ["Enter a password", "Weak", "Fair", "Good", "Strong"]

function getScore(password: string) {
  if (!password) return 0
  const passed = [
    password.length >= 8,
    /\d/.test(password),
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length
  return Math.max(1, passed)
}

export default function PasswordInputStrengthDemo() {
  const [password, setPassword] = useState("")
  const score = getScore(password)

  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <Field>
        <FieldLabel htmlFor="password-input-strength">Password</FieldLabel>
        <PasswordInput
          id="password-input-strength"
          autoComplete="new-password"
          value={password}
          onValueChange={(value) => setPassword(value)}
        >
          <PasswordInputControl />
          <PasswordInputToggle />
        </PasswordInput>
        <PasswordInputStrength score={score} label={labels[score]} />
        <FieldDescription>
          Add numbers, mixed case and symbols to make it stronger.
        </FieldDescription>
      </Field>
    </div>
  )
}
