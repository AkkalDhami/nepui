"use client"

import { Spinner } from "@/registry/react/spinner"

export default function SpinnerSpeed() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Spinner speed="slow" />
      <Spinner speed="normal" /> {/* default */}
      <Spinner speed="fast" />
      <Spinner speed="faster" />
      <Spinner speed="200ms" /> {/* custom speed */}
    </div>
  )
}
