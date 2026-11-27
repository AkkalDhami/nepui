"use client"

import { WordRotate } from "@/registry/react/word-rotate"

export default function WordRotateSpeeds() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">slow</span>
        <WordRotate
          className="text-2xl font-semibold"
          words={["fast", "calm", "sharp", "alive"]}
          speed="slow"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">default</span>
        <WordRotate
          className="text-2xl font-semibold"
          words={["fast", "calm", "sharp", "alive"]}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">fast</span>
        <WordRotate
          className="text-2xl font-semibold"
          words={["fast", "calm", "sharp", "alive"]}
          speed="fast"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">reverse</span>
        <WordRotate
          className="text-2xl font-semibold"
          words={["fast", "calm", "sharp", "alive"]}
          reverse
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">animated=false</span>
        <WordRotate
          className="text-2xl font-semibold"
          words={["fast", "calm", "sharp", "alive"]}
          animated={false}
        />
      </div>
    </div>
  )
}
