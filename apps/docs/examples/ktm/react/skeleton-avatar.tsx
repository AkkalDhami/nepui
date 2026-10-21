"use client"

import { Skeleton } from "@/registry/react/skeleton"

export default function SkeletonAvatar() {
  return (
    <div
      aria-busy="true"
      style={{ display: "flex", alignItems: "center", gap: "2rem" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Skeleton
          className="np-skeleton-circle"
          style={{ width: "2rem", height: "2rem" }}
        />
        <Skeleton style={{ width: "6rem" }} />
      </div>

      <div style={{ display: "flex" }}>
        <Skeleton
          className="np-skeleton-circle"
          style={{
            width: "2.5rem",
            height: "2.5rem",
            border: "2px solid var(--np-background)",
          }}
        />
        <Skeleton
          className="np-skeleton-circle"
          style={{
            width: "2.5rem",
            height: "2.5rem",
            marginLeft: "-0.75rem",
            border: "2px solid var(--np-background)",
          }}
        />
        <Skeleton
          className="np-skeleton-circle"
          style={{
            width: "2.5rem",
            height: "2.5rem",
            marginLeft: "-0.75rem",
            border: "2px solid var(--np-background)",
          }}
        />
      </div>
    </div>
  )
}
