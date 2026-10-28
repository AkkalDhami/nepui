"use client"

import { Label } from "@/registry/react/label"
import { Switch } from "@/registry/react/switch"

export default function SwitchSize() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Switch id="sw-size-sm" size="sm" />
        <Label htmlFor="sw-size-sm">Small</Label>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Switch id="sw-size-default" />
        <Label htmlFor="sw-size-default">Default</Label>
      </div>
    </div>
  )
}
