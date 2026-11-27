"use client"

import { WordRotate } from "@/registry/react/word-rotate"

export default function WordRotateVariants() {
  const variants = ["slide", "fade", "flip", "blur", "zoom"] as const

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">{variant}</span>
          <p className="text-2xl font-semibold">
            Feels{" "}
            <WordRotate
              words={["fast", "calm", "sharp", "alive"]}
              variant={variant}
            />
          </p>
        </div>
      ))}
    </div>
  )
}
