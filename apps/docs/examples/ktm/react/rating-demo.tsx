"use client"

import { Rating, RatingItem } from "@/registry/react/rating"

export default function RatingDemo() {
  return (
    <Rating aria-label="Rating" defaultValue={3}>
      <RatingItem />
    </Rating>
  )
}
