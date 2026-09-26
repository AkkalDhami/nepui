"use client"

import { CheckIcon, CopyIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

interface CopyButtonProps {
  value: string
  className?: string
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      aria-label={copied ? "Copied" : "Copy code"}
      aria-pressed={copied}
      title={copied ? "Copied" : "Copy code"}

      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md",
        "text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        copied && "pointer-events-none",
        className
      )}
    >
      {copied ? (
        <CheckIcon className="size-4.5 text-foreground" weight="bold" />
      ) : (
        <CopyIcon className="size-5" weight="bold" />
      )}
      <span className="sr-only">{copied ? "Copied" : "CopyIcon code"}</span>
    </button>
  )
}
