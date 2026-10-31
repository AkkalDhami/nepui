"use client"

import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./checkbox-group.css"

function CheckboxGroup({
  className,
  orientation = "vertical",
  ...props
}: CheckboxGroupPrimitive.Props & {
  orientation?: "vertical" | "horizontal"
}) {
  return (
    <CheckboxGroupPrimitive
      data-slot="checkbox-group"
      data-orientation={orientation}
      className={(state) =>
        cn(
          "np-checkbox-group",
          orientation === "horizontal" && "np-checkbox-group-horizontal",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

export { CheckboxGroup }
