"use client"

import { Field, FieldDescription, FieldLabel } from "@/registry/react/field"
import { OTPField, OTPFieldInput } from "@/registry/react/otp-field"

export default function OTPFieldAlphanumeric() {
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
      }}
    >
      <Field>
        <FieldLabel htmlFor="otp-alphanumeric">Recovery code</FieldLabel>
        <OTPField
          id="otp-alphanumeric"
          length={6}
          validationType="alphanumeric"
        >
          <OTPFieldInput />
          <OTPFieldInput aria-label="Character 2 of 6" />
          <OTPFieldInput aria-label="Character 3 of 6" />
          <OTPFieldInput aria-label="Character 4 of 6" />
          <OTPFieldInput aria-label="Character 5 of 6" />
          <OTPFieldInput aria-label="Character 6 of 6" />
        </OTPField>
        <FieldDescription>
          Accept letters and numbers for backup codes such as{" "}
          <code>A7C9XZ</code>.
        </FieldDescription>
      </Field>
    </div>
  )
}
