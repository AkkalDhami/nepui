"use client"

import { useMemo } from "react"

import { buildHtmlDocument, PlaygroundFile } from "@/lib/playground"

interface HtmlPreviewPlaygroundProps {
  files: PlaygroundFile[]
}

export function HtmlPreviewPlayground({ files }: HtmlPreviewPlaygroundProps) {
  const srcDoc = useMemo(() => buildHtmlDocument(files), [files])

  return (
    <div className="h-full min-h-80 scrollbar-thin overflow-hidden rounded-lg border bg-code">
      <iframe
        title="nepui component preview"
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        className="block h-full min-h-80 w-full scrollbar-thin border-0"
      />
    </div>
  )
}
