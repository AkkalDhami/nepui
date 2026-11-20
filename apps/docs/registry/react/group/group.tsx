"use client"

import type * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./group.css"

const groupVariants = cva("np-group", {
  variants: {
    orientation: {
      horizontal: "",
      vertical: "np-group-vertical",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

function Group({
  className,
  orientation = "horizontal",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: VariantProps<typeof groupVariants>["orientation"]
}) {
  return (
    <div
      role="group"
      data-slot="group"
      data-orientation={orientation}
      className={cn(groupVariants({ orientation }), className)}
      {...props}
    >
      {children}
    </div>
  )
}

function GroupText({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("np-group-text", className),
    "data-slot": "group-text",
  }

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  })
}

function GroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      data-slot="group-separator"
      data-orientation={orientation}
      className={cn(
        "np-group-separator",
        orientation === "horizontal" && "np-group-separator-horizontal",
        className
      )}
      {...props}
    />
  )
}

export {
  Group,
  GroupText,
  GroupSeparator,
  Group as ButtonGroup,
  GroupText as ButtonGroupText,
  GroupSeparator as ButtonGroupSeparator,
  groupVariants,
}
