"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./toggle.css"

const toggleVariants = cva("np-toggle", {
  variants: {
    variant: {
      default: "",
      outline: "np-toggle-outline",
    },
    size: {
      default: "",
      sm: "np-toggle-sm",
      lg: "np-toggle-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

type ToggleProps = TogglePrimitive.Props & {
  variant?: NonNullable<VariantProps<typeof toggleVariants>["variant"]>
  size?: NonNullable<VariantProps<typeof toggleVariants>["size"]>
  fillIcon?: boolean
}

function Toggle({
  className,
  variant = "default",
  size = "default",
  fillIcon = false,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      aria-pressed={props.pressed ? "true" : "false"}
      data-fill-icon={fillIcon ? "" : undefined}
      className={(state) =>
        cn(
          toggleVariants({ variant, size }),
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
export type { ToggleProps }
