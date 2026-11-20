"use client"

import { useEffect, useState } from "react"

import { Button } from "@/registry/react/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/react/command"

export default function CommandScrollable() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "j" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem>
                Home
                <CommandShortcut>⌘H</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Inbox
                <CommandShortcut>⌘I</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Documents
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Calendar
                <CommandShortcut>⌘C</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Reports
                <CommandShortcut>⌘R</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem>New file</CommandItem>
              <CommandItem>New folder</CommandItem>
              <CommandItem>Upload files</CommandItem>
              <CommandItem>Share</CommandItem>
              <CommandItem>Export as PDF</CommandItem>
              <CommandItem>Duplicate</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Billing
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Notifications
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Appearance
                <CommandShortcut>⌘A</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Keyboard shortcuts
                <CommandShortcut>⌘K</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
