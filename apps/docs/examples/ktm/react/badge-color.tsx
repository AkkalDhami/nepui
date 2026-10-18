"use client"

import { Badge } from "@/registry/react/badge"

export default function BadgeColor() {
  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <Badge color="red">red</Badge>
        <Badge color="#7c3aed">#7c3aed</Badge>
        <Badge color="rgb(14 165 233)">rgb()</Badge>
        <Badge color="hsl(45 93% 58%)">hsl()</Badge>
        <Badge color="oklch(0.7 0.15 150)">oklch()</Badge>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <Badge color="red" appearance="light">
          red
        </Badge>
        <Badge color="#7c3aed" appearance="light">
          #7c3aed
        </Badge>
        <Badge color="rgb(14 165 233)" appearance="outline">
          rgb()
        </Badge>
        <Badge color="hsl(45 93% 58%)" appearance="outline">
          hsl()
        </Badge>
      </div>
    </div>
  )
}
