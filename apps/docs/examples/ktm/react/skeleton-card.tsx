"use client"

import { Skeleton } from "@/registry/react/skeleton"

export default function SkeletonCard() {
  return (
    <div
      aria-busy="true"
      style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
    >
      <Skeleton
        style={{
          width: "15.625rem",
          height: "7.8125rem",
          borderRadius: "0.75rem",
        }}
      />
      <div style={{ display: "grid", gap: "0.5rem" }}>
        <Skeleton style={{ width: "15.625rem" }} />
        <Skeleton style={{ width: "12.5rem" }} />
      </div>
    </div>
  )
}
