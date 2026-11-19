"use client"

import { useState } from "react"
import { ArrowsClockwiseIcon, CheckIcon, CopyIcon } from "@phosphor-icons/react"

import { Field, FieldDescription, FieldLabel } from "@/registry/react/field"
import {
  PasswordInput,
  PasswordInputAction,
  PasswordInputControl,
  PasswordInputStrength,
  PasswordInputToggle,
} from "@/registry/react/password-input"

const characters =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%"
const labels = ["Enter a password", "Weak", "Fair", "Good", "Strong"]

function generatePassword(length = 16) {
  const bytes = crypto.getRandomValues(new Uint32Array(length))
  let password = ""
  for (const byte of bytes) {
    password += characters[byte % characters.length]
  }
  return password
}

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

export default function PasswordInputActions() {
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)
  const score = getScore(password)

  async function copy() {
    await navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <Field>
        <FieldLabel htmlFor="password-input-actions">New password</FieldLabel>
        <PasswordInput
          id="password-input-actions"
          autoComplete="new-password"
          value={password}
          onValueChange={(value) => setPassword(value)}
        >
          <PasswordInputControl />
          <PasswordInputAction
            aria-label="Generate password"
            onClick={() => setPassword(generatePassword())}
          >
            <ArrowsClockwiseIcon aria-hidden="true" />
          </PasswordInputAction>
          <PasswordInputAction
            aria-label={copied ? "Copied" : "Copy password"}
            disabled={!password}
            onClick={copy}
          >
            {copied ? (
              <CheckIcon aria-hidden="true" />
            ) : (
              <CopyIcon aria-hidden="true" />
            )}
          </PasswordInputAction>
          <PasswordInputToggle />
        </PasswordInput>
        <PasswordInputStrength score={score} label={labels[score]} />
        <FieldDescription>
          Generate a random password, then copy it.
        </FieldDescription>
      </Field>
    </div>
  )
}
