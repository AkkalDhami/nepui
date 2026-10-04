"use client"

import * as React from "react"

import "./copy-button.css"
import { Button, ButtonSize, ButtonVariant, cn } from "../button/button"
import { useCopyToClipboard } from "./hooks/use-copy-to-clipboard"

function CopyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.5 5.5V3.75A1.75 1.75 0 0 1 7.25 2h5A1.75 1.75 0 0 1 14 3.75v5A1.75 1.75 0 0 1 12.25 10.5H10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="2"
        y="5.5"
        width="8.5"
        height="8.5"
        rx="1.75"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8.5l3.25 3.25L13 4.75"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type CopyTarget = string | React.RefObject<HTMLElement | null>
type CopyValue = string | (() => string)

function resolveText(value?: CopyValue, target?: CopyTarget): string | null {
  if (typeof value === "function") return value()
  if (value != null) return value

  if (target) {
    const element =
      typeof target === "string"
        ? document.querySelector<HTMLElement>(target)
        : target.current

    if (!element) return null

    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement
    ) {
      return element.value
    }

    return element.textContent
  }

  return null
}

export interface CopyButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "value" | "onCopy"
> {
  /** Text to copy, or a function that returns it at click time. */
  value?: CopyValue
  /** Element to copy from: a ref or a CSS selector. Ignored if `value` is set. */
  target?: CopyTarget
  copiedText?: string
  /** How long the copied state stays visible, in ms. */
  timeout?: number
  variant?: ButtonVariant
  size?: ButtonSize
  onCopy?: (text: string) => void
  onCopyError?: (text: string) => void
}

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      target,
      children,
      copiedText = "Copied",
      timeout = 2000,
      variant = "outline",
      size = "default",
      className,
      onClick,
      onCopy,
      onCopyError,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const { copied, copy } = useCopyToClipboard({ timeout })

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event)
      if (event.defaultPrevented) return

      const text = resolveText(value, target)
      if (text == null) return

      const ok = await copy(text)

      if (ok) onCopy?.(text)
      else onCopyError?.(text)
    }

    const label =
      ariaLabel ??
      (typeof children === "string" ? children : "Copy to clipboard")

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn("np-copy-button", className)}
        data-copied={copied ? "" : undefined}
        aria-label={copied ? copiedText : label}
        onClick={handleClick}
        {...props}
      >
        <span data-np-icon-stack="">
          <span data-copy-icon="">
            <CopyIcon />
          </span>
          <span data-copied-icon="">
            <CheckIcon />
          </span>
        </span>

        {children != null && (
          <span data-np-label-stack="">
            <span data-copy-label="">{children}</span>
            <span data-copied-label="">{copiedText}</span>
          </span>
        )}
      </Button>
    )
  }
)

CopyButton.displayName = "CopyButton"
