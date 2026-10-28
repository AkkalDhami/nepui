"use client"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/registry/react/field"
import { RadioGroup, RadioGroupItem } from "@/registry/react/radio-group"

export default function RadioGroupChoiceCard() {
  return (
    <RadioGroup
      defaultValue="plus"
      aria-label="Plan"
      style={{ width: "100%", maxWidth: "24rem" }}
    >
      <FieldLabel htmlFor="card-plus">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Plus</FieldTitle>
            <FieldDescription>
              For individuals and small teams.
            </FieldDescription>
          </FieldContent>
          <RadioGroupItem value="plus" id="card-plus" />
        </Field>
      </FieldLabel>

      <FieldLabel htmlFor="card-pro">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Pro</FieldTitle>
            <FieldDescription>For growing businesses.</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="pro" id="card-pro" />
        </Field>
      </FieldLabel>

      <FieldLabel htmlFor="card-enterprise">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Enterprise</FieldTitle>
            <FieldDescription>
              For large teams and organizations.
            </FieldDescription>
          </FieldContent>
          <RadioGroupItem value="enterprise" id="card-enterprise" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  )
}
