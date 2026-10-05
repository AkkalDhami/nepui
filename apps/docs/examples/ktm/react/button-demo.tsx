"use client"

import { Button } from "@/registry/react/button"
import { ArrowUpIcon } from "@phosphor-icons/react"

export default function ButtonDemo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Button>Default</Button>

      <Button variant="outline">Outline</Button>

      <Button variant="secondary">Secondary</Button>

      <Button variant="ghost">Ghost</Button>

      <Button
        as="link"
        href="https://github.com/akkaldhami/nepui"
        target="_blank"
      >
        Link
      </Button>

      <Button variant="outline" size="icon" className="np-button-rounded">
        <ArrowUpIcon />
      </Button>

      <Button variant="destructive">Destructive</Button>
    </div>
  )
}
