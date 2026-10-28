"use client"

import { Field, FieldLabel } from "@/registry/react/field"
import { Switch } from "@/registry/react/switch"

export default function SwitchDisabled() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Field
        orientation="horizontal"
        data-disabled
        style={{ width: "fit-content" }}
      >
        <Switch id="sw-dis-off" disabled />
        <FieldLabel htmlFor="sw-dis-off">Disabled</FieldLabel>
      </Field>

      <Field
        orientation="horizontal"
        data-disabled
        style={{ width: "fit-content" }}
      >
        <Switch id="sw-dis-on" disabled defaultChecked />
        <FieldLabel htmlFor="sw-dis-on">Disabled and on</FieldLabel>
      </Field>
    </div>
  )
}
