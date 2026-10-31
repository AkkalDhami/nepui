"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/registry/react/avatar"

export default function AvatarSizes() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Avatar size="sm">
        <AvatarImage
          src="https://github.com/akkaldhami.png"
          alt="@akkkaldhami"
        />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage
          src="https://github.com/akkaldhami.png"
          alt="@akkkaldhami"
        />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>

      <Avatar size="lg">
        <AvatarImage
          src="https://github.com/akkaldhami.png"
          alt="@akkkaldhami"
        />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
    </div>
  )
}
