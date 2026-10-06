"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./button.css"

const buttonVariants = cva("np-button", {
  variants: {
    variant: {
      default: "",
      outline: "np-button-outline",
      secondary: "np-button-secondary",
      ghost: "np-button-ghost",
      destructive: "np-button-destructive",
      link: "np-button-link",
    },
    size: {
      default: "",
      xs: "np-button-xs",
      sm: "np-button-sm",
      lg: "np-button-lg",
      icon: "np-button-icon",
      "icon-xs": "np-button-icon-xs",
      "icon-sm": "np-button-icon-sm",
      "icon-lg": "np-button-icon-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

type ButtonVariants = VariantProps<typeof buttonVariants>

export type ButtonVariant = NonNullable<ButtonVariants["variant"]>
export type ButtonSize = NonNullable<ButtonVariants["size"]>
export type ButtonProps = ButtonPrimitive.Props & ButtonVariants

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={(state) =>
        cn(
          buttonVariants({ variant, size }),
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

export { Button, buttonVariants }
