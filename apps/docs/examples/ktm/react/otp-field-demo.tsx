"use client"

import { Field, FieldDescription, FieldLabel } from "@/registry/react/field"
import { OTPField, OTPFieldInput } from "@/registry/react/otp-field"

export default function OTPFieldDemo() {
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
      }}
    >
      <Field>
        <FieldLabel htmlFor="otp-demo">Verification code</FieldLabel>
        <OTPField id="otp-demo" length={6}>
          <OTPFieldInput />
          <OTPFieldInput aria-label="Character 2 of 6" />
          <OTPFieldInput aria-label="Character 3 of 6" />
          <OTPFieldInput aria-label="Character 4 of 6" />
          <OTPFieldInput aria-label="Character 5 of 6" />
          <OTPFieldInput aria-label="Character 6 of 6" />
        </OTPField>
        <FieldDescription>
          Enter the 6-digit code we sent to your device.
        </FieldDescription>
      </Field>
    </div>
  )
}
