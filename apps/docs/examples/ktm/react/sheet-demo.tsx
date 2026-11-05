"use client"

import { Button } from "@/registry/react/button"
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
import { Input } from "@/registry/react/input"
import { Label } from "@/registry/react/label"

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <div style={{ display: "grid", gap: "1rem", paddingInline: "1rem" }}>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <Label htmlFor="sheet-form-name">Name</Label>
            <Input id="sheet-form-name" defaultValue="Lakka Imahd" />
          </div>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <Label htmlFor="sheet-form-username">Username</Label>
            <Input id="sheet-form-username" defaultValue="@lakka" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
