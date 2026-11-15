"use client"

import { Rating } from "@/registry/react/rating"

export default function RatingSizesDemo() {
  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <Rating aria-label="Small" size="sm" defaultValue={3} />
      <Rating aria-label="Default" defaultValue={3} />
      <Rating aria-label="Large" size="lg" defaultValue={3} />
    </div>
  )
}
