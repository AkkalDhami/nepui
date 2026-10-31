"use client"

import {
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react"

import { ToggleGroup, ToggleGroupItem } from "@/registry/react/toggle-group"

export default function ToggleGroupDisabled() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1rem",
      }}
    >
      <ToggleGroup multiple disabled aria-label="Text formatting, disabled">
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

      <ToggleGroup
        multiple
        disabled
        variant="outline"
        spacing={0}
        aria-label="Text formatting, disabled outline"
      >
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
    </div>
  )
}
