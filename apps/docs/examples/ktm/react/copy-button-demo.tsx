"use client"

import { CopyButton } from "@/registry/react/copy-button"

export default function CopyButtonDemo() {
  return (
    <>
      <CopyButton
        variant="ghost"
        value="npx nepui@latest add copy-button --target react"
        size="icon"
        aria-label="Copy command"
      />
      <CopyButton value="npx nepui@latest add copy-button --target react">
        Copy
      </CopyButton>

      <CopyButton
        variant="secondary"
        value="npx nepui@latest add copy-button --target react"
        size="icon"
        aria-label="Copy command"
      />
    </>
  )
}
