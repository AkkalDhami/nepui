"use client"

import * as React from "react"
import { Textarea } from "@/registry/react/textarea"

export default function TextareaControlled() {
  const [value, setValue] = React.useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        width: "24rem",
      }}
    >
      <Textarea
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setValue(e.target.value)
        }
        placeholder="Type something..."
      />
      <p
        style={{
          fontSize: "0.875rem",
        }}
      >
        Character count: {value.length}
      </p>
    </div>
  )
}
