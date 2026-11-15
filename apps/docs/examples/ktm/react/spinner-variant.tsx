"use client"

import { Spinner, type SpinnerVariant } from "@/registry/react/spinner"

const variants: SpinnerVariant[] = [
  "default",
  "success",
  "info",
  "error",
  "warning",
]

export default function SpinnerVariantDemo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1.5rem",
      }}
    >
      {variants.map((variant) => (
        <div
          key={variant}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Spinner variant={variant} label={`${variant} loading`} />
          <span>{variant}</span>
        </div>
      ))}
    </div>
  )
}
