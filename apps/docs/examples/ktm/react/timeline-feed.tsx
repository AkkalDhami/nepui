"use client"

import * as React from "react"

import { Button } from "@/registry/react/button"
import {
  Timeline,
  TimelineConnector,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTitle,
} from "@/registry/react/timeline"

const names = [
  "Asha",
  "Bikash",
  "Chandra",
  "Dipa",
  "Esha",
  "Fulmaya",
  "Gita",
  "Hari",
  "Indra",
  "Jiwan",
  "Kabita",
  "Laxmi",
]

function makeUpdates(from: number, size: number) {
  return Array.from({ length: size }, (_, i) => ({
    id: from + i,
    title: `${names[(from + i) % names.length]} posted an update`,
    description: `Update number ${from + i + 1} for the team.`,
  }))
}

export default function TimelineFeedDemo() {
  const [updates, setUpdates] = React.useState(() => makeUpdates(0, 3))
  const [busy, setBusy] = React.useState(false)

  const loadMore = () => {
    setBusy(true)
    setTimeout(() => {
      setUpdates((current) => [...current, ...makeUpdates(current.length, 3)])
      setBusy(false)
    }, 600)
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        justifyItems: "start",
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <Timeline aria-label="Team updates" feed busy={busy}>
        {updates.map((update) => (
          <TimelineItem key={update.id}>
            <TimelineMarker />
            <TimelineConnector />
            <TimelineTitle>{update.title}</TimelineTitle>
            <TimelineDescription>{update.description}</TimelineDescription>
          </TimelineItem>
        ))}
      </Timeline>
      <Button variant="outline" size="sm" disabled={busy} onClick={loadMore}>
        {busy ? "Loading…" : "Load more"}
      </Button>
    </div>
  )
}
