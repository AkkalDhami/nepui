"use client"

import { Rating } from "@/registry/react/rating"

export default function RatingDeselectableDemo() {
  return <Rating aria-label="Rating" defaultValue={4} deselectable />
}
