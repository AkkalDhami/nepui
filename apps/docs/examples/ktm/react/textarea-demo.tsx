"use client"

import { Textarea } from "@/registry/react/textarea"

export default function TextareaDemo() {
  return (
    <Textarea
      placeholder="Type your message here."
      style={{
        width: "340px",
      }}
    />
  )
}
