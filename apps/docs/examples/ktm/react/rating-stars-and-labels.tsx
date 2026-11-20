"use client"

import * as React from "react"

import { Rating, RatingItem } from "@/registry/react/rating"

export default function RatingStarsAndLabelsDemo() {
  const [value, setValue] = React.useState<number | null>(7)

  return (
    <div style={{ display: "grid", gap: "0.5rem", justifyItems: "start" }}>
      <Rating
        aria-label="Score"
        max={10}
        loop
        size="sm"
        value={value}
        onValueChange={setValue}
        getValueLabel={(score, max) =>
          score == null ? "No score" : `${score} out of ${max}`
        }
      >
        <RatingItem />
      </Rating>
      <span
        style={{ color: "var(--np-muted-foreground)", fontSize: "0.875rem" }}
      >
        {value == null ? "No score" : `${value} / 10`}
      </span>
    </div>
  )
}
