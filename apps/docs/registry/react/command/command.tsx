"use client"

import type { ComponentProps, ReactNode } from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { Command as CommandPrimitive } from "cmdk"
import { cn } from "cn"

import { InputGroup, InputGroupAddon } from "@/registry/react/input-group"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./command.css"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

function Command({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn("np-command", className)}
      {...props}
    />
  )
}

type CommandDialogProps = Omit<DialogPrimitive.Root.Props, "children"> & {
  title?: string
  description?: string
  className?: string
  children: ReactNode
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  className,
  children,
  ...props
}: CommandDialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="np-command-dialog-backdrop" />
        <DialogPrimitive.Popup
          data-slot="command-dialog"
          className={cn("np-command-dialog", className)}
        >
          <DialogPrimitive.Title className="np-command-sr-only">
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="np-command-sr-only">
            {description}
          </DialogPrimitive.Description>
          {children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

function CommandInput({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="np-command-input-wrapper">
      <InputGroup>
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn("np-command-input", className)}
          {...props}
        />
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function CommandList({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn("np-command-list", className)}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("np-command-empty", className)}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn("np-command-group", className)}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("np-command-separator", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn("np-command-item", className)}
      {...props}
    />
  )
}

function CommandShortcut({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn("np-command-shortcut", className)}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}
