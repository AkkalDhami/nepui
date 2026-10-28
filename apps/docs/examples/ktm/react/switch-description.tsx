"use client"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/registry/react/field"
import { Switch } from "@/registry/react/switch"

export default function SwitchDescription() {
  return (
    <Field
      orientation="horizontal"
      style={{ width: "100%", maxWidth: "24rem" }}
    >
      <FieldContent>
        <FieldLabel htmlFor="sw-desc">Share across devices</FieldLabel>
        <FieldDescription>
          Focus is shared across devices, and turns off when you leave the app.
        </FieldDescription>
      </FieldContent>
      <Switch id="sw-desc" />
    </Field>
  )
}
