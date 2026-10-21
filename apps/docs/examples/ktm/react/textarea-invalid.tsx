"use client"

import { Textarea } from "@/registry/react/textarea"

export default function TextareaInvalid() {
  return (
    <Textarea
      aria-invalid
      placeholder="This textarea has an error"
      style={{
        width: "340px",
      }}
    />
  )
}
