"use client"

import { Button } from "@/registry/react/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/react/tooltip"

export default function TooltipSideDemo() {
  return (
    <TooltipProvider>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "2.5rem 7rem",
        }}
      >
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Left
          </TooltipTrigger>
          <TooltipContent side="left">Add to library</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Top
          </TooltipTrigger>
          <TooltipContent side="top">Add to library</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Bottom
          </TooltipTrigger>
          <TooltipContent side="bottom">Add to library</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Right
          </TooltipTrigger>
          <TooltipContent side="right">Add to library</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
