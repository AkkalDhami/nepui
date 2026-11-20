"use client"

import { useState } from "react"
import { LockIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/react/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/registry/react/field"
import { Input } from "@/registry/react/input"
import {
  PasswordInput,
  PasswordInputAddon,
  PasswordInputCapsLock,
  PasswordInputControl,
  PasswordInputRequirement,
  PasswordInputRequirements,
  PasswordInputStrength,
  PasswordInputToggle,
} from "@/registry/react/password-input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/card"

const labels = ["Enter a password", "Weak", "Fair", "Good", "Strong"]

export function SignupCard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [created, setCreated] = useState("")

  const hasLength = password.length >= 8
  const hasNumber = /\d/.test(password)
  const hasCase = /[a-z]/.test(password) && /[A-Z]/.test(password)
  const passed = [
    hasLength,
    hasNumber,
    hasCase,
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length
  const score = password ? Math.max(1, passed) : 0
  const mismatch = confirm.length > 0 && confirm !== password
  const valid = hasLength && hasNumber && hasCase && confirm === password

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Sign up for an account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          style={{ width: "100%", maxWidth: "24rem" }}
          onSubmit={(event) => {
            event.preventDefault()
            if (valid) setCreated(email)
          }}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password-input-signup-email">
                Email
              </FieldLabel>
              <Input
                id="password-input-signup-email"
                type="email"
                required
                autoComplete="username"
                placeholder="you@example.com"
                value={email}
                onValueChange={(value) => setEmail(value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password-input-signup-password">
                Password
              </FieldLabel>
              <PasswordInput
                id="password-input-signup-password"
                name="password"
                autoComplete="new-password"
                required
                value={password}
                onValueChange={(value) => setPassword(value)}
              >
                <PasswordInputAddon>
                  <LockIcon aria-hidden="true" />
                </PasswordInputAddon>
                <PasswordInputControl />
                <PasswordInputCapsLock>Caps Lock</PasswordInputCapsLock>
                <PasswordInputToggle />
              </PasswordInput>
              <PasswordInputStrength score={score} label={labels[score]} />
              <PasswordInputRequirements>
                <PasswordInputRequirement met={hasLength}>
                  At least 8 characters
                </PasswordInputRequirement>
                <PasswordInputRequirement met={hasNumber}>
                  A number
                </PasswordInputRequirement>
                <PasswordInputRequirement met={hasCase}>
                  An uppercase and a lowercase letter
                </PasswordInputRequirement>
              </PasswordInputRequirements>
            </Field>

            <Field data-invalid={mismatch ? true : undefined}>
              <FieldLabel htmlFor="password-input-signup-confirm">
                Confirm password
              </FieldLabel>
              <PasswordInput
                id="password-input-signup-confirm"
                autoComplete="new-password"
                required
                invalid={mismatch}
                value={confirm}
                onValueChange={(value) => setConfirm(value)}
              >
                <PasswordInputControl aria-describedby="password-input-signup-confirm-message" />
                <PasswordInputToggle aria-label="Show confirmation password" />
              </PasswordInput>
              {mismatch ? (
                <FieldError id="password-input-signup-confirm-message">
                  Passwords do not match.
                </FieldError>
              ) : (
                <FieldDescription id="password-input-signup-confirm-message">
                  Type the password again.
                </FieldDescription>
              )}
            </Field>

            <Button type="submit" disabled={!valid}>
              Create account
            </Button>
            {created ? (
              <FieldDescription role="status">
                Account created for {created}.
              </FieldDescription>
            ) : null}
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
