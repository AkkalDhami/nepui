"use client"

import { Input } from "@/registry/react/input"

export default function InputSize() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        width: "340px",
      }}
    >
      <Input size="xs" placeholder="Extra small" />
      <Input size="sm" placeholder="Small" />
      <Input placeholder="Default" />
      <Input size="lg" placeholder="Large" />
    </div>
  )
}
