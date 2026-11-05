"use client"

import { Button } from "@/registry/react/button"
import { Input } from "@/registry/react/input"
import { Label } from "@/registry/react/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/react/sheet"

const SIDES = ["top", "right", "bottom", "left"] as const

export default function SheetSideDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      {SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline" />}>
            {side}
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you are done.
              </SheetDescription>
            </SheetHeader>
            <div
              style={{ display: "grid", gap: "1rem", paddingInline: "1rem" }}
            >
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <Label htmlFor={`sheet-side-${side}-name`}>Name</Label>
                <Input
                  id={`sheet-side-${side}-name`}
                  defaultValue="Lakka Imahd"
                />
              </div>

              <div style={{ display: "grid", gap: "0.5rem" }}>
                <Label htmlFor={`sheet-side-${side}-username`}>Username</Label>
                <Input
                  id={`sheet-side-${side}-username`}
                  defaultValue="@lakka"
                />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose render={<Button variant="outline" />}>
                Close
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
