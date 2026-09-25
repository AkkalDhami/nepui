"use client"

import { useMemo } from "react"

import { buildHtmlDocument, PlaygroundFile } from "@/lib/playground"

interface HtmlPreviewProps {
  files: PlaygroundFile[]
  tokens?: string
}

export function HtmlPreview({ files, tokens = "" }: HtmlPreviewProps) {
  const srcDoc = useMemo(
    () => buildHtmlDocument(files, tokens),
    [files, tokens]
  )

  return (
    <div className="h-full min-h-80 scrollbar-thin overflow-hidden rounded-lg border bg-background">
      <iframe
        title="NepUI component preview"
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        className="block h-full min-h-80 w-full scrollbar-thin border-0"
      />
    </div>
  )
}
