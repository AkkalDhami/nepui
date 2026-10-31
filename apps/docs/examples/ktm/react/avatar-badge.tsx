"use client"

import type { CSSProperties } from "react"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/registry/react/avatar"

export default function AvatarBadgeDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Avatar>
        <AvatarImage
          src="https://github.com/akkaldhami.png"
          alt="@akkkaldhami"
        />
        <AvatarFallback>AD</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://github.com/akkaldhami.png"
          alt="@akkkaldhami"
        />
        <AvatarFallback>AD</AvatarFallback>
        <AvatarBadge
          style={
            { "--np-avatar-badge-color": "var(--np-success)" } as CSSProperties
          }
        />
      </Avatar>
    </div>
  )
}
