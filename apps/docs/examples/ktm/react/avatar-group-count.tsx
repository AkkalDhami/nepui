"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/registry/react/avatar"

export default function AvatarGroupCountDemo() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarImage
          src="https://github.com/akkaldhami.png"
          alt="@akkkaldhami"
        />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage
          src="https://github.com/pratapchaulagain.png"
          alt="@pratapchaulagain"
        />
        <AvatarFallback>PC</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  )
}
