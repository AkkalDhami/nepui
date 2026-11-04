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
import { Field, FieldGroup, FieldLabel } from "@/registry/react/field"
import { Input } from "@/registry/react/input"

export default function DialogFormDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Edit Profile
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name-1">Name</FieldLabel>
            <Input id="name-1" name="name" defaultValue="Lakka Imahd" />
          </Field>
          <Field>
            <FieldLabel htmlFor="username-1">Username</FieldLabel>
            <Input id="username-1" name="username" defaultValue="@lakka" />
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
  )
}
