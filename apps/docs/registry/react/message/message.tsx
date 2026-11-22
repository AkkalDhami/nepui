"use client"

import type { ComponentProps } from "react"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./message.css"

type MessageProps = ComponentProps<"div"> & {
  align?: "start" | "end"
}

function Message({ className, align = "start", ...props }: MessageProps) {
  return (
    <div
      data-slot="message"
      data-align={align}
      className={cn(
        "np-message",
        align === "end" && "np-message-end",
        className
      )}
      {...props}
    />
  )
}

function MessageGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="message-group"
      className={cn("np-message-group", className)}
      {...props}
    />
  )
}

function MessageAvatar({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="message-avatar"
      className={cn("np-message-avatar", className)}
      {...props}
    />
  )
}

function MessageContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="message-content"
      className={cn("np-message-content", className)}
      {...props}
    />
  )
}

function MessageHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="message-header"
      className={cn("np-message-header", className)}
      {...props}
    />
  )
}

function MessageFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="message-footer"
      className={cn("np-message-footer", className)}
      {...props}
    />
  )
}

export {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
}
