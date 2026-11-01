"use client"

import { CaretDownIcon } from "@phosphor-icons/react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/react/collapsible"

export default function CollapsibleDemo() {
  return (
    <Collapsible
      defaultOpen
      style={{ width: "100%", maxWidth: "22rem", fontSize: "0.875rem" }}
    >
      <CollapsibleTrigger
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Order #4189
        <CaretDownIcon className="np-collapsible-icon" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "0.75rem",
          }}
        >
          <span style={{ color: "var(--np-muted-foreground)" }}>Status</span>
          <span>Shipped</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "0.75rem",
          }}
        >
          <span style={{ color: "var(--np-muted-foreground)" }}>Carrier</span>
          <span>DHL Express</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "0.75rem",
          }}
        >
          <span style={{ color: "var(--np-muted-foreground)" }}>Tracking</span>
          <span>JD014600003SE</span>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
