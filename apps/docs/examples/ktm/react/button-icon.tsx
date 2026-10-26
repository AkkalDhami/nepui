"use client"

import { ArrowUpIcon } from "@phosphor-icons/react"
import { Button } from "@/registry/react/button"

export default function ButtonIcon() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Button size="icon-sm" variant="outline">
        <ArrowUpIcon />
      </Button>

      <Button size="icon" variant="outline">
        <ArrowUpIcon />
      </Button>

      <Button size="icon-lg" variant="outline">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
