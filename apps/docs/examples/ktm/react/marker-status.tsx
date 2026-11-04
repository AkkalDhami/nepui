"use client"

import { ArrowsClockwiseIcon } from "@phosphor-icons/react"

import { Marker, MarkerContent, MarkerIcon } from "@/registry/react/marker"

export default function MarkerStatus() {
  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <Marker role="status">
        <MarkerIcon spin>
          <ArrowsClockwiseIcon />
        </MarkerIcon>
        <MarkerContent>Compacting conversation</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon spin>
          <ArrowsClockwiseIcon />
        </MarkerIcon>
        <MarkerContent>Running tests</MarkerContent>
      </Marker>
    </div>
  )
}
