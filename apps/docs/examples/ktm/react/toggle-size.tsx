"use client"

import { Toggle } from "@/registry/react/toggle"

export default function ToggleSize() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Toggle variant="outline" size="sm" aria-label="Toggle small">
        Small
      </Toggle>

      <Toggle variant="outline" aria-label="Toggle default">
        Default
      </Toggle>

      <Toggle variant="outline" size="lg" aria-label="Toggle large">
        Large
      </Toggle>
    </div>
  )
}
