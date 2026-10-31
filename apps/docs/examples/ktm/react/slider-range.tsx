"use client"

import { Slider } from "@/registry/react/slider"

export default function SliderRange() {
  return (
    <Slider
      defaultValue={[25, 50]}
      max={100}
      step={5}
      aria-label="Price range"
      style={{ width: "100%", maxWidth: "20rem" }}
    />
  )
}
