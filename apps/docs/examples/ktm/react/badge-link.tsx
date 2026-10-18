"use client"

import { Badge } from "@/registry/react/badge"
import { ArrowUpRightIcon } from "@phosphor-icons/react"

export default function BadgeLink() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Badge
        render={
          <a href="#link">
            Open a link <ArrowUpRightIcon />
          </a>
        }
      />
    </div>
  )
}
