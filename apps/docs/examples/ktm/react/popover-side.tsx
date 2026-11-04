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

export default function PopoverSide() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          Top
        </PopoverTrigger>
        <PopoverContent side="top" style={{ width: "10rem" }}>
          <PopoverHeader>
            <PopoverTitle>Top</PopoverTitle>
            <PopoverDescription>Opens above the trigger.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          Right
        </PopoverTrigger>
        <PopoverContent side="right" style={{ width: "10rem" }}>
          <PopoverHeader>
            <PopoverTitle>Right</PopoverTitle>
            <PopoverDescription>Opens to the right.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          Bottom
        </PopoverTrigger>
        <PopoverContent side="bottom" style={{ width: "10rem" }}>
          <PopoverHeader>
            <PopoverTitle>Bottom</PopoverTitle>
            <PopoverDescription>Opens below the trigger.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          Left
        </PopoverTrigger>
        <PopoverContent side="left" style={{ width: "10rem" }}>
          <PopoverHeader>
            <PopoverTitle>Left</PopoverTitle>
            <PopoverDescription>Opens to the left.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  )
}
