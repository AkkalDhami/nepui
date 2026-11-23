"use client"

import {
  Group,
  Panel,
  Separator,
  type GroupProps,
  type PanelProps,
  type SeparatorProps,
} from "react-resizable-panels"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./resizable.css"

function ResizablePanelGroup({
  className,
  orientation = "horizontal",
  ...props
}: GroupProps) {
  return (
    <Group
      data-slot="resizable-panel-group"
      data-orientation={orientation}
      orientation={orientation}
      className={cn("np-resizable", className)}
      {...props}
    />
  )
}

function ResizablePanel({ className, ...props }: PanelProps) {
  return (
    <Panel
      data-slot="resizable-panel"
      className={cn("np-resizable-panel", className)}
      {...props}
    />
  )
}

type ResizableHandleProps = SeparatorProps & {
  withHandle?: boolean
}

function ResizableHandle({
  withHandle = false,
  className,
  ...props
}: ResizableHandleProps) {
  return (
    <Separator
      data-slot="resizable-handle"
      className={cn("np-resizable-handle", className)}
      {...props}
    >
      {withHandle ? <div className="np-resizable-grip" /> : null}
    </Separator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
