"use client"

import { TrayIcon } from "@phosphor-icons/react"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/registry/react/item"

export default function ItemSize() {
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
        <ItemMedia variant="icon">
          <TrayIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default Size</ItemTitle>
          <ItemDescription>
            The standard size for most use cases.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia variant="icon">
          <TrayIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Small Size</ItemTitle>
          <ItemDescription>A compact size for dense layouts.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs">
        <ItemMedia variant="icon">
          <TrayIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Extra Small Size</ItemTitle>
          <ItemDescription>The most compact size available.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}
