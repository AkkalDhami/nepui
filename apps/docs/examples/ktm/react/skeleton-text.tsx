"use client"

import { Skeleton } from "@/registry/react/skeleton"

export default function SkeletonText() {
  return (
    <div
      aria-busy="true"
      style={{
        display: "grid",
        gap: "0.75rem",
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <Skeleton style={{ width: "40%", height: "1.25rem" }} />
      <div style={{ display: "grid", gap: "0.5rem" }}>
        <Skeleton style={{ width: "100%" }} />
        <Skeleton style={{ width: "100%" }} />
        <Skeleton style={{ width: "90%" }} />
        <Skeleton style={{ width: "60%" }} />
      </div>
    </div>
  )
}
