"use client"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/registry/react/field"
import { Input } from "@/registry/react/input"

export default function FieldErrorDemo() {
  return (
    <FieldGroup style={{ width: "100%", maxWidth: "20rem" }}>
      <Field data-invalid>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          defaultValue="max@"
          aria-invalid
          aria-describedby="email-error"
        />
        <FieldError id="email-error">Enter a valid email address.</FieldError>
      </Field>

      <Field data-invalid>
        <FieldLabel htmlFor="new-password">Password</FieldLabel>
        <Input
          id="new-password"
          type="password"
          defaultValue="abc"
          aria-invalid
        />
        <FieldDescription>Choose a strong password.</FieldDescription>
        <FieldError
          errors={[
            { message: "Must be at least 8 characters." },
            { message: "Must contain a number." },
          ]}
        />
      </Field>
    </FieldGroup>
  )
}
