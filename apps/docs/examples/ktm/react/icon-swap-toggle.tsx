"use client"

import { useState } from "react"
import { PauseIcon, PlayIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/react/button"
import { IconSwap, IconSwapItem } from "@/registry/react/icon-swap"

export default function IconSwapToggle() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Button
      variant="outline"
      size="icon-sm"
      aria-label="Playback"
      aria-pressed={isPlaying}
      onClick={() => setIsPlaying((value) => !value)}
    >
      <IconSwap>
        <IconSwapItem key={isPlaying ? "pause" : "play"}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </IconSwapItem>
      </IconSwap>
    </Button>
  )
}
