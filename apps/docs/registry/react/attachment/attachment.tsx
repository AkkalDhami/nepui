"use client"

import type { ComponentProps, CSSProperties } from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Button } from "@/registry/react/button"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./attachment.css"

const attachmentVariants = cva("np-attachment", {
  variants: {
    state: {
      idle: "np-attachment-idle",
      uploading: "np-attachment-uploading",
      processing: "np-attachment-processing",
      error: "np-attachment-error",
      done: "",
    },
    size: {
      default: "",
      sm: "np-attachment-sm",
      xs: "np-attachment-xs",
    },
    orientation: {
      horizontal: "",
      vertical: "np-attachment-vertical",
    },
  },
  defaultVariants: {
    state: "done",
    size: "default",
    orientation: "horizontal",
  },
})

type AttachmentProps = ComponentProps<"div"> &
  VariantProps<typeof attachmentVariants> & {
    progress?: number
  }

function Attachment({
  className,
  state = "done",
  size = "default",
  orientation = "horizontal",
  progress,
  style,
  ...props
}: AttachmentProps) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={size}
      data-orientation={orientation}
      className={cn(
        attachmentVariants({ state, size, orientation }),
        className
      )}
      style={
        progress === undefined
          ? style
          : ({
              "--np-attachment-progress": `${Math.min(100, Math.max(0, progress))}%`,
              ...style,
            } as CSSProperties)
      }
      {...props}
    />
  )
}

const attachmentMediaVariants = cva("np-attachment-media", {
  variants: {
    variant: {
      icon: "",
      image: "np-attachment-media-image",
    },
  },
  defaultVariants: {
    variant: "icon",
  },
})

type AttachmentMediaProps = ComponentProps<"div"> &
  VariantProps<typeof attachmentMediaVariants>

function AttachmentMedia({
  className,
  variant = "icon",
  ...props
}: AttachmentMediaProps) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(attachmentMediaVariants({ variant }), className)}
      {...props}
    />
  )
}

function AttachmentContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-content"
      className={cn("np-attachment-content", className)}
      {...props}
    />
  )
}

function AttachmentTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-title"
      className={cn("np-attachment-title", className)}
      {...props}
    />
  )
}

function AttachmentDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-description"
      className={cn("np-attachment-description", className)}
      {...props}
    />
  )
}

function AttachmentActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-actions"
      className={cn("np-attachment-actions", className)}
      {...props}
    />
  )
}

function AttachmentAction({
  className,
  variant = "ghost",
  size = "icon-xs",
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="attachment-action"
      variant={variant}
      size={size}
      className={cn("np-attachment-action", className)}
      {...props}
    />
  )
}

function AttachmentTrigger({
  className,
  render,
  ...props
}: useRender.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      { type: "button", className: cn("np-attachment-trigger", className) },
      props
    ),
    render,
    state: {
      slot: "attachment-trigger",
    },
  })
}

function AttachmentGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-group"
      className={cn("np-attachment-group", className)}
      {...props}
    />
  )
}

export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
  attachmentMediaVariants,
  attachmentVariants,
}
