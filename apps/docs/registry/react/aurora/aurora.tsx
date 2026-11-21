"use client"

import * as React from "react"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./aurora.css"

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

type AuroraProps = React.ComponentProps<"div"> & {
  /** The color set. Defaults to `aurora`. */
  gradient?: GradientName
  /** Where the glow shows. `none` fills the whole box. */
  mask?: "corner" | "center" | "top" | "bottom" | "none"
  intensity?: "subtle" | "default" | "strong"
  speed?: "slow" | "default" | "fast"
  /** Set to `false` for a still glow. */
  animated?: boolean
  /** Replaces the rendered element, such as a section. */
  render?: React.ReactElement
}

function Aurora({
  gradient = "aurora",
  mask = "corner",
  intensity = "default",
  speed = "default",
  animated = true,
  className,
  render,
  ...props
}: AuroraProps) {
  const merged = {
    "data-slot": "aurora",
    "data-gradient": gradient === "aurora" ? undefined : gradient,
    "data-mask": mask === "corner" ? undefined : mask,
    "data-intensity": intensity === "default" ? undefined : intensity,
    "data-speed": speed === "default" ? undefined : speed,
    "data-animate": animated ? undefined : "false",
    ...props,
    className: cn("np-aurora", className),
  }

  if (React.isValidElement(render)) {
    const own = render.props as { className?: string }
    return React.cloneElement(render, {
      ...merged,
      ...(render.props as Record<string, unknown>),
      className: cn(merged.className, own.className),
    } as Record<string, unknown>)
  }

  return <div {...merged} />
}

export { Aurora, gradientNames }
export type { AuroraProps, GradientName }
