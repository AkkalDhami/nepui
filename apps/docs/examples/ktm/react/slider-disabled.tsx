"use client"

import { Slider } from "@/registry/react/slider"

export default function SliderDisabled() {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      disabled
      aria-label="Disabled slider"
      style={{ width: "100%", maxWidth: "20rem" }}
    />
  )
}
