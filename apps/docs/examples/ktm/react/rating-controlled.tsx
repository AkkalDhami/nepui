"use client"

import * as React from "react"

import { Button } from "@/registry/react/button"
import {
  Rating,
  createRatingController,
  type RatingChangeDetails,
} from "@/registry/react/rating"

export default function RatingControlledDemo() {
  const [value, setValue] = React.useState<number | null>(3)
  const [log, setLog] = React.useState<string[]>([])
  const [controller] = React.useState(createRatingController)

  const handleValueChange = (
    next: number | null,
    details: RatingChangeDetails
  ) => {
    setValue(next)
    setLog((entries) =>
      [`${details.reason}: ${next ?? "none"}`, ...entries].slice(0, 4)
    )
  }

  return (
    <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
      <Rating
        aria-label="Rating"
        value={value}
        onValueChange={handleValueChange}
        controller={controller}
        step={0.5}
      />
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => controller.setValue(null)}
        >
          Clear rating
        </Button>
        <Button variant="outline" size="sm" onClick={() => controller.focus()}>
          Focus
        </Button>
      </div>
      <ul
        aria-live="polite"
        style={{
          margin: 0,
          paddingInlineStart: "1rem",
          color: "var(--np-muted-foreground)",
          fontSize: "0.875rem",
        }}
      >
        {log.map((entry, index) => (
          <li key={`${entry}-${index}`}>{entry}</li>
        ))}
      </ul>
    </div>
  )
}
