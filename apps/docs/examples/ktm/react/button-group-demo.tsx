"use client"

import { Button } from "@/registry/react/button"
import { ButtonGroup } from "@/registry/react/button-group"
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/react/menu"
import { ArrowLeftIcon, CaretUpIcon } from "@phosphor-icons/react"

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
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="outline">Snooze</Button>
        <Menu>
          <MenuTrigger
            render={
              <Button variant="outline" size="icon" aria-label="More options">
                <CaretUpIcon />
              </Button>
            }
          />
          <MenuContent align="end">
            <MenuItem>Mark as read</MenuItem>
            <MenuItem>Archive</MenuItem>
            <MenuSeparator />
            <MenuItem variant="destructive">Delete</MenuItem>
          </MenuContent>
        </Menu>
      </ButtonGroup>
    </ButtonGroup>
  )
}
