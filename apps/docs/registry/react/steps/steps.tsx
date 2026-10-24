"use client"

import type { ComponentProps } from "react"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./steps.css"

function Step({ className, ...props }: ComponentProps<"h3">) {
  return <h3 data-slot="step" className={cn("np-step", className)} {...props} />
}

function Steps({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="steps" className={cn("np-steps", className)} {...props} />
  )
}

export { Step, Steps }
