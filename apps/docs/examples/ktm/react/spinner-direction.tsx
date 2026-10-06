"use client"

import { Spinner } from "@/registry/react/spinner"

export default function SpinnerDirection() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Spinner direction="clockwise" /> {/* default */}
      <Spinner direction="counterclockwise" />
    </div>
  )
}
