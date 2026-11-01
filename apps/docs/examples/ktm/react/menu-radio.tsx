"use client"

import { useState } from "react"

import { Button } from "@/registry/react/button"
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/react/menu"

export default function MenuRadio() {
  const [position, setPosition] = useState("bottom")

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open</MenuTrigger>
      <MenuContent style={{ width: "12rem" }}>
        <MenuGroup>
          <MenuLabel>Panel Position</MenuLabel>
          <MenuSeparator />
          <MenuRadioGroup value={position} onValueChange={setPosition}>
            <MenuRadioItem value="top">Top</MenuRadioItem>
            <MenuRadioItem value="bottom">Bottom</MenuRadioItem>
            <MenuRadioItem value="right">Right</MenuRadioItem>
          </MenuRadioGroup>
        </MenuGroup>
      </MenuContent>
    </Menu>
  )
}
