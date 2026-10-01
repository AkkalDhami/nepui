"use client"

import { Spinner } from "@nepui/react/spinner"

export default function SpinnerDirection() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Spinner direction="clockwise" /> {/* default */}
      <Spinner direction="counterclockwise" />
    </div>
  )
}
