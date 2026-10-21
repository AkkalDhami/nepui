"use client"

import { Skeleton } from "@/registry/react/skeleton"

export default function SkeletonShape() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Skeleton
        className="np-skeleton-circle"
        style={{ width: "2rem", height: "2rem" }}
      />
      <Skeleton
        className="np-skeleton-circle"
        style={{ width: "3rem", height: "3rem" }}
      />
      <Skeleton
        className="np-skeleton-circle"
        style={{ width: "4rem", height: "4rem" }}
      />
      <Skeleton style={{ width: "4rem", height: "4rem" }} />
    </div>
  )
}
