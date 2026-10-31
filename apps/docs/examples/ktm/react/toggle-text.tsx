"use client"

import { TextItalicIcon } from "@phosphor-icons/react"

import { Toggle } from "@/registry/react/toggle"

export default function ToggleText() {
  return (
    <Toggle aria-label="Toggle italic">
      <TextItalicIcon />
      Italic
    </Toggle>
  )
}
