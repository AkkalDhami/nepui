"use client"

import { Rating } from "@/registry/react/rating"

export default function RatingReadOnlyDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Rating
        readOnly
        value={4.2}
        getValueLabel={(value, max) => `Average rating: ${value} out of ${max}`}
      />
      <span
        style={{ color: "var(--np-muted-foreground)", fontSize: "0.875rem" }}
      >
        4.2
      </span>
    </div>
  )
}
