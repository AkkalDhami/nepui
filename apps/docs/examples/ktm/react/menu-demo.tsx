"use client"

import { Button } from "@/registry/react/button"
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/react/menu"

export default function MenuDemo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open</MenuTrigger>
      <MenuContent style={{ width: "12rem" }}>
        <MenuGroup>
          <MenuLabel>My Account</MenuLabel>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Billing</MenuItem>
          <MenuItem>Settings</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem>Log out</MenuItem>
      </MenuContent>
    </Menu>
  )
}
