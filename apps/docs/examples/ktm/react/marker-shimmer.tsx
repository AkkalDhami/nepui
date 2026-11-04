"use client"

import { Marker, MarkerContent } from "@/registry/react/marker"

export default function MarkerShimmer() {
  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <Marker role="status">
        <MarkerContent shimmer>Thinking...</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerContent shimmer>Reading 4 files</MarkerContent>
      </Marker>
    </div>
  )
}
