"use client"

import { Label } from "@/registry/react/label"
import { OTPField, OTPFieldInput } from "@/registry/react/otp-field"

export default function OTPFieldSize() {
  return (
    <div style={{ display: "grid", gap: "1.5rem", width: "fit-content" }}>
      <div style={{ display: "grid", gap: "0.5rem", width: "fit-content" }}>
        <Label htmlFor="otp-size-sm">Small</Label>
        <OTPField id="otp-size-sm" length={4} size="sm">
          <OTPFieldInput />
          <OTPFieldInput aria-label="Character 2 of 4" />
          <OTPFieldInput aria-label="Character 3 of 4" />
          <OTPFieldInput aria-label="Character 4 of 4" />
        </OTPField>
      </div>
      <div style={{ display: "grid", gap: "0.5rem", width: "fit-content" }}>
        <Label htmlFor="otp-size-default">Default</Label>
        <OTPField id="otp-size-default" length={4}>
          <OTPFieldInput />
          <OTPFieldInput aria-label="Character 2 of 4" />
          <OTPFieldInput aria-label="Character 3 of 4" />
          <OTPFieldInput aria-label="Character 4 of 4" />
        </OTPField>
      </div>
      <div style={{ display: "grid", gap: "0.5rem", width: "fit-content" }}>
        <Label htmlFor="otp-size-lg">Large</Label>
        <OTPField id="otp-size-lg" length={4} size="lg">
          <OTPFieldInput />
          <OTPFieldInput aria-label="Character 2 of 4" />
          <OTPFieldInput aria-label="Character 3 of 4" />
          <OTPFieldInput aria-label="Character 4 of 4" />
        </OTPField>
      </div>
    </div>
  )
}
