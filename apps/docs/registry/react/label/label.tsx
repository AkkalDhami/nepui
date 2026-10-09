"use client"

import * as React from "react"
import { cn } from "cn"

import "./label.css"

export type LabelProps = React.ComponentProps<"label">

function Label({ className, ...props }: LabelProps) {
  return (
    <label data-slot="label" className={cn("np-label", className)} {...props} />
  )
}

export { Label }
