"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/react/resizable"

export default function ResizableVertical() {
  return (
    <ResizablePanelGroup
      orientation="vertical"
      style={{
        width: "100%",
        maxWidth: "28rem",
        height: "12.5rem",
        border: "1px solid var(--np-border)",
        borderRadius: "var(--np-radius-lg)",
      }}
    >
      <ResizablePanel defaultSize="25%">
        <div
          style={{
            display: "flex",
            boxSizing: "border-box",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <span style={{ fontWeight: 600 }}>Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="75%">
        <div
          style={{
            display: "flex",
            boxSizing: "border-box",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <span style={{ fontWeight: 600 }}>Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
