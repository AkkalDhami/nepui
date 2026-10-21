"use client"

import { Skeleton } from "@/registry/react/skeleton"

export default function SkeletonDemo() {
  return (
    <div
      aria-busy="true"
      style={{ display: "flex", alignItems: "center", gap: "1rem" }}
    >
      <Skeleton
        className="np-skeleton-circle"
        style={{ width: "3rem", height: "3rem", flexShrink: 0 }}
      />
      <div style={{ display: "grid", gap: "0.5rem" }}>
        <Skeleton style={{ width: "15.625rem", maxWidth: "100%" }} />
        <Skeleton style={{ width: "12.5rem", maxWidth: "100%" }} />
      </div>
    </div>
  )
}
