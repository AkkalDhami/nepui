"use client"

import { CloudIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/react/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/react/empty"

export default function EmptyOutline() {
  return (
    <Empty appearance="outline" style={{ width: "100%", maxWidth: "32rem" }}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CloudIcon />
        </EmptyMedia>
        <EmptyTitle>Cloud Storage Empty</EmptyTitle>
        <EmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Upload Files
        </Button>
      </EmptyContent>
    </Empty>
  )
}
