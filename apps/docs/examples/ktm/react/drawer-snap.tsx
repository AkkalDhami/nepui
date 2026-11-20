"use client"

import { useState } from "react"
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

export default function DrawerSnapDemo() {
  const snapPoints = ["300px", 1] as const
  const [snapPoint, setSnapPoint] = useState<
    (typeof snapPoints)[number] | null
  >(snapPoints[0])

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <Drawer
        onSnapPointChange={(point) =>
          setSnapPoint(point as (typeof snapPoints)[number] | null)
        }
        snapPoint={snapPoint}
        snapPoints={[...snapPoints]}
        snapToSequentialPoints
        showSwipeHandle
      >
        <DrawerTrigger render={<Button variant="outline" />}>
          Open Drawer
        </DrawerTrigger>
        <DrawerContent
          style={{ "--np-drawer-height": "60dvh" } as React.CSSProperties}
        >
          <DrawerHeader>
            <DrawerTitle>Snap Points</DrawerTitle>
            <DrawerDescription>
              Drag the drawer to snap between a compact peek and full-height
              view.
            </DrawerDescription>
          </DrawerHeader>

          <div
            role="region"
            aria-label="Terms"
            tabIndex={0}
            style={{
              flex: "1 1 0",
              minHeight: 0,
              overflowY: "auto",
              paddingInline: "1rem",
            }}
          >
            {Array.from({ length: 48 }, (_, i) => `box-${i}`).map((key) => (
              <div
                className="h-12 shrink-0 rounded-xl border bg-muted"
                key={key}
              />
            ))}
          </div>

          <DrawerFooter>
            <DrawerClose render={<Button />}>Submit</DrawerClose>
            <DrawerClose render={<Button variant="outline" />}>
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
