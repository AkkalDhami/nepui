"use client"

import { Badge } from "@/registry/react/badge"

export default function BadgePulse() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Badge variant="success" appearance="light" pulse>
        Live
      </Badge>
      <Badge variant="info" appearance="light" pulse>
        Syncing
      </Badge>
      <Badge variant="destructive" appearance="light" pulse>
        Recording
      </Badge>
      <Badge color="#7c3aed" appearance="outline" pulse>
        Custom
      </Badge>
    </div>
  )
}
