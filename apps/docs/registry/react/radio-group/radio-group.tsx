"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./radio-group.css"

function withBase<State>(
  base: string,
  className?: string | ((state: State) => string | undefined)
) {
  return (state: State) =>
    cn(base, typeof className === "function" ? className(state) : className)
}

const radioGroupVariants = cva("np-radio-group", {
  variants: {
    orientation: {
      vertical: "",
      horizontal: "np-radio-group-horizontal",
    },
  },
  defaultVariants: { orientation: "vertical" },
})

type RadioGroupProps = RadioGroupPrimitive.Props & {
  orientation?: NonNullable<
    VariantProps<typeof radioGroupVariants>["orientation"]
  >
}

function RadioGroup({
  className,
  orientation = "vertical",
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      data-orientation={orientation}
      className={withBase(radioGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={withBase("np-radio-group-item", className)}
      {...props}
    />
  )
}

export { RadioGroup, RadioGroupItem, radioGroupVariants }
