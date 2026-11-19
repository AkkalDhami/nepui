"use client"

import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputToggle,
} from "@/registry/react/password-input"

export default function PasswordInputSizes() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <PasswordInput size="xs" defaultValue="password">
        <PasswordInputControl aria-label="Password (extra small)" />
        <PasswordInputToggle />
      </PasswordInput>
      <PasswordInput size="sm" defaultValue="password">
        <PasswordInputControl aria-label="Password (small)" />
        <PasswordInputToggle />
      </PasswordInput>
      <PasswordInput defaultValue="password">
        <PasswordInputControl aria-label="Password (default)" />
        <PasswordInputToggle />
      </PasswordInput>
      <PasswordInput size="lg" defaultValue="password">
        <PasswordInputControl aria-label="Password (large)" />
        <PasswordInputToggle />
      </PasswordInput>
    </div>
  )
}
