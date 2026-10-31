"use client"

import { PlusIcon } from "@phosphor-icons/react/ssr"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/registry/react/avatar"

export default function AvatarBadgeIcon() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/akkaldhami.png" alt="@akkkaldhami" />
      <AvatarFallback>AD</AvatarFallback>
      <AvatarBadge>
        <PlusIcon />
      </AvatarBadge>
    </Avatar>
  )
}
