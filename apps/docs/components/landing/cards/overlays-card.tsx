import { Button } from "@/registry/react/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/card"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/registry/react/context-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/react/dialog"
import { Field, FieldGroup, FieldLabel } from "@/registry/react/field"
import { Input } from "@/registry/react/input"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/react/drawer"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/react/popover"
import { Kbd, KbdGroup } from "@/registry/react/kbd"
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
import { Label } from "@/components/ui/label"

export function OverlaysCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overlays</CardTitle>
        <CardDescription>
          Dialog, sheet, drawer, popover and context menu.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Dialog
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you are
                  done.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name-1">Name</FieldLabel>
                  <Input id="name-1" name="name" defaultValue="Lakka Imahd" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="username-1">Username</FieldLabel>
                  <Input
                    id="username-1"
                    name="username"
                    defaultValue="@lakka"
                  />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>
                  Cancel
                </DialogClose>
                <DialogClose render={<Button />}>Save changes</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              Sheet
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you are
                  done.
                </SheetDescription>
              </SheetHeader>
              <div
                style={{ display: "grid", gap: "1rem", paddingInline: "1rem" }}
              >
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
                <SheetClose render={<Button variant="outline" />}>
                  Close
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Drawer showSwipeHandle>
            <DrawerTrigger render={<Button variant="outline" />}>
              Drawer
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Quick actions</DrawerTitle>
                <DrawerDescription>Swipe down to close.</DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>

          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              Popover
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Dimensions</PopoverTitle>
                <PopoverDescription>
                  Set the dimensions for the layer.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </div>

        <ContextMenu>
          <ContextMenuTrigger
            className="flex h-24 items-center justify-center rounded-xl border border-dashed text-sm"
            style={{
              borderColor: "var(--np-border)",
              color: "var(--np-muted-foreground)",
            }}
          >
            Right-click here
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              style={{
                justifyContent: "space-between",
              }}
            >
              Copy{" "}
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>c</Kbd>
              </KbdGroup>
            </ContextMenuItem>
            <ContextMenuItem
              style={{
                justifyContent: "space-between",
              }}
            >
              Paste
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>v</Kbd>
              </KbdGroup>
            </ContextMenuItem>
            <ContextMenuItem
              style={{
                justifyContent: "space-between",
              }}
            >
              Inspect <Kbd>f12</Kbd>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </CardContent>
    </Card>
  )
}
