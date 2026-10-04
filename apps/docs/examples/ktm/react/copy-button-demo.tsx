"use client"

import { CopyButton } from "@nepui/react/copy-button"
import { useRef } from "react"

export default function CopyButtonDemo() {
  const codeRef = useRef<HTMLPreElement>(null)

  return (
    <>
      <CopyButton value="npm install nepui">Copy</CopyButton>

      <CopyButton value="npm install nepui" variant="ghost" size="sm">
        Copy
      </CopyButton>

      <pre ref={codeRef}>
        <code>npm install nepui</code>
      </pre>
      <CopyButton target={codeRef} copiedText="Copied!">
        Copy code
      </CopyButton>

      <CopyButton
        value="npx nepui@latest add button"
        size="icon"
        aria-label="Copy command"
      />

      <CopyButton
        value={() => window.location.href}
        size="icon-sm"
        className="np-button-rounded"
        aria-label="Copy link"
        onCopy={(text) => console.log("copied", text)}
      />
    </>
  )
}
