"use client"

import { ArrowCounterClockwiseIcon, GitBranchIcon } from "@phosphor-icons/react"

import { Marker, MarkerContent, MarkerIcon } from "@/registry/react/marker"

export default function MarkerInteractive() {
  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <Marker render={<a href="#" />}>
        <MarkerIcon>
          <GitBranchIcon />
        </MarkerIcon>
        <MarkerContent>View the pull request</MarkerContent>
      </Marker>
      <Marker render={<button type="button" />}>
        <MarkerIcon>
          <ArrowCounterClockwiseIcon />
        </MarkerIcon>
        <MarkerContent>Revert this change</MarkerContent>
      </Marker>
    </div>
  )
}
