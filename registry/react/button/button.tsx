"use client"

import * as React from "react"

import "./button.css"

export type ButtonVariant =
  "default" | "outline" | "secondary" | "ghost" | "destructive"

export type ButtonSize =
  "xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  invalid?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      loading = false,
      invalid = false,
      disabled,
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        type={type}
        className={className ? `np-button ${className}` : "np-button"}
        disabled={isDisabled}
        aria-invalid={invalid || undefined}
        aria-busy={loading || undefined}
        data-variant={variant}
        data-size={size}
        data-state={loading ? "loading" : disabled ? "disabled" : undefined}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
