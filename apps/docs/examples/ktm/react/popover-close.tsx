"use client"

import { XIcon } from "@phosphor-icons/react"
import { Button } from "@/registry/react/button"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/react/popover"

export default function PopoverCloseDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open Popover
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverClose
          aria-label="Close"
          style={{
            position: "absolute",
            top: "0.5rem",
            insetInlineEnd: "0.5rem",
          }}
          render={<Button size="icon-sm" variant="ghost" />}
        >
          <XIcon />
        </PopoverClose>
        <div className="mb-2">
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>
            You are all caught up. Good job!
          </PopoverDescription>
        </div>
        <PopoverClose render={<Button variant="outline" size={"sm"} />}>
          Close
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
