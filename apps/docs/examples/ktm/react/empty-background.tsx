"use client"

import type { CSSProperties } from "react"
import { ArrowsClockwiseIcon, BellIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/react/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/react/empty"

export default function EmptyBackground() {
  return (
    <Empty
      style={
        {
          width: "100%",
          maxWidth: "32rem",
          "--np-empty-bg":
            "linear-gradient(to bottom, color-mix(in oklab, var(--np-muted) 50%, transparent) 30%, var(--np-background))",
        } as CSSProperties
      }
    >
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BellIcon />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription>
          You’re all caught up. New notifications will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          <ArrowsClockwiseIcon />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  )
}
