"use client"

import { Separator } from "@/registry/react/separator"

export default function SeparatorList() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        width: "100%",
        maxWidth: "24rem",
        fontSize: "0.875rem",
      }}
    >
      <dl
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 0,
        }}
      >
        <dt>Item 1</dt>
        <dd style={{ margin: 0, color: "var(--np-muted-foreground)" }}>
          Value 1
        </dd>
      </dl>

      <Separator />

      <dl
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 0,
        }}
      >
        <dt>Item 2</dt>
        <dd style={{ margin: 0, color: "var(--np-muted-foreground)" }}>
          Value 2
        </dd>
      </dl>

      <Separator />

      <dl
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 0,
        }}
      >
        <dt>Item 3</dt>
        <dd style={{ margin: 0, color: "var(--np-muted-foreground)" }}>
          Value 3
        </dd>
      </dl>
    </div>
  )
}
