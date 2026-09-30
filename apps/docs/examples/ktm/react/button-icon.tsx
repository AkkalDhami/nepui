"use client"

import { Button } from "@nepui/react/button"
import { ArrowUpIcon } from "@phosphor-icons/react"

export default function ButtonIcon() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
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
