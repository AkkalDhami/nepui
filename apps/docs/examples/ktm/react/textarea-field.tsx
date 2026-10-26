"use client"

import { Field, FieldDescription, FieldLabel } from "@/registry/react/field"
import { Textarea } from "@/registry/react/textarea"

export default function TextareaField() {
  return (
    <Field
      style={{
        width: "24rem",
      }}
    >
      <FieldLabel htmlFor="textarea-message">Message</FieldLabel>
      <FieldDescription>Enter your message below.</FieldDescription>
      <Textarea id="textarea-message" placeholder="Type your message here." />
    </Field>
  )
}
