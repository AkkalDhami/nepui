"use client"

import * as React from "react"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./highlight-text.css"

const gradientNames = [
  "aurora",
  "sunrise",
  "sunset",
  "ocean",
  "forest",
  "fire",
  "candy",
  "lavender",
  "mint",
  "peach",
  "midnight",
  "gold",
  "rainbow",
  "cyber",
  "plasma",
  "mono",
] as const

type GradientName = (typeof gradientNames)[number]

type HighlightProps = Omit<React.ComponentProps<"mark">, "children"> & {
  children?: React.ReactNode
  /** The color set. Defaults to `gold`. */
  gradient?: GradientName
  /** How the highlight is drawn. Defaults to `marker`. */
  variant?: "marker" | "mark" | "underline" | "strike"
  /** When it draws. `view` draws as the text scrolls into view. */
  trigger?: "load" | "view" | "hover"
  speed?: "slow" | "default" | "fast"
  /** Waits 0.3s per step, to draw several highlights in turn. */
  delay?: 0 | 1 | 2 | 3
  intensity?: "subtle" | "default" | "strong"
  /** Draws from the end of the line instead of the start. */
  reverse?: boolean
  /** Set to `false` to show the highlight without drawing it. */
  animated?: boolean
  /** Replaces the rendered element. */
  render?: React.ReactElement
}

function Highlight({
  gradient = "gold",
  variant = "marker",
  trigger = "load",
  speed = "default",
  delay = 0,
  intensity = "default",
  reverse = false,
  animated = true,
  className,
  render,
  ...props
}: HighlightProps) {
  const merged = {
    "data-slot": "highlight-text",
    "data-gradient": gradient === "gold" ? undefined : gradient,
    "data-variant": variant === "marker" ? undefined : variant,
    "data-trigger": trigger === "load" ? undefined : trigger,
    "data-speed": speed === "default" ? undefined : speed,
    "data-delay": delay === 0 ? undefined : String(delay),
    "data-intensity": intensity === "default" ? undefined : intensity,
    "data-direction": reverse ? "reverse" : undefined,
    "data-animate": animated ? undefined : "false",
    ...props,
    className: cn("np-highlight-text", className),
  }

  if (React.isValidElement(render)) {
    const own = render.props as { className?: string }
    return React.cloneElement(render, {
      ...merged,
      ...(render.props as Record<string, unknown>),
      className: cn(merged.className, own.className),
    } as Record<string, unknown>)
  }

  return <mark {...merged} />
}

export { Highlight, gradientNames }
export type { GradientName, HighlightProps }
