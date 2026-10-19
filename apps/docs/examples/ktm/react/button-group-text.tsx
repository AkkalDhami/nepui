"use client"

import { Input } from "@/registry/react/input"
import { ButtonGroup, ButtonGroupText } from "@/registry/react/button-group"

export default function ButtonGroupTextDemo() {
  return (
    <ButtonGroup style={{ width: "100%", maxWidth: "24rem" }}>
      <ButtonGroupText>https://</ButtonGroupText>
      <Input placeholder="example" aria-label="Domain name" />
      <ButtonGroupText>.com</ButtonGroupText>
    </ButtonGroup>
  )
}
