"use client"

import { Badge } from "@/registry/react/badge"

export default function BadgeDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Badge>Badge</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success" appearance="light" dot pulse>
        Success
      </Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive" appearance="light" dot pulse>
        Destructive
      </Badge>
      <Badge appearance="outline">Outline</Badge>
    </div>
  )
}
