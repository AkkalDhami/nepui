"use client"

import { useState } from "react"
import { HeartIcon } from "@phosphor-icons/react"

import { Toggle } from "@/registry/react/toggle"

export default function ToggleFillIcon() {
  const [liked, setLiked] = useState(false)

  return (
    <Toggle aria-label="Toggle like" pressed={liked} onPressedChange={setLiked}>
      <HeartIcon weight={liked ? "fill" : "regular"} />
      Like
    </Toggle>
  )
}
