"use client"

import { Spinner } from "@nepui/react/spinner"

export default function SpinnerSize() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" /> {/* default */}
      <Spinner size="lg" />
      <Spinner size="xl" />
      <Spinner size="5rem" /> {/* custom size */}
    </div>
  )
}
