"use client"

import { ToggleGroup, ToggleGroupItem } from "@/registry/react/toggle-group"

export default function ToggleGroupSpacing() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1rem",
      }}
    >
      <ToggleGroup
        variant="outline"
        spacing={0}
        defaultValue={["top"]}
        aria-label="Connected"
      >
        <ToggleGroupItem value="top">Top</ToggleGroupItem>
        <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup
        variant="outline"
        defaultValue={["top"]}
        aria-label="Default spacing"
      >
        <ToggleGroupItem value="top">Top</ToggleGroupItem>
        <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup
        variant="outline"
        spacing={4}
        defaultValue={["top"]}
        aria-label="Wide spacing"
      >
        <ToggleGroupItem value="top">Top</ToggleGroupItem>
        <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
