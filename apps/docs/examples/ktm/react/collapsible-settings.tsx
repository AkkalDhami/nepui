"use client"

import { CaretDownIcon } from "@phosphor-icons/react"

import { Input } from "@/registry/react/input"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/react/collapsible"
import { Label } from "@/registry/react/label"

export default function CollapsibleSettings() {
  return (
    <Collapsible
      style={{
        width: "100%",
        maxWidth: "22rem",
        padding: "1rem",
        border: "1px solid var(--np-border)",
        borderRadius: "var(--np-radius-md)",
      }}
    >
      <CollapsibleTrigger
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          textAlign: "start",
          cursor: "pointer",
        }}
      >
        <span
          style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}
        >
          <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Radius</span>
          <span
            style={{
              fontSize: "0.8125rem",
              color: "var(--np-muted-foreground)",
            }}
          >
            Set the corner radius of the element.
          </span>
        </span>
        <CaretDownIcon className="np-collapsible-icon" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div style={{ display: "flex", gap: "0.75rem", paddingTop: "1rem" }}>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Label htmlFor="radius-x">Radius X</Label>
            <Input id="radius-x" defaultValue="8" />
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Label htmlFor="radius-y">Radius Y</Label>
            <Input id="radius-y" defaultValue="8" />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
