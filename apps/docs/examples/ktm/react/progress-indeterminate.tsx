"use client"

import { Progress } from "@/registry/react/progress"

export default function ProgressIndeterminate() {
  return (
    <Progress
      value={null}
      aria-label="Loading"
      style={{ width: "100%", maxWidth: "24rem" }}
    />
  )
}
