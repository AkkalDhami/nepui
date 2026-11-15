"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/react/collapsible"
import { Button } from "@/registry/react/button"

import {
  Timeline,
  TimelineConnector,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@/registry/react/timeline"

const releases = [
  {
    version: "v2.4.0",
    date: "Nov 14",
    changes: [
      "Export reports as CSV",
      "Faster search",
      "Fixed the date picker in RTL",
    ],
  },
  {
    version: "v2.3.0",
    date: "Oct 29",
    changes: ["New onboarding flow", "Dark mode for charts"],
  },
  {
    version: "v2.2.0",
    date: "Oct 02",
    changes: ["Keyboard shortcuts", "Smaller bundle"],
  },
]

export default function TimelineDetailsDemo() {
  return (
    <Timeline
      aria-label="Changelog"
      style={{ width: "100%", maxWidth: "24rem" }}
    >
      {releases.map((release) => (
        <TimelineItem key={release.version}>
          <TimelineMarker />
          <TimelineConnector />
          <TimelineTitle>{release.version}</TimelineTitle>
          <TimelineTime>{release.date}</TimelineTime>
          <Collapsible>
            <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
              What changed
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul
                style={{
                  margin: "0.25rem 0 0",
                  paddingInlineStart: "1.25rem",
                  color: "var(--np-muted-foreground)",
                  fontSize: "0.875rem",
                }}
              >
                {release.changes.map((change) => (
                  <li key={change}>{change}</li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
