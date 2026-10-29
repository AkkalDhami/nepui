"use client"

import * as React from "react"
import type { CSSProperties } from "react"

import { ScrollArea } from "@/registry/react/scroll-area"
import { Separator } from "@/registry/react/separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export default function ScrollAreaColor() {
  return (
    <ScrollArea
      style={
        {
          height: "14rem",
          width: "12rem",
          border: "1px solid var(--np-border)",
          borderRadius: "var(--np-radius-md)",
          "--np-scroll-area-thumb-color": "#e76813",
        } as CSSProperties
      }
    >
      <div style={{ padding: "1rem", fontSize: "0.875rem" }}>
        <h4
          style={{
            margin: "0 0 1rem",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Tags
        </h4>

        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator style={{ marginBlock: "0.5rem" }} />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
