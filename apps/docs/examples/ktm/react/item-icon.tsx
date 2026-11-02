"use client"

import { ShieldWarningIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/react/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/registry/react/item"

export default function ItemIcon() {
  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <ShieldWarningIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Security Alert</ItemTitle>
          <ItemDescription>
            New login detected from unknown device.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Review
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
