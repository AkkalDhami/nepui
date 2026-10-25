"use client"

import { Kbd, KbdGroup } from "@/registry/react/kbd"

export default function KbdGroupExample() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--np-foreground)",
        }}
      >
        Use{" "}
        <KbdGroup>
          <Kbd>Ctrl + B</Kbd>
          <Kbd>Ctrl + K</Kbd>
        </KbdGroup>{" "}
        to open the command palette
      </p>
    </div>
  )
}
