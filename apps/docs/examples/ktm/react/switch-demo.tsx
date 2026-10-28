"use client"

import { Label } from "@/registry/react/label"
import { Switch } from "@/registry/react/switch"

export default function SwitchDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Switch id="sw-demo" />
      <Label htmlFor="sw-demo">Airplane mode</Label>
    </div>
  )
}
