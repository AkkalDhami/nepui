"use client"

import { Button } from "@/registry/react/button"
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@/registry/react/menu"

export default function MenuSubmenu() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open</MenuTrigger>
      <MenuContent style={{ width: "12rem" }}>
        <MenuGroup>
          <MenuItem>Team</MenuItem>
          <MenuSub>
            <MenuSubTrigger>Invite users</MenuSubTrigger>
            <MenuSubContent>
              <MenuGroup>
                <MenuItem>Email</MenuItem>
                <MenuItem>Message</MenuItem>
                <MenuItem>More...</MenuItem>
              </MenuGroup>
            </MenuSubContent>
          </MenuSub>
          <MenuItem>New Team</MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  )
}
