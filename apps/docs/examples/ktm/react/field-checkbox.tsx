"use client"

import { Checkbox } from "@/registry/react/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/registry/react/field"

export default function FieldCheckbox() {
  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">
            Show these items on the desktop
          </FieldLegend>
          <FieldDescription>
            Select the items you want to show on the desktop.
          </FieldDescription>
          <FieldGroup style={{ gap: "0.75rem" }}>
            <Field orientation="horizontal">
              <Checkbox id="hard-disks" defaultChecked />
              <FieldLabel htmlFor="hard-disks" style={{ fontWeight: 400 }}>
                Hard disks
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="external-disks" />
              <FieldLabel htmlFor="external-disks" style={{ fontWeight: 400 }}>
                External disks
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="cds-dvds" />
              <FieldLabel htmlFor="cds-dvds" style={{ fontWeight: 400 }}>
                CDs, DVDs, and iPods
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="connected-servers" />
              <FieldLabel
                htmlFor="connected-servers"
                style={{ fontWeight: 400 }}
              >
                Connected servers
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <Field orientation="horizontal">
          <Checkbox id="sync-folders" defaultChecked />
          <FieldContent>
            <FieldLabel htmlFor="sync-folders">
              Sync Desktop &amp; Documents folders
            </FieldLabel>
            <FieldDescription>
              Your Desktop &amp; Documents folders are being synced with iCloud
              Drive. You can access them from other devices.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </div>
  )
}
