"use client"

import { Rating } from "@/registry/react/rating"

export default function RatingDisabledDemo() {
  return <Rating aria-label="Rating" defaultValue={2} disabled />
}
