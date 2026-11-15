"use client"

import { useEffect, useRef, useState } from "react"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/react/button"
import { IconSwap, IconSwapItem } from "@/registry/react/icon-swap"

export default function IconSwapCopy() {
  const [isCopied, setIsCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  function handleCopy() {
    setIsCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setIsCopied(false), 1000)
  }

  return (
    <Button
      variant="outline"
      size="icon-sm"
      aria-label={isCopied ? "Copied" : "Copy"}
      onClick={handleCopy}
    >
      <IconSwap>
        <IconSwapItem key={isCopied ? "check" : "copy"}>
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </IconSwapItem>
      </IconSwap>
    </Button>
  )
}
