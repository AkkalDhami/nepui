"use client"

import { CopyButton } from "@/registry/react/copy-button"

export default function CopyButtonDemo() {
  return (
    <>
      {/* <CopyButton
        variant="ghost"
        value="npx nepui@latest add copy-button"
        size="icon"
        aria-label="Copy command"
      />

      <CopyButton value="npx nepui@latest add copy-button">Copy</CopyButton>

      <CopyButton
        variant="secondary"
        value="npx nepui@latest add copy-button"
        size="icon"
        aria-label="Copy command"
      />

      <CopyButton value={() => window.location.href}> Copy URL </CopyButton> */}

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <CopyButton variant="secondary" size="icon-sm" text="Text 1" />
        <CopyButton variant="outline" size="sm" text="Text 2">
          Copy
        </CopyButton>
      </div>
    </>
  )
}
