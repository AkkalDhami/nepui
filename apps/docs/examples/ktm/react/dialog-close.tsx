"use client"

import { Button } from "@/registry/react/button"
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
import { Input } from "@/registry/react/input"

export default function DialogCloseDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Share</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <Input
          aria-label="Link"
          defaultValue="https://nepui.vercel.app/docs"
          readOnly
        />
        <DialogFooter style={{ justifyContent: "flex-start" }}>
          <DialogClose render={<Button />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
