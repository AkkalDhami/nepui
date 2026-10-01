"use client"

import { Spinner } from "@nepui/react/spinner"

export default function SpinnerDemo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Spinner /> Processing...
    </div>
  )
}
