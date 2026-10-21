"use client"

import { Textarea } from "@/registry/react/textarea"

export default function TextareaDisabled() {
  return (
    <Textarea
      disabled
      placeholder="This textarea is disabled"
      style={{
        width: "340px",
      }}
    />
  )
}
