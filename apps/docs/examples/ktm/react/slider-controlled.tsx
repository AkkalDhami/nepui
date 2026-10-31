"use client"

import { useState } from "react"

import { Label } from "@/registry/react/label"
import { Slider } from "@/registry/react/slider"

export default function SliderControlled() {
  const [value, setValue] = useState([0.3, 0.7])

  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        width: "100%",
        maxWidth: "20rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Label htmlFor="slider-temperature">Temperature</Label>
        <span
          style={{ fontSize: "0.875rem", color: "var(--np-muted-foreground)" }}
        >
          {value.join(", ")}
        </span>
      </div>
      <Slider
        id="slider-temperature"
        value={value}
        onValueChange={(next) => setValue(next as number[])}
        min={0}
        max={1}
        step={0.1}
        aria-label="Temperature"
      />
    </div>
  )
}
