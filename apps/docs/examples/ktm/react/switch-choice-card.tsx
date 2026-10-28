"use client"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/registry/react/field"
import { Switch } from "@/registry/react/switch"

export default function SwitchChoiceCard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <FieldLabel htmlFor="sw-card-share">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Share across devices</FieldTitle>
            <FieldDescription>
              Focus is shared across devices, and turns off when you leave the
              app.
            </FieldDescription>
          </FieldContent>
          <Switch id="sw-card-share" />
        </Field>
      </FieldLabel>

      <FieldLabel htmlFor="sw-card-notify">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              Receive notifications when focus mode is enabled or disabled.
            </FieldDescription>
          </FieldContent>
          <Switch id="sw-card-notify" defaultChecked />
        </Field>
      </FieldLabel>
    </div>
  )
}
