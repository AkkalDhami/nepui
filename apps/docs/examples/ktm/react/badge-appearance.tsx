"use client"

import { Badge } from "@/registry/react/badge"

export default function BadgeAppearance() {
  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <Badge>Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <Badge appearance="light">Default</Badge>
        <Badge variant="success" appearance="light">
          Success
        </Badge>
        <Badge variant="warning" appearance="light">
          Warning
        </Badge>
        <Badge variant="destructive" appearance="light">
          Destructive
        </Badge>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <Badge appearance="outline">Default</Badge>
        <Badge variant="success" appearance="outline">
          Success
        </Badge>
        <Badge variant="warning" appearance="outline">
          Warning
        </Badge>
        <Badge variant="destructive" appearance="outline">
          Destructive
        </Badge>
      </div>
    </div>
  )
}
