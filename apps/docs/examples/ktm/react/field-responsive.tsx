"use client"

import { Button } from "@/registry/react/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/registry/react/field"
import { Input } from "@/registry/react/input"

export default function FieldResponsive() {
  return (
    <div style={{ width: "100%", maxWidth: "40rem" }}>
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Profile</FieldLegend>
            <FieldDescription>
              Fill in your profile information.
            </FieldDescription>
            <FieldGroup>
              <Field orientation="responsive">
                <FieldContent>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <FieldDescription>
                    Provide your full name for identification
                  </FieldDescription>
                </FieldContent>
                <Input id="name" placeholder="Lakka Imahd" required />
              </Field>

              <Field orientation="responsive">
                <Button type="submit">Submit</Button>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  )
}
