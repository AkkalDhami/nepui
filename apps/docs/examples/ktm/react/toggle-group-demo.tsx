"use client"

import {
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react"

import { ToggleGroup, ToggleGroupItem } from "@/registry/react/toggle-group"

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup multiple aria-label="Text formatting">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextBIcon />
      </ToggleGroupItem>

      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <TextItalicIcon />
      </ToggleGroupItem>

      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <TextUnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
