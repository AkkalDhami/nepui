"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/react/resizable"

export default function ResizableHandleDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
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
          <span style={{ fontWeight: 600 }}>Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
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
