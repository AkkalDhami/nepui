"use client"

import { Field, FieldError, FieldLabel } from "@/registry/react/field"
import { OTPField, OTPFieldInput } from "@/registry/react/otp-field"

export default function OTPFieldInvalid() {
  return (
    <Field
      style={{
        display: "grid",
        placeContent: "center",
      }}
      data-invalid
    >
      <FieldLabel htmlFor="otp-invalid">Verification code</FieldLabel>
      <OTPField id="otp-invalid" length={6} defaultValue="654321">
        <OTPFieldInput aria-invalid />
        <OTPFieldInput aria-label="Character 2 of 6" aria-invalid />
        <OTPFieldInput aria-label="Character 3 of 6" aria-invalid />
        <OTPFieldInput aria-label="Character 4 of 6" aria-invalid />
        <OTPFieldInput aria-label="Character 5 of 6" aria-invalid />
        <OTPFieldInput aria-label="Character 6 of 6" aria-invalid />
      </OTPField>
      <FieldError>Please enter a valid code.</FieldError>
    </Field>
  )
}
