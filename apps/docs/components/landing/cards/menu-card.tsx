"use client"

import { useState } from "react"

import { Button } from "@/registry/react/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/card"
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@/registry/react/menu"

export function MenuCard() {
  const [statusBar, setStatusBar] = useState(true)
  const [density, setDensity] = useState("comfortable")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu</CardTitle>
        <CardDescription>
          Keyboard friendly. Opens upward when there is no room below.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Menu>
          <MenuTrigger render={<Button variant="outline" />}>Edit</MenuTrigger>
          <MenuContent>
            <MenuItem>
              Undo
              <MenuShortcut>Ctrl+Z</MenuShortcut>
            </MenuItem>
            <MenuItem>
              Redo
              <MenuShortcut>Ctrl+Shift+Z</MenuShortcut>
            </MenuItem>
            <MenuSeparator />
            <MenuSub>
              <MenuSubTrigger>Find</MenuSubTrigger>
              <MenuSubContent>
                <MenuItem>Find…</MenuItem>
                <MenuItem>Find next</MenuItem>
              </MenuSubContent>
            </MenuSub>
          </MenuContent>
        </Menu>

        <Menu>
          <MenuTrigger render={<Button variant="outline" />}>View</MenuTrigger>
          <MenuContent>
            <MenuGroup>
              <MenuLabel>Appearance</MenuLabel>
              <MenuCheckboxItem
                checked={statusBar}
                onCheckedChange={setStatusBar}
              >
                Status bar
              </MenuCheckboxItem>
            </MenuGroup>
            <MenuSeparator />
            <MenuGroup>
              <MenuLabel>Density</MenuLabel>
              <MenuRadioGroup value={density} onValueChange={setDensity}>
                <MenuRadioItem value="comfortable">Comfortable</MenuRadioItem>
                <MenuRadioItem value="compact">Compact</MenuRadioItem>
              </MenuRadioGroup>
            </MenuGroup>
          </MenuContent>
        </Menu>
      </CardContent>
    </Card>
  )
}
