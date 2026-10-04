"use client"

import * as React from "react"

async function writeText(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }

  // Fallback for insecure contexts (http, file://)
  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.style.cssText = "position:fixed;opacity:0;pointer-events:none"
  document.body.append(textarea)
  textarea.select()

  const ok = document.execCommand("copy")
  textarea.remove()

  if (!ok) throw new Error("Copy failed")
}

export interface UseCopyToClipboardOptions {
  timeout?: number
}

export function useCopyToClipboard({
  timeout = 2000,
}: UseCopyToClipboardOptions = {}) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  React.useEffect(() => () => clearTimeout(timer.current), [])

  const reset = React.useCallback(() => {
    clearTimeout(timer.current)
    setCopied(false)
  }, [])

  const copy = React.useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await writeText(text.trim())
      } catch {
        return false
      }

      clearTimeout(timer.current)
      setCopied(true)
      timer.current = setTimeout(() => setCopied(false), timeout)

      return true
    },
    [timeout]
  )

  return { copied, copy, reset }
}
