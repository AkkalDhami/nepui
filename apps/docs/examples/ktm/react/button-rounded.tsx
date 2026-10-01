"use client"

import { Button } from "@nepui/react/button"
import { ArrowUpIcon } from "@phosphor-icons/react"

export default function ButtonRounded() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Button className="np-button-rounded">Get Started</Button>

      <Button variant="outline" size="icon" className="np-button-rounded">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
