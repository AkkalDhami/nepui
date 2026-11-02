"use client"

import { FileXIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/react/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/react/empty"

export default function EmptyNotFound() {
  return (
    <Empty style={{ width: "100%", maxWidth: "32rem" }}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileXIcon />
        </EmptyMedia>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you’re looking for doesn’t exist. It may have been moved or
          deleted.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Go Home</Button>
        <EmptyDescription>
          Need help? <a href="#">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}
