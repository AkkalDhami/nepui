"use client"

import { Badge } from "@/registry/react/badge"
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@phosphor-icons/react"

export default function BadgeWithIcon() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Badge variant="success" appearance="light">
        <CheckCircleIcon weight="fill" />
        Verified
      </Badge>
      <Badge variant="warning" appearance="light">
        <ClockIcon weight="fill" />
        Pending
      </Badge>
      <Badge variant="destructive" appearance="light">
        <XCircleIcon weight="fill" />
        Failed
      </Badge>
    </div>
  )
}
