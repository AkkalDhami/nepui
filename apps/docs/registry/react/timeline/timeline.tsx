"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./timeline.css"

type TimelineOrientation = "vertical" | "horizontal"
type TimelineStatus = "complete" | "current" | "upcoming"

type TimelineController = {
  focus: (value?: string) => void
}

const attach = Symbol("nepui.timeline.attach")

type TimelineControllerInternal = TimelineController & {
  [attach]: (root: HTMLElement | null) => void
}

function createTimelineController(): TimelineControllerInternal {
  let root: HTMLElement | null = null
  return {
    [attach]: (next) => {
      root = next
    },
    focus: (value) => {
      if (!root) return
      const items = getItems(root)
      const target = value
        ? items.find((item) => item.dataset.value === value)
        : tabStop(items)
      target?.focus()
    },
  }
}

function getItems(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(":scope > [data-slot='timeline-item']")
  )
}

function tabStop(items: HTMLElement[], last?: HTMLElement | null) {
  if (last && items.includes(last)) return last
  return (
    items.find((item) => item.hasAttribute("data-current")) ?? items[0] ?? null
  )
}

type TimelineContextValue = {
  orientation: TimelineOrientation
  feed: boolean
  value?: number
  count: number
}

const TimelineContext = React.createContext<TimelineContextValue | null>(null)
const TimelineIndexContext = React.createContext(0)

type TimelineItemContextValue = {
  id: string
  status?: TimelineStatus
}

const TimelineItemContext =
  React.createContext<TimelineItemContextValue | null>(null)

function useTimeline() {
  const context = React.useContext(TimelineContext)
  if (!context)
    throw new Error("Timeline parts must be used within a Timeline.")
  return context
}

function useTimelineItem() {
  const context = React.useContext(TimelineItemContext)
  if (!context) {
    throw new Error("Timeline parts must be used within a TimelineItem.")
  }
  return context
}

function statusAttributes(status?: TimelineStatus) {
  return {
    "data-complete": status === "complete" ? "" : undefined,
    "data-current": status === "current" ? "" : undefined,
    "data-upcoming": status === "upcoming" ? "" : undefined,
  }
}

function renderPart(
  element: React.ReactElement | undefined,
  fallback: string,
  props: Record<string, unknown>
) {
  if (element && React.isValidElement(element)) {
    const own = element.props as Record<string, unknown>
    return React.cloneElement(element, {
      ...props,
      ...own,
      className: cn(props.className as string, own.className as string),
    } as Record<string, unknown>)
  }
  return React.createElement(fallback, props)
}

const timelineVariants = cva("np-timeline", {
  variants: {
    orientation: {
      vertical: "",
      horizontal: "np-timeline-horizontal",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

type TimelineProps = Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof timelineVariants> & {
    /** The number of finished steps. Items with a `step` up to it are complete. */
    value?: number
    /** Wraps the arrow keys from the last event to the first. */
    loop?: boolean
    /** Makes the events a feed that loads more as people scroll. */
    feed?: boolean
    /** Sets `aria-busy` while a feed loads. Only applies to feeds. */
    busy?: boolean
    /** Focuses an event from anywhere. */
    controller?: TimelineController
    /** Replaces the root element. */
    render?: React.ReactElement
    children?: React.ReactNode
  }

function Timeline({
  className,
  orientation: orientationProp,
  value,
  loop = false,
  feed = false,
  busy = false,
  controller,
  render,
  children,
  onKeyDown,
  onFocus,
  style,
  ...props
}: TimelineProps) {
  const orientation: TimelineOrientation = orientationProp ?? "vertical"
  const rootRef = React.useRef<HTMLDivElement>(null)
  const last = React.useRef<HTMLElement | null>(null)

  const entries = React.Children.toArray(children).filter(React.isValidElement)
  const count = entries.length

  React.useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const items = getItems(root)
    const stop = tabStop(items, last.current)
    items.forEach((item) => {
      item.tabIndex = item === stop ? 0 : -1
    })
  })

  React.useEffect(() => {
    if (!controller) return
    const internal = controller as TimelineControllerInternal
    internal[attach](rootRef.current)
    return () => internal[attach](null)
  }, [controller])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    const target = event.target as HTMLElement
    if (target.dataset.slot !== "timeline-item" || !rootRef.current) return

    const items = getItems(rootRef.current)
    const index = items.indexOf(target)
    if (index === -1) return

    const rtl = getComputedStyle(target).direction === "rtl"
    const horizontal = orientation === "horizontal"
    let next = -1

    if (event.key === "Home") next = 0
    else if (event.key === "End") next = items.length - 1
    else if (
      event.key ===
      (horizontal ? (rtl ? "ArrowLeft" : "ArrowRight") : "ArrowDown")
    )
      next = index + 1
    else if (
      event.key ===
      (horizontal ? (rtl ? "ArrowRight" : "ArrowLeft") : "ArrowUp")
    )
      next = index - 1
    else if (feed && event.key === "PageDown") next = index + 1
    else if (feed && event.key === "PageUp") next = index - 1
    else return

    event.preventDefault()
    if (next >= items.length) next = loop ? 0 : items.length - 1
    if (next < 0) next = loop ? items.length - 1 : 0
    items[next]?.focus()
  }

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    onFocus?.(event)
    const target = event.target as HTMLElement
    if (target.dataset.slot !== "timeline-item" || !rootRef.current) return
    last.current = target
    getItems(rootRef.current).forEach((item) => {
      item.tabIndex = item === target ? 0 : -1
    })
  }

  // eslint-disable-next-line react-hooks/refs
  const element = renderPart(render, "div", {
    ref: rootRef,
    "data-slot": "timeline",
    "data-orientation": orientation,
    "data-busy": feed && busy ? "" : undefined,
    role: feed ? "feed" : "list",
    "aria-busy": feed && busy ? true : undefined,
    className: cn(timelineVariants({ orientation }), className),
    style: { "--np-timeline-count": count, ...style },
    onKeyDown: handleKeyDown,
    onFocus: handleFocus,
    ...props,
    children: entries.map((child, index) => (
      <TimelineIndexContext.Provider key={child.key ?? index} value={index}>
        {child}
      </TimelineIndexContext.Provider>
    )),
  })

  return (
    <TimelineContext.Provider value={{ orientation, feed, value, count }}>
      {element}
    </TimelineContext.Provider>
  )
}

type TimelineItemProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Names the event for `controller.focus()`. Generated if omitted. */
  value?: string
  /** The position of the event. Used with the timeline's `value`. */
  step?: number
  /** Overrides the status taken from `step`. */
  status?: TimelineStatus
  render?: React.ReactElement
  children?: React.ReactNode
}

function TimelineItem({
  className,
  value: valueProp,
  step,
  status: statusProp,
  render,
  style,
  children,
  ...props
}: TimelineItemProps) {
  const timeline = useTimeline()
  const index = React.useContext(TimelineIndexContext)
  const generated = React.useId()
  const id = valueProp ?? generated

  let status = statusProp
  if (!status && step !== undefined && timeline.value !== undefined) {
    status =
      step <= timeline.value
        ? "complete"
        : step === timeline.value + 1
          ? "current"
          : "upcoming"
  }

  const element = renderPart(render, "div", {
    "data-slot": "timeline-item",
    "data-value": id,
    "data-orientation": timeline.orientation,
    ...statusAttributes(status),
    role: timeline.feed ? "article" : "listitem",
    "aria-posinset": timeline.feed ? index + 1 : undefined,
    "aria-setsize": timeline.feed ? timeline.count : undefined,
    "aria-labelledby": `${id}-title`,
    "aria-describedby": `${id}-time ${id}-description`,
    "aria-current": status === "current" ? "step" : undefined,
    className: cn("np-timeline-item", className),
    style: { "--np-timeline-index": index, ...style },
    ...props,
    children,
  })

  return (
    <TimelineItemContext.Provider value={{ id, status }}>
      {element}
    </TimelineItemContext.Provider>
  )
}

type PartProps<T extends React.ElementType> = Omit<
  React.ComponentProps<T>,
  "children"
> & {
  render?: React.ReactElement
  children?: React.ReactNode
}

function TimelineMarker({
  className,
  render,
  children,
  ...props
}: PartProps<"span">) {
  const item = useTimelineItem()
  const timeline = useTimeline()
  return renderPart(render, "span", {
    "data-slot": "timeline-marker",
    "data-orientation": timeline.orientation,
    ...statusAttributes(item.status),
    "aria-hidden": true,
    className: cn("np-timeline-marker", className),
    ...props,
    children,
  })
}

function TimelineConnector({
  className,
  render,
  ...props
}: Omit<PartProps<"span">, "children">) {
  const item = useTimelineItem()
  const timeline = useTimeline()
  return renderPart(render, "span", {
    "data-slot": "timeline-connector",
    "data-orientation": timeline.orientation,
    ...statusAttributes(item.status),
    "aria-hidden": true,
    className: cn("np-timeline-connector", className),
    ...props,
  })
}

function TimelineTitle({
  className,
  render,
  children,
  ...props
}: PartProps<"div">) {
  const item = useTimelineItem()
  const timeline = useTimeline()
  return renderPart(render, "div", {
    id: `${item.id}-title`,
    "data-slot": "timeline-title",
    "data-orientation": timeline.orientation,
    ...statusAttributes(item.status),
    className: cn("np-timeline-title", className),
    ...props,
    children,
  })
}

function TimelineTime({
  className,
  render,
  children,
  ...props
}: PartProps<"time">) {
  const item = useTimelineItem()
  const timeline = useTimeline()
  return renderPart(render, "time", {
    id: `${item.id}-time`,
    "data-slot": "timeline-time",
    "data-orientation": timeline.orientation,
    ...statusAttributes(item.status),
    className: cn("np-timeline-time", className),
    ...props,
    children,
  })
}

function TimelineDescription({
  className,
  render,
  children,
  ...props
}: PartProps<"div">) {
  const item = useTimelineItem()
  const timeline = useTimeline()
  return renderPart(render, "div", {
    id: `${item.id}-description`,
    "data-slot": "timeline-description",
    "data-orientation": timeline.orientation,
    ...statusAttributes(item.status),
    className: cn("np-timeline-description", className),
    ...props,
    children,
  })
}

export {
  Timeline,
  TimelineConnector,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
  createTimelineController,
  timelineVariants,
}

export type {
  TimelineController,
  TimelineItemProps,
  TimelineOrientation,
  TimelineProps,
  TimelineStatus,
}
