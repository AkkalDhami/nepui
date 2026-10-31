"use client"

import type { CSSProperties } from "react"

import { Progress } from "@/registry/react/progress"

export default function ProgressSize() {
  return (
    <div
      style={{
        display: "grid",
        gap: "1.5rem",
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <Progress
        value={60}
        aria-label="Thin"
        style={{ "--np-progress-height": "0.125rem" } as CSSProperties}
      />
      <Progress value={60} aria-label="Default" />
      <Progress
        value={60}
        aria-label="Medium"
        style={{ "--np-progress-height": "0.5rem" } as CSSProperties}
      />
      <Progress
        value={60}
        aria-label="Large"
        style={{ "--np-progress-height": "0.75rem" } as CSSProperties}
      />
    </div>
  )
}
