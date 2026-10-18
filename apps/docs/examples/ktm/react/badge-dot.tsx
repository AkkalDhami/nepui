"use client"

import { Badge } from "@/registry/react/badge"

export default function BadgeDot() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Badge variant="success" appearance="light" dot>
        Online
      </Badge>
      <Badge variant="warning" appearance="light" dot>
        Away
      </Badge>
      <Badge variant="destructive" appearance="light" dot>
        Offline
      </Badge>
      <Badge variant="info" dot>
        Solid
      </Badge>
    </div>
  )
}
