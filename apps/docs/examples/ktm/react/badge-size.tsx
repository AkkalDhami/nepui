"use client"

import { Badge } from "@/registry/react/badge"

export default function BadgeSize() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Badge size="xs">Extra small</Badge>
      <Badge size="sm">Small</Badge>
      <Badge>Default</Badge>
      <Badge size="lg">Large</Badge>
      <Badge size="xl">Extra large</Badge>
    </div>
  )
}
