"use client"

import { Input } from "@/registry/react/input"
import { Label } from "@/registry/react/label"

export default function InputFile() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        width: "340px",
      }}
    >
      <Label htmlFor="avatar">Avatar</Label>
      <Input id="avatar" type="file" />
    </div>
  )
}
