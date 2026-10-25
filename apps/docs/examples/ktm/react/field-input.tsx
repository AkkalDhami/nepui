"use client"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/registry/react/field"
import { Input } from "@/registry/react/input"

export default function FieldInput() {
  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">
              Username{" "}
              <span
                style={{
                  color: "var(--np-destructive)",
                }}
              >
                *
              </span>
            </FieldLabel>
            <Input id="username" type="text" placeholder="lakka" />
            <FieldDescription>
              Choose a unique username for your account.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">
              Password{" "}
              <span
                style={{
                  color: "var(--np-destructive)",
                }}
              >
                *
              </span>
            </FieldLabel>
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
            <Input id="password" type="password" placeholder="••••••••" />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
