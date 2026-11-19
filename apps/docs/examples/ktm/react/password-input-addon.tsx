"use client"

import { KeyIcon } from "@phosphor-icons/react"

import { Field, FieldLabel } from "@/registry/react/field"
import {
  PasswordInput,
  PasswordInputAddon,
  PasswordInputControl,
  PasswordInputToggle,
} from "@/registry/react/password-input"

export default function PasswordInputAddonDemo() {
  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <Field>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FieldLabel htmlFor="password-input-addon">Password</FieldLabel>
          <a
            href="#forgot-password"
            style={{
              fontSize: "0.875rem",
              color: "var(--np-muted-foreground)",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            Forgot password?
          </a>
        </div>
        <PasswordInput id="password-input-addon">
          <PasswordInputAddon>
            <KeyIcon aria-hidden="true" />
          </PasswordInputAddon>
          <PasswordInputControl placeholder="Enter your password" />
          <PasswordInputToggle />
        </PasswordInput>
      </Field>
    </div>
  )
}
