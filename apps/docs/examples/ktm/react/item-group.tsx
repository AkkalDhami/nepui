"use client"

import { PlusIcon } from "@phosphor-icons/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/registry/react/avatar"
import { Button } from "@/registry/react/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/registry/react/item"
import Link from "next/link"

export default function ItemGroupDemo() {
  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <ItemGroup>
        <Item>
          <ItemMedia>
            <Avatar>
              <AvatarImage
                src="https://github.com/akkaldhami.png"
                alt="akkaldhami"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Akkal Dhami</ItemTitle>
            <ItemDescription>
              <Link
                href="https://akkal.com.np"
                target="_blank"
                rel="noopener noreferrer"
              >
                akkal.com.np
              </Link>
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="icon-sm" aria-label="Add akkaldhami">
              <PlusIcon />
            </Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemMedia>
            <Avatar>
              <AvatarImage
                src="https://github.com/pratapchaulagain.png"
                alt="pratapchaulagain"
              />
              <AvatarFallback>PC</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Pratap Chaulagain</ItemTitle>
            <ItemDescription>
              <Link
                href="https://pratapchaulagain.com.np"
                target="_blank"
                rel="noopener noreferrer"
              >
                pratapchaulagain.com.np
              </Link>
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Add pratapchaulagain"
            >
              <PlusIcon />
            </Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemMedia>
            <Avatar>
              <AvatarImage
                src="https://github.com/manisbhusal.png"
                alt="manisbhusal"
              />
              <AvatarFallback>MB</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Manis Bhusal</ItemTitle>
            <ItemDescription>
              <Link
                href="https://github.com/manisbhusal"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/manisbhusal
              </Link>
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="icon-sm" aria-label="Add manisbhusal">
              <PlusIcon />
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  )
}
