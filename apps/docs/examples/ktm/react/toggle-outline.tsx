"use client"

import { TextBIcon, TextItalicIcon } from "@phosphor-icons/react"

import { Toggle } from "@/registry/react/toggle"

export default function ToggleOutline() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Toggle variant="outline" aria-label="Toggle italic">
        <TextItalicIcon />
      </Toggle>

      <Toggle variant="outline" aria-label="Toggle bold">
        <TextBIcon />
      </Toggle>
    </div>
  )
}
