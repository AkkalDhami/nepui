"use client"

import type { ComponentProps } from "react"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./skeleton.css"

function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("np-skeleton", className)}
      {...props}
    />
  )
}

export { Skeleton }
