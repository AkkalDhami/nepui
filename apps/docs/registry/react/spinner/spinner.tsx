"use client"

import type { CSSProperties, HTMLAttributes } from "react"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./spinner.css"

const SIZES = ["xs", "sm", "md", "lg", "xl"] as const
const THICKNESSES = [
  "thin",
  "normal",
  "medium",
  "thick",
  "extra-thick",
] as const
const SPEEDS = ["slow", "normal", "fast", "faster"] as const

export type SpinnerSize = (typeof SIZES)[number]
export type SpinnerThickness = (typeof THICKNESSES)[number]
export type SpinnerSpeed = (typeof SPEEDS)[number]
export type SpinnerDirection =
  "clockwise" | "counter-clockwise" | "counterclockwise"

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Preset or any CSS length, e.g. "40px" */
  size?: SpinnerSize | (string & {})
  /** Preset or any CSS length, e.g. "3px" */
  thickness?: SpinnerThickness | (string & {})
  /** Preset or any CSS time, e.g. "900ms" */
  speed?: SpinnerSpeed | (string & {})
  direction?: SpinnerDirection
  /** Color of the moving arc (default: currentColor) */
  color?: string
  /** Color of the track */
  mutedColor?: string
  /** Accessible label (default: "Loading") */
  label?: string
}

type SpinnerStyle = CSSProperties & {
  "--np-spinner-size"?: string
  "--np-spinner-thickness"?: string
  "--np-spinner-speed"?: string
  "--np-spinner-color"?: string
  "--np-spinner-muted-color"?: string
}

const isPreset = <T extends readonly string[]>(
  list: T,
  value: string
): value is T[number] => (list as readonly string[]).includes(value)

export function Spinner({
  size,
  thickness,
  speed,
  direction = "clockwise",
  color,
  mutedColor,
  label = "Loading",
  className = "",
  style,
  ...rest
}: SpinnerProps) {
  const customStyle: SpinnerStyle = { ...style }
  const dataAttrs: Record<string, string> = {}

  // Preset -> data attribute (handled by CSS). Anything else -> inline CSS variable.
  if (size) {
    if (isPreset(SIZES, size)) dataAttrs["data-size"] = size
    else customStyle["--np-spinner-size"] = size
  }
  if (thickness) {
    if (isPreset(THICKNESSES, thickness))
      dataAttrs["data-thickness"] = thickness
    else customStyle["--np-spinner-thickness"] = thickness
  }
  if (speed) {
    if (isPreset(SPEEDS, speed)) dataAttrs["data-speed"] = speed
    else customStyle["--np-spinner-speed"] = speed
  }
  if (color) customStyle["--np-spinner-color"] = color
  if (mutedColor) customStyle["--np-spinner-muted-color"] = mutedColor

  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn(`np-spinner`, className)}
      data-direction={direction}
      style={customStyle}
      {...dataAttrs}
      {...rest}
    />
  )
}
