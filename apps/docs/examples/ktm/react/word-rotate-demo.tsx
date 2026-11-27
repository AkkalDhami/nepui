"use client"

import { WordRotate } from "@/registry/react/word-rotate"

export default function WordRotateDemo() {
  return (
    <p className="text-3xl font-semibold tracking-tight sm:text-5xl">
      Build interfaces <br /> that feel{" "}
      <WordRotate words={["fast", "calm", "sharp", "alive"]} />
    </p>
  )
}
