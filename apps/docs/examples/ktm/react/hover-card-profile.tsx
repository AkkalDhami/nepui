"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/registry/react/avatar"
import { Badge } from "@/registry/react/badge"
import { Button } from "@/registry/react/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/react/hover-card"
import { Separator } from "@/registry/react/separator"

export default function HoverCardProfile() {
  return (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="outline" />}>
        Hover for profile
      </HoverCardTrigger>
      <HoverCardContent style={{ width: "20rem" }}>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div style={{ display: "grid", flex: 1 }}>
              <span style={{ fontWeight: 600 }}>shadcn</span>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--np-muted-foreground)",
                }}
              >
                @shadcn
              </span>
            </div>
            <Badge variant="success">Verified</Badge>
          </div>
          <p style={{ margin: 0 }}>
            Building components and tools for designers and developers.
          </p>
          <Separator />
          <div
            style={{
              display: "flex",
              gap: "1rem",
              fontSize: "0.75rem",
              color: "var(--np-muted-foreground)",
            }}
          >
            <span>
              <strong style={{ color: "var(--np-foreground)" }}>12</strong>{" "}
              Following
            </span>
            <span>
              <strong style={{ color: "var(--np-foreground)" }}>96.4k</strong>{" "}
              Followers
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
