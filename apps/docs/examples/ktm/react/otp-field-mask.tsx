"use client"

import { Field, FieldDescription, FieldLabel } from "@/registry/react/field"
import { OTPField, OTPFieldInput } from "@/registry/react/otp-field"

export default function OTPFieldMask() {
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
      }}
    >
      <Field>
        <FieldLabel htmlFor="otp-mask">Access code</FieldLabel>
        <OTPField id="otp-mask" length={6} mask>
          <OTPFieldInput />
          <OTPFieldInput aria-label="Character 2 of 6" />
          <OTPFieldInput aria-label="Character 3 of 6" />
          <OTPFieldInput aria-label="Character 4 of 6" />
          <OTPFieldInput aria-label="Character 5 of 6" />
          <OTPFieldInput aria-label="Character 6 of 6" />
        </OTPField>
        <FieldDescription>
          Use <code>mask</code> to obscure the code on shared screens.
        </FieldDescription>
      </Field>
    </div>
  )
}
