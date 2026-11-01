"use client"

import { useState } from "react"

import { Button } from "@/registry/react/button"
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/react/menu"

export default function MenuCheckboxes() {
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showActivityBar, setShowActivityBar] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open</MenuTrigger>
      <MenuContent style={{ width: "14rem" }}>
        <MenuGroup>
          <MenuLabel>Appearance</MenuLabel>
          <MenuSeparator />
          <MenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </MenuCheckboxItem>
          <MenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
            disabled
          >
            Activity Bar
          </MenuCheckboxItem>
          <MenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
            Panel
          </MenuCheckboxItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  )
}
