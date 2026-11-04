"use client"

import {
  BookOpenTextIcon,
  GitBranchIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react"

import { Marker, MarkerContent, MarkerIcon } from "@/registry/react/marker"

export default function MarkerIconDemo() {
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
      <Marker>
        <MarkerIcon>
          <MagnifyingGlassIcon />
        </MarkerIcon>
        <MarkerContent>Explored 4 files</MarkerContent>
      </Marker>
      <Marker orientation="vertical">
        <MarkerIcon>
          <BookOpenTextIcon />
        </MarkerIcon>
        <MarkerContent>Syncing completed</MarkerContent>
      </Marker>
    </div>
  )
}
