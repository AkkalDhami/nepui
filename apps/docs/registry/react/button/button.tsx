/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"

// NOTE: Update path if needed
import "../../styles/tokens.css"
import "./button.css"

export type ButtonVariant =
  "default" | "outline" | "secondary" | "ghost" | "destructive"

export type ButtonSize =
  "xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"

export function cn(
  ...classes: Array<string | number | boolean | null | undefined>
): string {
  return classes.filter(Boolean).join(" ")
}

interface ButtonBaseProps {
  children?: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

interface ButtonAsButtonProps
  extends
    ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  as?: "button"
  href?: never
}

interface ButtonAsLinkProps
  extends
    ButtonBaseProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> {
  as: "link"
  href: string
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

// Real discriminant check on `props.as`, so TS can actually narrow the union.
function isLinkProps(props: ButtonProps): props is ButtonAsLinkProps {
  return props.as === "link"
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    className,
    variant = "default",
    size = "default",
    loading = false,
  } = props

  const classes = cn("np-button", className)

  if (isLinkProps(props)) {
    const {
      as: _as,
      href,
      onClick,
      children,
      variant: _variant,
      size: _size,
      loading: _loading,
      className: _className,
      ...linkProps
    } = props

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (loading) {
        event.preventDefault()
        return
      }
      onClick?.(event)
    }

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cn(classes, "np-button-link")}
        aria-busy={loading || undefined}
        aria-disabled={loading || undefined}
        data-variant={variant}
        data-size={size}
        data-state={loading ? "loading" : undefined}
        {...linkProps}
        onClick={handleClick}
      >
        {children}
      </a>
    )
  }

  const {
    as: _as,
    disabled,
    type = "button",
    onClick,
    children,
    variant: _variant,
    size: _size,
    loading: _loading,
    className: _className,
    ...buttonProps
  } = props

  const isDisabled = disabled || loading

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading}
      data-variant={variant}
      data-size={size}
      data-state={loading ? "loading" : isDisabled ? "disabled" : undefined}
      {...buttonProps}
      onClick={onClick}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"
