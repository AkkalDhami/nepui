"use client"

import { ButtonGroup, ButtonGroupText } from "@/registry/react/button-group"
import { Input } from "@/registry/react/input"
import { Kbd, KbdGroup } from "@/registry/react/kbd"

export default function KbdInput() {
  return (
    <ButtonGroup style={{ width: "100%", maxWidth: "20rem" }}>
      <Input type="search" placeholder="Search..." aria-label="Search" />
      <ButtonGroupText>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </ButtonGroupText>
    </ButtonGroup>
  )
}
