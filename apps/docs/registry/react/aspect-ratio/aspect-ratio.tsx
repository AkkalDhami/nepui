"use client"

import type { ComponentProps, CSSProperties } from "react"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./aspect-ratio.css"

function AspectRatio({
  ratio,
  className,
  style,
  ...props
}: ComponentProps<"div"> & {
  ratio: number
}) {
  return (
    <div
      data-slot="aspect-ratio"
      style={{ "--np-aspect-ratio-value": ratio, ...style } as CSSProperties}
      className={cn("np-aspect-ratio", className)}
      {...props}
    />
  )
}

export { AspectRatio }
