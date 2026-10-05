"use client"

import { Spinner } from "@/registry/react/spinner"

export default function SpinnerThickness() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Spinner thickness="thin" />
      <Spinner thickness="normal" />
      <Spinner thickness="medium" /> {/* default */}
      <Spinner thickness="thick" />
      <Spinner thickness="extra-thick" />
      <Spinner thickness="3px" /> {/* custom */}
    </div>
  )
}
