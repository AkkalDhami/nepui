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

export default function DrawerNestedDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open Drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Parent drawer</DrawerTitle>
          <DrawerDescription>
            Open another drawer from inside this one.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Drawer>
            <DrawerTrigger render={<Button />}>
              Open nested drawer
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Nested drawer</DrawerTitle>
                <DrawerDescription>
                  This one sits on top of the first.
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
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
