"use client"

import * as React from "react"

import { CopyButton } from "@/registry/react/copy-button"

export default function CopyButtonEventsDemo() {
  const [message, setMessage] = React.useState("")

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <CopyButton
        size="sm"
        text="Hello from nepui"
        onCopySuccess={(text) => setMessage(`Copied: ${text}`)}
        onCopyError={(error) => setMessage(error.message)}
      >
        Copy
      </CopyButton>
      <span
        role="status"
        style={{ color: "var(--np-muted-foreground)", fontSize: "0.875rem" }}
      >
        {message}
      </span>
    </div>
  )
}
