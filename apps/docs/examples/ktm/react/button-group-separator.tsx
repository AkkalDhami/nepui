"use client"

import { Button } from "@/registry/react/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/registry/react/button-group"

export default function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">Paste</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">Cut</Button>
    </ButtonGroup>
  )
}
