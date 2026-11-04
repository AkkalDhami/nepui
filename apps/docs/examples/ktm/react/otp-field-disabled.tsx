"use client"

import { Field, FieldLabel } from "@/registry/react/field"
import { OTPField, OTPFieldInput } from "@/registry/react/otp-field"

export default function OTPFieldDisabled() {
  return (
    <Field style={{ display: "grid", placeContent: "center" }}>
      <FieldLabel htmlFor="otp-disabled">Verification code</FieldLabel>
      <OTPField id="otp-disabled" length={6} defaultValue="123456" disabled>
        <OTPFieldInput />
        <OTPFieldInput aria-label="Character 2 of 6" />
        <OTPFieldInput aria-label="Character 3 of 6" />
        <OTPFieldInput aria-label="Character 4 of 6" />
        <OTPFieldInput aria-label="Character 5 of 6" />
        <OTPFieldInput aria-label="Character 6 of 6" />
      </OTPField>
    </Field>
  )
}
