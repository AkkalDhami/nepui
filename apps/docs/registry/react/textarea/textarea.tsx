"use client"

import type { ComponentProps } from "react"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./textarea.css"

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn("np-textarea", className)}
      {...props}
    />
  )
}

export { Textarea }
