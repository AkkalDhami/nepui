"use client"

import { PlusIcon } from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/registry/react/avatar"
import { Button } from "@/registry/react/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/registry/react/item"

export default function ItemAvatar() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "28rem",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Item variant="outline">
        <ItemMedia>
          <Avatar size="lg">
            <AvatarImage
              src="https://github.com/akkaldhami.png"
              alt="@akkkaldhami"
            />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Akkal Dhami</ItemTitle>
          <ItemDescription>Last seen 5 months ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="icon-sm" aria-label="Invite">
            <PlusIcon />
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia>
          <AvatarGroup>
            <Avatar>
              <AvatarImage
                src="https://github.com/akkaldhami.png"
                alt="@akkaldhami"
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
              <AvatarImage
                src="https://github.com/manisbhusal.png"
                alt="@manishbhusal"
              />
              <AvatarFallback>MB</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>No Team Members</ItemTitle>
          <ItemDescription>
            Invite your team to collaborate on this project.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Invite
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
