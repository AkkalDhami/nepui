"use client"

import {
  ArrowsClockwiseIcon,
  GitBranchIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react"

import { Marker, MarkerContent, MarkerIcon } from "@/registry/react/marker"

export default function MarkerDemo() {
  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <Marker>
        <MarkerIcon>
          <GitBranchIcon />
        </MarkerIcon>
        <MarkerContent>Switched to a new branch</MarkerContent>
      </Marker>

      <Marker role="status">
        <MarkerIcon spin>
          <ArrowsClockwiseIcon />
        </MarkerIcon>
        <MarkerContent shimmer>Thinking...</MarkerContent>
      </Marker>

      <Marker variant="separator">
        <MarkerContent>Conversation compacted</MarkerContent>
      </Marker>

      <Marker>
        <MarkerIcon>
          <MagnifyingGlassIcon />
        </MarkerIcon>
        <MarkerContent>Explored 4 files</MarkerContent>
      </Marker>
    </div>
  )
}
