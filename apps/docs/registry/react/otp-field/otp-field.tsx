"use client"

import { OTPField as OTPFieldPrimitive } from "@base-ui/react/otp-field"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./otp-field.css"

function withBase<State>(
  base: string,
  className?: string | ((state: State) => string | undefined)
) {
  return (state: State) =>
    cn(base, typeof className === "function" ? className(state) : className)
}

const otpFieldVariants = cva("np-otp-field", {
  variants: {
    size: {
      sm: "np-otp-field-sm",
      default: "",
      lg: "np-otp-field-lg",
    },
  },
  defaultVariants: { size: "default" },
})

function OTPField({
  className,
  size = "default",
  ...props
}: OTPFieldPrimitive.Root.Props & {
  size?: NonNullable<VariantProps<typeof otpFieldVariants>["size"]>
}) {
  return (
    <OTPFieldPrimitive.Root
      data-slot="otp-field"
      data-size={size}
      className={withBase(otpFieldVariants({ size }), className)}
      {...props}
    />
  )
}

function OTPFieldInput({ className, ...props }: OTPFieldPrimitive.Input.Props) {
  return (
    <OTPFieldPrimitive.Input
      data-slot="otp-field-input"
      className={withBase("np-otp-field-input", className)}
      {...props}
    />
  )
}

function OTPFieldSeparator({
  className,
  ...props
}: OTPFieldPrimitive.Separator.Props) {
  return (
    <OTPFieldPrimitive.Separator
      data-slot="otp-field-separator"
      className={withBase("np-otp-field-separator", className)}
      {...props}
    />
  )
}

export { OTPField, OTPFieldInput, OTPFieldSeparator, otpFieldVariants }
