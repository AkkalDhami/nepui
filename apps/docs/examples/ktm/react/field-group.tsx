"use client"

import { Checkbox } from "@/registry/react/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/registry/react/field"

export default function FieldGroupDemo() {
  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">Responses</FieldLegend>
          <FieldDescription>
            Get notified when ChatGPT responds to requests that take time, like
            research or image generation.
          </FieldDescription>
          <FieldGroup style={{ gap: "0.75rem" }}>
            <Field orientation="horizontal">
              <Checkbox id="push-responses" defaultChecked disabled />
              <FieldLabel htmlFor="push-responses" style={{ fontWeight: 400 }}>
                Push notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend variant="label">Tasks</FieldLegend>
          <FieldDescription>
            Get notified when tasks you&apos;ve created have updates.{" "}
            <a href="#">Manage tasks</a>
          </FieldDescription>
          <FieldGroup style={{ gap: "0.75rem" }}>
            <Field orientation="horizontal">
              <Checkbox id="push-tasks" />
              <FieldLabel htmlFor="push-tasks" style={{ fontWeight: 400 }}>
                Push notifications
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="email-tasks" />
              <FieldLabel htmlFor="email-tasks" style={{ fontWeight: 400 }}>
                Email notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  )
}
