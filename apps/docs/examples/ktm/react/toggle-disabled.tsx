"use client"

import { Toggle } from "@/registry/react/toggle"

export default function ToggleDisabled() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Toggle disabled aria-label="Toggle disabled">
        Disabled
      </Toggle>

      <Toggle variant="outline" disabled aria-label="Toggle disabled outline">
        Disabled
      </Toggle>
    </div>
  )
}
