"use client"

import { Button } from "@/registry/react/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/react/hover-card"

export default function HoverCardSides() {
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
          Left
        </HoverCardTrigger>
        <HoverCardContent side="left">
          <p style={{ margin: 0 }}>
            The hover card appears on the left side of the trigger.
          </p>
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger
          delay={100}
          closeDelay={100}
          render={<Button variant="outline" />}
        >
          Top
        </HoverCardTrigger>
        <HoverCardContent side="top">
          <p style={{ margin: 0 }}>
            The hover card appears on the top side of the trigger.
          </p>
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger
          delay={100}
          closeDelay={100}
          render={<Button variant="outline" />}
        >
          Bottom
        </HoverCardTrigger>
        <HoverCardContent side="bottom">
          <p style={{ margin: 0 }}>
            The hover card appears on the bottom side of the trigger.
          </p>
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger
          delay={100}
          closeDelay={100}
          render={<Button variant="outline" />}
        >
          Right
        </HoverCardTrigger>
        <HoverCardContent side="right">
          <p style={{ margin: 0 }}>
            The hover card appears on the right side of the trigger.
          </p>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
