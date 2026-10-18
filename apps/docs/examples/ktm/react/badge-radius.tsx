"use client"

import { Badge } from "@/registry/react/badge"

export default function BadgeRadius() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Badge>Full</Badge>
      <Badge radius="md">Medium</Badge>
    </div>
  )
}
