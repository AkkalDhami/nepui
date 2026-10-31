"use client"

import { Meter } from "@/registry/react/meter"

export default function MeterNoLabel() {
  return (
    <Meter
      aria-label="Storage usage"
      value={50}
      style={{ width: "100%", maxWidth: "20rem" }}
    />
  )
}
