"use client"

import { Field, FieldLabel } from "@/registry/react/field"
import { Textarea } from "@/registry/react/textarea"

export default function TextareaDisabled() {
  return (
    <Field
      data-disabled
      style={{
        maxWidth: "24rem",
        width: "100%",
      }}
    >
      <FieldLabel htmlFor="textarea-disabled">Message</FieldLabel>
      <Textarea
        id="textarea-disabled"
        placeholder="Type your message here."
        disabled
      />
    </Field>
  )
}
