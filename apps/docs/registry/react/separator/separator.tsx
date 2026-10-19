"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./separator.css"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={(state) =>
        cn(
          "np-separator",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

export { Separator }
