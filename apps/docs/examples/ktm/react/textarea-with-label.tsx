"use client"

import { Label } from "@/registry/react/label"
import { Textarea } from "@/registry/react/textarea"

export default function TextareaWithLabel() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.625rem",
        width: "24rem",
      }}
    >
      <Label htmlFor="message">Message</Label>
      <Textarea
        id="message"
        name="message"
        placeholder="Type your message here."
      />
    </div>
  )
}
