"use client"

import { Input } from "@/registry/react/input"
import { Label } from "@/registry/react/label"

export default function InputWithLabel() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.625rem",
      }}
    >
      <Label htmlFor="email">
        Email
        <span style={{ color: "var(--np-destructive)" }}>*</span>
      </Label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="your.email@example.com"
      />
    </div>
  )
}
