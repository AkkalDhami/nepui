"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react"

import { Field, FieldDescription, FieldLabel } from "@/registry/react/field"
import {
  PasswordInput,
  PasswordInputAction,
  PasswordInputControl,
  PasswordInputToggle,
} from "@/registry/react/password-input"

export default function PasswordInputDefaultVisible() {
  const [password, setPassword] = useState("maple-orbit-42")
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <Field>
        <FieldLabel htmlFor="password-input-default-visible">
          Wi-Fi password
        </FieldLabel>
        <PasswordInput
          id="password-input-default-visible"
          defaultVisible
          autoComplete="new-password"
          value={password}
          onValueChange={(value) => setPassword(value)}
        >
          <PasswordInputControl />
          <PasswordInputAction
            aria-label={copied ? "Copied" : "Copy password"}
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
        <FieldDescription>
          Guests read it from here, so it starts shown.
        </FieldDescription>
      </Field>
    </div>
  )
}
