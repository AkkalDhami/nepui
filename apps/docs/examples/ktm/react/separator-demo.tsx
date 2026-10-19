"use client"

import { Separator } from "@/registry/react/separator"

export default function SeparatorDemo() {
  return (
    <div
      style={{
        display: "flex",
        maxWidth: "24rem",
        flexDirection: "column",
        gap: "1rem",
        fontSize: "0.875rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.375rem",
        }}
      >
        <div style={{ lineHeight: 1, fontWeight: 500 }}>nepui</div>
        <div style={{ color: "var(--np-muted-foreground)" }}>
          The Foundation for your Design System
        </div>
      </div>

      <Separator />

      <p>Simple, customizable components built with CSS and React.</p>

      <Separator />

      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        HTML
        <Separator orientation="vertical" />
        CSS
        <Separator orientation="vertical" />
        JavaScript
        <Separator orientation="vertical" />
        React
      </div>
    </div>
  )
}
