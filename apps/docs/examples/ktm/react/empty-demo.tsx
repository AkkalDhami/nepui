"use client"

import { ArrowUpRightIcon, FolderOpenIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/react/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/react/empty"

export default function EmptyDemo() {
  return (
    <Empty style={{ width: "100%", maxWidth: "32rem" }}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpenIcon />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven’t created any projects yet. Get started by creating your
          first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        size="sm"
        style={{ color: "var(--np-muted-foreground)" }}
      >
        Learn More
        <ArrowUpRightIcon />
      </Button>
    </Empty>
  )
}
