"use client"

import { Slider } from "@/registry/react/slider"

export default function SliderDemo() {
  return (
    <Slider
      defaultValue={[75]}
      max={100}
      step={1}
      aria-label="Volume"
      style={{ width: "100%", maxWidth: "20rem" }}
    />
  )
}
