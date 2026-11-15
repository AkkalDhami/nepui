"use client"

import { Rating } from "@/registry/react/rating"

export default function RatingHalfDemo() {
  return <Rating aria-label="Rating" defaultValue={3.5} step={0.5} />
}
