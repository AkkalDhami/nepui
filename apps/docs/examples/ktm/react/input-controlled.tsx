"use client"

import * as React from "react"
import { Input } from "@/registry/react/input"

export default function InputControlled() {
  const [value, setValue] = React.useState("")
  return (
    <div
      style={{
        width: "340px",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Input
        placeholder="Type something"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <span style={{ fontSize: "0.875rem" }}>Value: {value || "(empty)"}</span>
    </div>
  )
}
