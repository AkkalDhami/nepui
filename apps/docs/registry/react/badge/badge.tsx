"use client"

import type { CSSProperties } from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./badge.css"

const badgeVariants = cva("np-badge", {
  variants: {
    variant: {
      default: "",
      secondary: "np-badge-secondary",
      info: "np-badge-info",
      success: "np-badge-success",
      warning: "np-badge-warning",
      destructive: "np-badge-destructive",
    },
    appearance: {
      solid: "",
      light: "np-badge-light",
      outline: "np-badge-outline",
    },
    size: {
      xs: "np-badge-xs",
      sm: "np-badge-sm",
      default: "",
      lg: "np-badge-lg",
      xl: "np-badge-xl",
    },
    radius: {
      md: "np-badge-md",
      full: "np-badge-full",
    },
  },
  defaultVariants: {
    variant: "default",
    appearance: "solid",
    size: "default",
    radius: "full",
  },
})

type BadgeVariants = VariantProps<typeof badgeVariants>

export type BadgeVariant = NonNullable<BadgeVariants["variant"]>
export type BadgeAppearance = NonNullable<BadgeVariants["appearance"]>
export type BadgeSize = NonNullable<BadgeVariants["size"]>
export type BadgeRadius = NonNullable<BadgeVariants["radius"]>

export type BadgeProps = Omit<useRender.ComponentProps<"span">, "color"> &
  BadgeVariants & {
    /**
     * Any CSS color: a name (`red`), hex (`#7c3aed`), `rgb()`, `hsl()`,
     * `oklch()`… Overrides the variant's color. Text color on solid badges
     * is chosen automatically for contrast.
     */
    color?: string
    /** Show a small status dot before the content. */
    dot?: boolean
    /** Show the dot with a repeating pulse animation. Implies `dot`. */
    pulse?: boolean
  }

function Badge({
  className,
  style,
  variant = "default",
  appearance = "solid",
  size = "default",
  radius = "full",
  color,
  dot = false,
  pulse = false,
  render,
  ...props
}: BadgeProps) {
  const defaultProps = {
    "data-slot": "badge",
    "data-variant": variant,
    "data-appearance": appearance,
    "data-size": size,
    "data-radius": radius,
    "data-custom-color": color ? "" : undefined,
    "data-dot": dot || pulse ? "" : undefined,
    "data-pulse": pulse ? "" : undefined,
    style: color
      ? ({ "--np-badge-color": color, ...style } as CSSProperties)
      : style,
    className: cn(
      badgeVariants({ variant, appearance, size, radius }),
      className
    ),
  }

  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(defaultProps, props),
  })
}

export { Badge, badgeVariants }
