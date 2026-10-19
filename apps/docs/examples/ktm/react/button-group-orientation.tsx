"use client"

import { MinusIcon, PlusIcon } from "@phosphor-icons/react"
import { Button } from "@/registry/react/button"
import { ButtonGroup } from "@/registry/react/button-group"

export default function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      className="h-fit"
    >
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}
