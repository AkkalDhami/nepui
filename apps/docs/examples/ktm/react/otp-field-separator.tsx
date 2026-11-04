"use client"

import { Field, FieldLabel } from "@/registry/react/field"
import {
  OTPField,
  OTPFieldInput,
  OTPFieldSeparator,
} from "@/registry/react/otp-field"

export default function OTPFieldSeparatorDemo() {
  return (
    <Field
      style={{
        display: "grid",
        placeContent: "center",
      }}
    >
      <FieldLabel htmlFor="otp-separator">Verification code</FieldLabel>
      <OTPField id="otp-separator" length={6}>
        <OTPFieldInput />
        <OTPFieldInput aria-label="Character 2 of 6" />
        <OTPFieldInput aria-label="Character 3 of 6" />
        <OTPFieldSeparator />
        <OTPFieldInput aria-label="Character 4 of 6" />
        <OTPFieldInput aria-label="Character 5 of 6" />
        <OTPFieldInput aria-label="Character 6 of 6" />
      </OTPField>
    </Field>
  )
}
