"use client"

import { useState } from "react"

import { Field, FieldDescription, FieldLabel } from "@/registry/react/field"
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputToggle,
} from "@/registry/react/password-input"

export default function PasswordInputControlled() {
  const [visible, setVisible] = useState(false)
  const [lastChange, setLastChange] = useState("none yet")

  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <Field>
        <FieldLabel htmlFor="password-input-controlled">Password</FieldLabel>
        <PasswordInput
          id="password-input-controlled"
          visible={visible}
          onVisibleChange={(next, details) => {
            setVisible(next)
            setLastChange(`${next ? "shown" : "hidden"} (${details.reason})`)
          }}
        >
          <PasswordInputControl />
          <PasswordInputToggle />
        </PasswordInput>
        <FieldDescription>Last change: {lastChange}</FieldDescription>
      </Field>
    </div>
  )
}
