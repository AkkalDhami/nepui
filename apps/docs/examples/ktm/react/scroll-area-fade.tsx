"use client"

import { ScrollArea } from "@/registry/react/scroll-area"

export default function ScrollAreaFade() {
  return (
    <ScrollArea
      fade
      style={{
        height: "14rem",
        width: "100%",
        maxWidth: "20rem",
        border: "1px solid var(--np-border)",
        borderRadius: "var(--np-radius-md)",
      }}
    >
      <div style={{ padding: "1rem", fontSize: "0.875rem" }}>
        <p style={{ margin: "0 0 0.75rem" }}>
          Vernacular architecture is building done outside any academic
          tradition, and without professional guidance.
        </p>
        <p style={{ margin: "0 0 0.75rem" }}>
          It is not a particular architectural movement or style, but rather a
          broad category of building types and methods of construction.
        </p>
        <p style={{ margin: "0 0 0.75rem" }}>
          This type of architecture usually serves immediate, local needs and is
          constrained by the materials available in its region.
        </p>
        <p style={{ margin: "0 0 0.75rem" }}>
          It reflects local traditions and cultural practices, and the skills of
          builders who were rarely given any attribution.
        </p>
        <p style={{ margin: 0 }}>
          More recently, it has been examined for energy-conscious design and
          construction.
        </p>
      </div>
    </ScrollArea>
  )
}
