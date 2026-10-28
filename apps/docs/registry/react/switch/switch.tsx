"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./switch.css"

function withBase<State>(
  base: string,
  className?: string | ((state: State) => string | undefined)
) {
  return (state: State) =>
    cn(base, typeof className === "function" ? className(state) : className)
}

const switchVariants = cva("np-switch", {
  variants: {
    size: {
      default: "",
      sm: "np-switch-sm",
    },
  },
  defaultVariants: { size: "default" },
})

type SwitchProps = SwitchPrimitive.Root.Props & {
  size?: NonNullable<VariantProps<typeof switchVariants>["size"]>
}

function Switch({ className, size = "default", ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={withBase(switchVariants({ size }), className)}
      {...props}
    />
  )
}

export { Switch, switchVariants }
