"use client"

import { Slider } from "@/registry/react/slider"

export default function SliderVertical() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        width: "100%",
        maxWidth: "20rem",
      }}
    >
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        orientation="vertical"
        aria-label="Left channel"
        style={{ height: "10rem" }}
      />
      <Slider
        defaultValue={[25]}
        max={100}
        step={1}
        orientation="vertical"
        aria-label="Right channel"
        style={{ height: "10rem" }}
      />
    </div>
  )
}
