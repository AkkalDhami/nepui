"use client"

import { CSSProperties } from "react"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/registry/react/avatar"

export default function AvatarDemo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1.6rem",
      }}
    >
      <AvatarGroup>
        <Avatar>
          <AvatarImage
            src="https://github.com/pratapchaulagain.png"
            alt="@pratapchaulagain"
          />
          <AvatarFallback>PC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/manisbhusal.png"
            alt="@manisbhusal"
          />
          <AvatarFallback>MB</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <Avatar>
        <AvatarImage
          src="https://github.com/akkaldhami.png"
          alt="@akkaldhami"
        />
        <AvatarFallback>AD</AvatarFallback>
        <AvatarBadge
          style={
            {
              "--np-avatar-badge-color": "var(--np-success)",
            } as CSSProperties
          }
        />
      </Avatar>

      <AvatarGroup>
        <Avatar>
          <AvatarImage src="https://github.com/him-csit.png" alt="@him-csit" />
          <AvatarFallback>HS</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage
            src="https://github.com/sabin-gtm.png"
            alt="@sabin-gtm"
          />
          <AvatarFallback>MB</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}
