"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/registry/react/avatar"
import { Button } from "@/registry/react/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/react/hover-card"

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link" />}>
        @nextjs
      </HoverCardTrigger>
      <HoverCardContent style={{ width: "20rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" alt="@nextjs" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div style={{ display: "grid", gap: "0.25rem" }}>
            <h4 style={{ margin: 0, fontSize: "0.875rem", fontWeight: 600 }}>
              @nextjs
            </h4>
            <p style={{ margin: 0, fontSize: "0.875rem" }}>
              The React Framework – created and maintained by @vercel.
            </p>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--np-muted-foreground)",
              }}
            >
              Joined December 2021
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
