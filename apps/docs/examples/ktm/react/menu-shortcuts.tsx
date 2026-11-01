"use client"

import { Button } from "@/registry/react/button"
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "@/registry/react/menu"

export default function MenuShortcuts() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open</MenuTrigger>
      <MenuContent style={{ width: "14rem" }}>
        <MenuGroup>
          <MenuLabel>My Account</MenuLabel>
          <MenuItem>
            Profile
            <MenuShortcut>⇧⌘P</MenuShortcut>
          </MenuItem>
          <MenuItem>
            Billing
            <MenuShortcut>⌘B</MenuShortcut>
          </MenuItem>
          <MenuItem>
            Settings
            <MenuShortcut>⌘S</MenuShortcut>
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem>
          Log out
          <MenuShortcut>⇧⌘Q</MenuShortcut>
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
