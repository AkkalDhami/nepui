"use client"

import { Button } from "@/registry/react/button"
import { ArrowUpIcon } from "@phosphor-icons/react"

export default function ButtonSize() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "start",
          gap: "8px",
        }}
      >
        <Button size="xs" variant="outline">
          Extra Small
        </Button>
        <Button size="icon-xs" aria-label="Submit" variant="outline">
          <ArrowUpIcon />
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "start",
          gap: "8px",
        }}
      >
        <Button size="sm" data-variant="outline">
          Small
        </Button>
        <Button size="icon-sm" aria-label="Submit" variant="outline">
          <ArrowUpIcon />
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "start",
          gap: "8px",
        }}
      >
        <Button variant="outline">Default</Button>
        <Button size="icon" aria-label="Submit" variant="outline">
          <ArrowUpIcon />
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "start",
          gap: "8px",
        }}
      >
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button size="icon-lg" aria-label="Submit" variant="outline">
          <ArrowUpIcon />
        </Button>
      </div>
    </div>
  )
}
