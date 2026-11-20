"use client"

import { useState } from "react"

import { Button } from "@/registry/react/button"
import { Field, FieldDescription, FieldLabel } from "@/registry/react/field"
import {
  createPasswordInputController,
  PasswordInput,
  PasswordInputControl,
  PasswordInputToggle,
} from "@/registry/react/password-input"

export default function PasswordInputController() {
  const [controller] = useState(createPasswordInputController)
  const [message, setMessage] = useState(
    "Use the buttons to control the field."
  )

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
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            controller.setValue("plum-kettle-orbit-42")
            controller.setVisible(true)
          }}
        >
          Suggest
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => controller.toggleVisible()}
        >
          Toggle
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => controller.clear()}
        >
          Clear
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            setMessage(
              `${controller.getValue().length} characters, ${controller.isVisible() ? "shown" : "hidden"}`
            )
          }
        >
          Read
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => controller.focus()}
        >
          Focus
        </Button>
      </div>
      <Field>
        <FieldLabel htmlFor="password-input-controller">
          New password
        </FieldLabel>
        <PasswordInput
          id="password-input-controller"
          controller={controller}
          autoComplete="new-password"
        >
          <PasswordInputControl />
          <PasswordInputToggle />
        </PasswordInput>
        <FieldDescription>{message}</FieldDescription>
      </Field>
    </div>
  )
}
