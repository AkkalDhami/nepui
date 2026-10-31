"use client"

import { ToggleGroup, ToggleGroupItem } from "@/registry/react/toggle-group"

export default function ToggleGroupOutline() {
  return (
    <ToggleGroup
      variant="outline"
      spacing={0}
      defaultValue={["all"]}
      aria-label="Filter messages"
    >
      <ToggleGroupItem value="all">All</ToggleGroupItem>
      <ToggleGroupItem value="missed">Missed</ToggleGroupItem>
    </ToggleGroup>
  )
}
