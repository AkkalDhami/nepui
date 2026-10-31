"use client"

import { Slider } from "@/registry/react/slider"

export default function SliderMultiple() {
  return (
    <Slider
      defaultValue={[10, 20, 70]}
      max={100}
      step={10}
      aria-label="Thresholds"
      style={{ width: "100%", maxWidth: "20rem" }}
    />
  )
}
