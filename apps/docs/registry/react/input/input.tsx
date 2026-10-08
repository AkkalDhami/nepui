"use client"

import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./input.css"

const inputVariants = cva("np-input", {
  variants: {
    size: {
      default: "",
      xs: "np-input-xs",
      sm: "np-input-sm",
      lg: "np-input-lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export type InputSize = NonNullable<VariantProps<typeof inputVariants>["size"]>

export type InputProps = Omit<InputPrimitive.Props, "size"> &
  VariantProps<typeof inputVariants>

function Input({ className, size = "default", type, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-size={size}
      className={(state) =>
        cn(
          inputVariants({ size }),
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

export { Input, inputVariants }
