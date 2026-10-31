"use client"

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/registry/react/progress"

export default function ProgressWithLabel() {
  return (
    <Progress value={56} style={{ width: "100%", maxWidth: "24rem" }}>
      <ProgressLabel>Upload progress</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}
