"use client"

import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Button } from "@/registry/react/button"
import { Input } from "@/registry/react/input"
import { Textarea } from "@/registry/react/textarea"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./input-group.css"

function InputGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn("np-input-group", className)}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva("np-input-group-addon", {
  variants: {
    align: {
      "inline-start": "",
      "inline-end": "np-input-group-addon-end",
      "block-start": "np-input-group-addon-block-start",
      "block-end": "np-input-group-addon-block-end",
    },
  },
  defaultVariants: {
    align: "inline-start",
  },
})

function InputGroupAddon({
  className,
  align = "inline-start",
  onClick,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if ((event.target as HTMLElement).closest("button")) {
          return
        }
        event.currentTarget.parentElement
          ?.querySelector<HTMLElement>("input, textarea")
          ?.focus()
      }}
      {...props}
    />
  )
}

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<ComponentProps<typeof Button>, "size" | "type"> & {
  size?: "xs" | "sm" | "icon-xs" | "icon-sm"
  type?: "button" | "submit" | "reset"
}) {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      className={cn("np-input-group-button", className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn("np-input-group-text", className)}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn("np-input-group-input", className)}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn("np-input-group-textarea", className)}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
  inputGroupAddonVariants,
}
