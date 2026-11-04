"use client"

import { Button } from "@/registry/react/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/react/tooltip"

export default function TooltipDisabledDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <span
              style={{ display: "inline-block", width: "fit-content" }}
              tabIndex={0}
            />
          }
        >
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </TooltipTrigger>
        <TooltipContent>This feature is currently unavailable</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
