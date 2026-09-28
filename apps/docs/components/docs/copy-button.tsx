"use client"

import { CheckIcon, CopyIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import React from "react"

type SizeVariant = "sm" | "default" | "lg"

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string
  size?: SizeVariant
}

const sizeMap: Record<SizeVariant, { button: string; icon: number }> = {
  sm: { button: "size-6", icon: 14 },
  default: { button: "size-8", icon: 18 },
  lg: { button: "size-12", icon: 20 },
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ value, size = "default", className, onClick, ...props }, ref) => {
    const { copy, copied } = useCopyToClipboard()

    const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (value) {
        copy(value)
        onClick?.(event)
      }
    }

    const { button: buttonSize, icon: iconSize } = sizeMap[size]

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        disabled={copied}
        className={cn(
          "relative inline-flex size-8 cursor-pointer items-center justify-center rounded-md p-1.5 text-muted-foreground transition-all duration-200 ease-out hover:bg-muted hover:text-accent-foreground active:scale-[0.97] disabled:pointer-events-none disabled:opacity-100",
          buttonSize,
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "transition-all duration-200",
            copied
              ? "scale-100 opacity-100 blur-none"
              : "scale-70 opacity-0 blur-[2px]"
          )}
        >
          <CheckIcon
            size={iconSize}
            className="text-accent-foreground"
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
        <div
          className={cn(
            "absolute transition-all duration-200",
            copied
              ? "scale-0 opacity-0 blur-[2px]"
              : "scale-100 opacity-100 blur-none"
          )}
        >
          <CopyIcon size={iconSize} strokeWidth={2} aria-hidden="true" />
        </div>
      </button>
    )
  }
)

CopyButton.displayName = "CopyButton"

export { CopyButton }
export type { CopyButtonProps }
