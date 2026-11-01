"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./collapsible.css"

function Collapsible({ className, ...props }: CollapsiblePrimitive.Root.Props) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={(state) =>
        cn(
          "np-collapsible",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function CollapsibleTrigger({
  className,
  ...props
}: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={(state) =>
        cn(
          "np-collapsible-trigger",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function CollapsibleContent({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={(state) =>
        cn(
          "np-collapsible-content",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
