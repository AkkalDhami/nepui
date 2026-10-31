"use client"

import { useEffect, useState } from "react"

import { Progress } from "@/registry/react/progress"

export default function ProgressDemo() {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Progress
      value={progress}
      aria-label="Progress"
      style={{ width: "100%", maxWidth: "24rem" }}
    />
  )
}
