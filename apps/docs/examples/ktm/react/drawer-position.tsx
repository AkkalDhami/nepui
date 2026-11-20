"use client"

import { Button } from "@/registry/react/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/react/drawer"

const SIDES = [
  { side: "Top", swipeDirection: "up" },
  { side: "Right", swipeDirection: "right" },
  { side: "Bottom", swipeDirection: "down" },
  { side: "Left", swipeDirection: "left" },
] as const

export default function DrawerPositionDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      {SIDES.map(({ side, swipeDirection }) => (
        <Drawer key={side} swipeDirection={swipeDirection}>
          <DrawerTrigger render={<Button variant="outline" />}>
            {side}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose render={<Button />}>Submit</DrawerClose>
              <DrawerClose render={<Button variant="outline" />}>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}
