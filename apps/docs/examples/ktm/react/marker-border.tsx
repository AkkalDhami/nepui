"use client"

import {
  FileTextIcon,
  GitBranchIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react"

import { Marker, MarkerContent, MarkerIcon } from "@/registry/react/marker"

export default function MarkerBorder() {
  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <Marker variant="border">
        <MarkerIcon>
          <GitBranchIcon />
        </MarkerIcon>
        <MarkerContent>Switched to release-candidate</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <MagnifyingGlassIcon />
        </MarkerIcon>
        <MarkerContent>Reviewed 8 related files</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <FileTextIcon />
        </MarkerIcon>
        <MarkerContent>Opened implementation notes</MarkerContent>
      </Marker>
    </div>
  )
}
