"use client"

import { Button } from "@/registry/react/button"
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/react/menu"
import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react"

export default function MenuDestructive() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Actions</MenuTrigger>
      <MenuContent style={{ width: "12rem" }}>
        <MenuGroup>
          <MenuItem>
            <PencilSimpleIcon />
            Edit
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuItem variant="destructive">
            <TrashIcon />
            Delete
          </MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  )
}
