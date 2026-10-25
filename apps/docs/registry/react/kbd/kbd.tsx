"use client"

import * as React from "react"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./kbd.css"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return <kbd data-slot="kbd" className={cn("np-kbd", className)} {...props} />
}

function KbdGroup({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("np-kbd-group", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
