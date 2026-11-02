"use client"

import { ArrowSquareOutIcon, CaretRightIcon } from "@phosphor-icons/react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/registry/react/item"

export default function ItemLink() {
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
      <Item render={<a href="#" />}>
        <ItemContent>
          <ItemTitle>Visit our documentation</ItemTitle>
          <ItemDescription>
            Learn how to get started with our components.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <CaretRightIcon />
        </ItemActions>
      </Item>
      <Item
        variant="outline"
        render={<a href="#" target="_blank" rel="noopener noreferrer" />}
      >
        <ItemContent>
          <ItemTitle>External resource</ItemTitle>
          <ItemDescription>
            Opens in a new tab with security attributes.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <ArrowSquareOutIcon />
        </ItemActions>
      </Item>
    </div>
  )
}
