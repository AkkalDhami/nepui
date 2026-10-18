"use client"

import { Badge } from "@/registry/react/badge"
import { Spinner } from "@/registry/react/spinner"

export default function BadgeWithSpinner() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Badge variant="destructive" appearance="light">
        <Spinner />
        Deleting
      </Badge>
      <Badge appearance="light">
        Generating
        <Spinner />
      </Badge>
    </div>
  )
}
