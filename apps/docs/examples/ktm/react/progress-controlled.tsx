"use client"

import { useState } from "react"

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/registry/react/progress"
import { Slider } from "@/registry/react/slider"

export default function ProgressControlled() {
  const [value, setValue] = useState(50)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <Progress value={value}>
        <ProgressLabel>Progress</ProgressLabel>
        <ProgressValue />
      </Progress>

      <Slider
        value={value}
        onValueChange={(value) => setValue(value as number)}
        min={0}
        max={100}
        step={1}
      />
    </div>
  )
}
