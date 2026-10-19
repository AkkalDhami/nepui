"use client"

import { Button } from "@/registry/react/button"
import { ButtonGroup } from "@/registry/react/button-group"
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react/ssr"

export default function ButtonGroupIcon() {
  return (
    <ButtonGroup aria-label="Text alignment">
      <Button variant="outline" size="icon" aria-label="Align left">
        <TextAlignLeftIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Align center">
        <TextAlignCenterIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Align right">
        <TextAlignRightIcon />
      </Button>
    </ButtonGroup>
  )
}
