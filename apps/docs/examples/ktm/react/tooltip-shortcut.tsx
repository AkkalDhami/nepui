"use client"

import { FloppyDiskIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/react/button"
import { Kbd } from "@/registry/react/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/react/tooltip"

export default function TooltipShortcutDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={<Button variant="outline" size="icon-sm" aria-label="Save" />}
        >
          <FloppyDiskIcon />
        </TooltipTrigger>
        <TooltipContent>
          Save Changes <Kbd>S</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
