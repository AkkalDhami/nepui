"use client"

import { Separator } from "@/registry/react/separator"

export default function SeparatorVertical() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        height: "1.25rem",
        fontSize: "0.875rem",
      }}
    >
      <span>Home</span>
      <Separator orientation="vertical" />
      <span>Pricing</span>
      <Separator orientation="vertical" />
      <span>Contact</span>
    </div>
  )
}
