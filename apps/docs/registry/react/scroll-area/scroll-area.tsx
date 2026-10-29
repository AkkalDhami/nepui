"use client"

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./scroll-area.css"

function ScrollArea({
  className,
  children,
  fade = false,
  ...props
}: ScrollAreaPrimitive.Root.Props & { fade?: boolean }) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      data-np-scroll-fade={fade ? "" : undefined}
      className={(state) =>
        cn(
          "np-scroll-area",
          fade && "np-scroll-fade",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="np-scroll-area-viewport"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner
        data-slot="scroll-area-corner"
        className="np-scroll-area-corner"
      />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={(state) =>
        cn(
          "np-scroll-area-scrollbar",
          orientation === "horizontal" && "np-scroll-area-scrollbar-horizontal",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="np-scroll-area-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
