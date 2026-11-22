"use client"

import * as React from "react"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./gradient-text.css"

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

type GradientTextProps = Omit<React.ComponentProps<"span">, "children"> & {
  children?: React.ReactNode
  /** The color set. Defaults to `sunrise`. */
  gradient?: GradientName
  /** How fast the gradient flows. */
  speed?: "slow" | "default" | "fast"
  /** Set to `false` for a static gradient. */
  animated?: boolean
  /** Flow the gradient the other way. */
  reverse?: boolean
  /** Adds a glow. `true` is the default strength. */
  neon?: boolean | "soft" | "default" | "strong"
  /** Flickers the glow like a failing neon tube. */
  flicker?: boolean
  /** Replaces the rendered element, such as a heading. */
  render?: React.ReactElement
}

function GradientText({
  gradient = "sunrise",
  speed = "default",
  animated = true,
  reverse = false,
  neon = false,
  flicker = false,
  className,
  render,
  ...props
}: GradientTextProps) {
  const merged = {
    "data-slot": "gradient-text",
    "data-gradient": gradient === "sunrise" ? undefined : gradient,
    "data-speed": speed === "default" ? undefined : speed,
    "data-animate": animated ? undefined : "false",
    "data-direction": reverse ? "reverse" : undefined,
    "data-neon": neon === true ? "default" : neon || undefined,
    "data-flicker": flicker ? "" : undefined,
    ...props,
    className: cn("np-gradient-text", className),
  }

  if (React.isValidElement(render)) {
    const own = render.props as { className?: string }
    return React.cloneElement(render, {
      ...merged,
      ...(render.props as Record<string, unknown>),
      className: cn(merged.className, own.className),
    } as Record<string, unknown>)
  }

  return <span {...merged} />
}

export { GradientText, gradientNames }
export type { GradientName, GradientTextProps }
