"use client"

import { ScrollArea, ScrollBar } from "@/registry/react/scroll-area"

export default function ScrollAreaBoth() {
  return (
    <ScrollArea
      style={{
        height: "12rem",
        width: "100%",
        maxWidth: "20rem",
        border: "1px solid var(--np-border)",
        borderRadius: "var(--np-radius-md)",
      }}
    >
      <div style={{ width: "40rem", padding: "1rem", fontSize: "0.875rem" }}>
        <p style={{ margin: "0 0 0.75rem" }}>
          This content is wider and taller than its container, so both
          scrollbars appear and meet at the corner.
        </p>
        <p style={{ margin: "0 0 0.75rem" }}>
          Scroll with the wheel, drag a thumb, or use the keyboard after
          focusing the area.
        </p>
        <p style={{ margin: "0 0 0.75rem" }}>
          Each scrollbar only shows while its axis overflows.
        </p>
        <p style={{ margin: "0 0 0.75rem" }}>
          Thumbs follow the border token, so they adapt to light and dark.
        </p>
        <p style={{ margin: "0 0 0.75rem" }}>
          Add one more paragraph to make sure the vertical axis overflows.
        </p>
        <p style={{ margin: 0 }}>The end.</p>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
