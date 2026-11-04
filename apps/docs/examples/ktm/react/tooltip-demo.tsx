"use client"

import {
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/react/tooltip"
import { ToggleGroup, ToggleGroupItem } from "@/registry/react/toggle-group"

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <ToggleGroup defaultValue={["bold"]} multiple>
        <Tooltip>
          <TooltipTrigger
            render={<ToggleGroupItem aria-label="Toggle bold" value="bold" />}
          >
            <TextBIcon />
          </TooltipTrigger>
          <TooltipContent>Bold</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <ToggleGroupItem aria-label="Toggle italic" value="italic" />
            }
          >
            <TextItalicIcon />
          </TooltipTrigger>
          <TooltipContent>Italic</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <ToggleGroupItem
                aria-label="Toggle underline"
                value="underline"
              />
            }
          >
            <TextUnderlineIcon />
          </TooltipTrigger>
          <TooltipContent>Underline</TooltipContent>
        </Tooltip>
      </ToggleGroup>
    </TooltipProvider>
  )
}
