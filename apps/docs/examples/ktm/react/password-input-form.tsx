"use client"

import { useState } from "react"

import { Button } from "@/registry/react/button"
import { Field, FieldDescription, FieldLabel } from "@/registry/react/field"
import { Input } from "@/registry/react/input"
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputToggle,
} from "@/registry/react/password-input"

export default function PasswordInputForm() {
  const [message, setMessage] = useState("Nothing submitted yet.")

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
      <form
        id="password-input-form"
        onSubmit={(event) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          const length = String(data.get("password") ?? "").length
          setMessage(
            `Signed in as ${data.get("email")}, with a password of ${length} characters.`
          )
        }}
        onReset={() => setMessage("Form reset.")}
      >
        <Field>
          <FieldLabel htmlFor="password-input-form-email">Email</FieldLabel>
          <Input
            id="password-input-form-email"
            name="email"
            type="email"
            required
            autoComplete="username"
          />
        </Field>
      </form>
      <Field>
        <FieldLabel htmlFor="password-input-form-password">Password</FieldLabel>
        <PasswordInput
          id="password-input-form-password"
          name="password"
          form="password-input-form"
          required
        >
          <PasswordInputControl />
          <PasswordInputToggle />
        </PasswordInput>
        <FieldDescription>{message}</FieldDescription>
      </Field>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button type="submit" form="password-input-form">
          Sign in
        </Button>
        <Button type="reset" form="password-input-form" variant="outline">
          Reset
        </Button>
      </div>
    </div>
  )
}
