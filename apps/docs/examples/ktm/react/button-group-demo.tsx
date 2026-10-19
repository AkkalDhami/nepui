"use client"

import { Button } from "@/registry/react/button"
import { ButtonGroup } from "@/registry/react/button-group"
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react"

export default function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Go Back">
          <ArrowLeftIcon />
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Report</Button>
        <Button variant="outline">Snooze</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Go Back">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
