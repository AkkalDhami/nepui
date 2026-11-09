"use client"

import type { ComponentProps } from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./trace.css"

function Trace({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="trace" className={cn("np-trace", className)} {...props} />
  )
}

const traceLineVariants = cva("np-trace-line", {
  variants: {
    status: {
      running: "np-trace-running",
      error: "np-trace-error",
      pending: "np-trace-pending",
    },
  },
})

type TraceLineProps = ComponentProps<"span"> &
  VariantProps<typeof traceLineVariants>

function TraceLine({ className, status, ...props }: TraceLineProps) {
  return (
    <span
      data-slot="trace-line"
      data-status={status ?? undefined}
      className={cn(traceLineVariants({ status }), className)}
      {...props}
    />
  )
}

function TraceIcon({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      data-slot="trace-icon"
      className={cn("np-trace-icon", className)}
      {...props}
    />
  )
}

function TraceTitle({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="trace-title"
      className={cn("np-trace-title", className)}
      {...props}
    />
  )
}

function TraceDescription({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="trace-description"
      className={cn("np-trace-description", className)}
      {...props}
    />
  )
}

function TraceCollapsible({
  className,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="trace-collapsible"
      className={(state) =>
        cn(
          "np-trace-collapsible",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function TraceCollapsibleTrigger({
  className,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="trace-collapsible-trigger"
      className={(state) =>
        cn(
          "np-trace-collapsible-trigger",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function TraceCollapsibleContent({
  className,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Panel>) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="trace-collapsible-content"
      className={(state) =>
        cn(
          "np-trace-collapsible-content",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

export {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
  traceLineVariants,
}
