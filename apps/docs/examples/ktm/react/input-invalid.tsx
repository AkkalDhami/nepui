"use client"

import { Input } from "@/registry/react/input"

export default function InputInvalid() {
  return (
    <div
      style={{
        width: "340px",
      }}
    >
      <Input placeholder="Invalid input" aria-invalid />
    </div>
  )
}
