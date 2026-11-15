"use client"

import * as React from "react"

import { Button } from "@/registry/react/button"
import { Input } from "@/registry/react/input"
import { Group } from "@/registry/react/group"

export default function GroupInputDemo() {
  const [copied, setCopied] = React.useState(false)

  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <Group aria-label="Share link">
        <Input value="https://nepui.dev/docs" readOnly aria-label="Link" />
        <Button
          variant="outline"
          size="icon"
          aria-label={copied ? "Copied" : "Copy link"}
          onClick={() => {
            navigator.clipboard.writeText("https://nepui.dev/docs")
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }}
        >
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </Button>
      </Group>
    </div>
  )
}
