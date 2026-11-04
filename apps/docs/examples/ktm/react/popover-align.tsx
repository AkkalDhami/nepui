"use client"

import { Button } from "@/registry/react/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/react/popover"

export default function PopoverAlign() {
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          Start
        </PopoverTrigger>
        <PopoverContent align="start" style={{ width: "10rem" }}>
          <PopoverHeader>
            <PopoverTitle>Aligned to start</PopoverTitle>
            <PopoverDescription>
              Its left edge lines up with the trigger.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          Center
        </PopoverTrigger>
        <PopoverContent align="center" style={{ width: "10rem" }}>
          <PopoverHeader>
            <PopoverTitle>Aligned to center</PopoverTitle>
            <PopoverDescription>
              It is centered on the trigger.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          End
        </PopoverTrigger>
        <PopoverContent align="end" style={{ width: "10rem" }}>
          <PopoverHeader>
            <PopoverTitle>Aligned to end</PopoverTitle>
            <PopoverDescription>
              Its right edge lines up with the trigger.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  )
}
