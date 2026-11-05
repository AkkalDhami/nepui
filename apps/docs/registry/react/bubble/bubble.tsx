"use client"

import type { ComponentProps } from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./bubble.css"

const bubbleVariants = cva("np-bubble", {
  variants: {
    variant: {
      default: "",
      secondary: "np-bubble-secondary",
      muted: "np-bubble-muted",
      tinted: "np-bubble-tinted",
      outline: "np-bubble-outline",
      ghost: "np-bubble-ghost",
      destructive: "np-bubble-destructive",
    },
    align: {
      start: "",
      end: "np-bubble-end",
    },
  },
  defaultVariants: {
    variant: "default",
    align: "start",
  },
})

type BubbleProps = ComponentProps<"div"> & VariantProps<typeof bubbleVariants>

function Bubble({
  className,
  variant = "default",
  align = "start",
  ...props
}: BubbleProps) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant, align }), className)}
      {...props}
    />
  )
}

function BubbleContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      { className: cn("np-bubble-content", className) },
      props
    ),
    render,
    state: {
      slot: "bubble-content",
    },
  })
}

type BubbleReactionsProps = ComponentProps<"div"> & {
  side?: "top" | "bottom"
  align?: "start" | "end"
}

function BubbleReactions({
  className,
  side = "bottom",
  align = "end",
  ...props
}: BubbleReactionsProps) {
  return (
    <div
      data-slot="bubble-reactions"
      data-side={side}
      data-align={align}
      className={cn(
        "np-bubble-reactions",
        side === "top" && "np-bubble-reactions-top",
        align === "start" && "np-bubble-reactions-start",
        className
      )}
      {...props}
    />
  )
}

function BubbleGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("np-bubble-group", className)}
      {...props}
    />
  )
}

export { Bubble, BubbleContent, BubbleGroup, BubbleReactions, bubbleVariants }
