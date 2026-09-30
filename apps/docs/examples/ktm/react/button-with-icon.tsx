"use client"

import { Button } from "@nepui/react/button"
import { DownloadSimpleIcon, PlusIcon } from "@phosphor-icons/react"

export default function ButtonWithIcon() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Button variant="outline">
        <PlusIcon />
        Add item
      </Button>

      <Button variant="outline">
        Download
        <DownloadSimpleIcon />
      </Button>
    </div>
  )
}
