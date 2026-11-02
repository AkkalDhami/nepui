"use client"

import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./empty.css"

const emptyVariants = cva("np-empty", {
  variants: {
    appearance: {
      default: "",
      outline: "np-empty-outline",
    },
  },
  defaultVariants: { appearance: "default" },
})

const emptyMediaVariants = cva("np-empty-media", {
  variants: {
    variant: {
      default: "",
      icon: "np-empty-media-icon",
    },
  },
  defaultVariants: { variant: "default" },
})

function Empty({
  className,
  appearance = "default",
  ...props
}: ComponentProps<"div"> & {
  appearance?: NonNullable<VariantProps<typeof emptyVariants>["appearance"]>
}) {
  return (
    <div
      data-slot="empty"
      data-appearance={appearance}
      className={cn(emptyVariants({ appearance }), className)}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("np-empty-header", className)}
      {...props}
    />
  )
}

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: ComponentProps<"div"> & {
  variant?: NonNullable<VariantProps<typeof emptyMediaVariants>["variant"]>
}) {
  return (
    <div
      data-slot="empty-media"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant }), className)}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("np-empty-title", className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn("np-empty-description", className)}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn("np-empty-content", className)}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  emptyMediaVariants,
  emptyVariants,
}
