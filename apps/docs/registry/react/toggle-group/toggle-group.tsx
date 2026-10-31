"use client"

import type { CSSProperties } from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Toggle, type ToggleProps } from "@/registry/react/toggle"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./toggle-group.css"

const toggleGroupVariants = cva("np-toggle-group", {
  variants: {
    variant: {
      default: "",
      outline: "np-toggle-group-outline",
    },
    size: {
      default: "",
      sm: "np-toggle-group-sm",
      lg: "np-toggle-group-lg",
    },
    orientation: {
      horizontal: "",
      vertical: "np-toggle-group-vertical",
    },
    connected: {
      true: "np-toggle-group-connected",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    orientation: "horizontal",
    connected: false,
  },
})

type ToggleGroupProps = ToggleGroupPrimitive.Props & {
  variant?: NonNullable<VariantProps<typeof toggleGroupVariants>["variant"]>
  size?: NonNullable<VariantProps<typeof toggleGroupVariants>["size"]>
  spacing?: number
  orientation?: NonNullable<
    VariantProps<typeof toggleGroupVariants>["orientation"]
  >
}

function ToggleGroup({
  className,
  style,
  variant = "default",
  size = "default",
  spacing = 2,
  orientation = "horizontal",
  ...props
}: ToggleGroupProps) {
  const spacingStyle = { "--np-toggle-group-spacing": spacing } as CSSProperties

  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      orientation={orientation}
      className={(state) =>
        cn(
          toggleGroupVariants({
            variant,
            size,
            orientation,
            connected: spacing === 0,
          }),
          typeof className === "function" ? className(state) : className
        )
      }
      style={
        typeof style === "function"
          ? (state) => ({ ...spacingStyle, ...style(state) })
          : { ...spacingStyle, ...style }
      }
      {...props}
    />
  )
}

type ToggleGroupItemProps = ToggleProps

function ToggleGroupItem(props: ToggleGroupItemProps) {
  return <Toggle data-slot="toggle-group-item" {...props} />
}

export { ToggleGroup, ToggleGroupItem, toggleGroupVariants }
export type { ToggleGroupItemProps, ToggleGroupProps }
