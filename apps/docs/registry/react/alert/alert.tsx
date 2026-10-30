"use client"

import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./alert.css"

const alertVariants = cva("np-alert", {
  variants: {
    variant: {
      default: "",
      success: "np-alert-success",
      error: "np-alert-error",
      warning: "np-alert-warning",
      info: "np-alert-info",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Alert({
  className,
  variant = "default",
  ...props
}: ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

/** The title of the alert. */
function AlertTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("np-alert-title", className)}
      {...props}
    />
  )
}

/** The description or content of the alert. */
function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("np-alert-description", className)}
      {...props}
    />
  )
}

/** An action, such as a button, pinned to the top end corner of the alert. */
function AlertAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("np-alert-action", className)}
      {...props}
    />
  )
}

export { Alert, AlertAction, AlertDescription, AlertTitle, alertVariants }
