"use client"

import type { CSSProperties } from "react"

import { Progress } from "@/registry/react/progress"

export default function ProgressColor() {
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
        value={40}
        aria-label="Violet"
        style={{ "--np-progress-color": "#7c3aed" } as CSSProperties}
      />
      <Progress
        value={72}
        aria-label="Storage"
        style={
          { "--np-progress-color": "var(--np-destructive)" } as CSSProperties
        }
      />
      <Progress
        value={100}
        aria-label="Complete"
        style={{ "--np-progress-color": "#16a34a" } as CSSProperties}
      />
    </div>
  )
}
