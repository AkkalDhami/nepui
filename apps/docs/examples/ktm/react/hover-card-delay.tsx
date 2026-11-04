"use client"

import { Button } from "@/registry/react/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/react/hover-card"

export default function HoverCardDelay() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.75rem",
      }}
    >
      <HoverCard>
        <HoverCardTrigger
          delay={100}
          closeDelay={100}
          render={<Button variant="outline" />}
        >
          Quick (100ms)
        </HoverCardTrigger>
        <HoverCardContent>
          <p style={{ margin: 0 }}>Opens after 100ms and closes after 100ms.</p>
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger
          delay={1000}
          closeDelay={500}
          render={<Button variant="outline" />}
        >
          Slow (1000ms)
        </HoverCardTrigger>
        <HoverCardContent>
          <p style={{ margin: 0 }}>
            Opens after 1000ms and closes after 500ms.
          </p>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
