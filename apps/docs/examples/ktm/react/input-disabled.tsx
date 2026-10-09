"use client"

import { Input } from "@/registry/react/input"

export default function InputDisabled() {
  return (
    <div
      style={{
        width: "340px",
      }}
    >
      <Input placeholder="Disabled input" disabled />
    </div>
  )
}
