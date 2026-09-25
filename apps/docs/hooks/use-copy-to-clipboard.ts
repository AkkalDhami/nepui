"use client"

import { useCallback, useRef, useState } from "react"

/**
 * Copies text to the clipboard and exposes a transient `copied` flag,
 * so callers can swap a Copy icon for a Check icon after a successful copy.
 */
export function useCopyToClipboard(resetAfterMs = 1600) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copy = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)

        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setCopied(false), resetAfterMs)
      } catch {
        setCopied(false)
      }
    },
    [resetAfterMs]
  )

  return { copied, copy }
}
