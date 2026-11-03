"use client"

import type { ComponentProps } from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./marker.css"

const markerVariants = cva("np-marker", {
  variants: {
    variant: {
      default: "",
      border: "np-marker-border",
      separator: "np-marker-separator",
    },
    orientation: {
      horizontal: "",
      vertical: "np-marker-vertical",
    },
  },
  defaultVariants: { variant: "default", orientation: "horizontal" },
})

function Marker({
  className,
  variant = "default",
  orientation = "horizontal",
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  variant?: NonNullable<VariantProps<typeof markerVariants>["variant"]>
  orientation?: NonNullable<VariantProps<typeof markerVariants>["orientation"]>
}) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      { className: cn(markerVariants({ variant, orientation }), className) },
      props
    ),
    render,
    state: { slot: "marker", variant, orientation },
  })
}

function MarkerIcon({
  className,
  spin = false,
  ...props
}: ComponentProps<"span"> & {
  spin?: boolean
}) {
  return (
    <span
      data-slot="marker-icon"
      data-spin={spin ? "" : undefined}
      aria-hidden="true"
      className={cn("np-marker-icon", spin && "np-marker-spin", className)}
      {...props}
    />
  )
}

function MarkerContent({
  className,
  shimmer = false,
  ...props
}: ComponentProps<"span"> & {
  shimmer?: boolean
}) {
  return (
    <span
      data-slot="marker-content"
      data-shimmer={shimmer ? "" : undefined}
      className={cn(
        "np-marker-content",
        shimmer && "np-marker-shimmer",
        className
      )}
      {...props}
    />
  )
}

export { Marker, MarkerContent, MarkerIcon, markerVariants }
