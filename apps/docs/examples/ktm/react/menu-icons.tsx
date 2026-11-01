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
import {
  CreditCardIcon,
  GearIcon,
  SignOutIcon,
  UserIcon,
} from "@phosphor-icons/react/ssr"

export default function MenuIcons() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open</MenuTrigger>
      <MenuContent style={{ width: "12rem" }}>
        <MenuGroup>
          <MenuItem>
            <UserIcon />
            Profile
          </MenuItem>
          <MenuItem>
            <CreditCardIcon />
            Billing
          </MenuItem>
          <MenuItem>
            <GearIcon />
            Settings
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem>
          <SignOutIcon />
          Log out
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
