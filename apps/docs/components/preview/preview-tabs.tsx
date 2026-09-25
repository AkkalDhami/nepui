"use client"

import * as React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { HtmlPreviewFrame } from "./html-preview-frame"
import { ReactPreview } from "./react-preview"

interface PreviewTabsProps {
  html?: {
    html: string
    css?: string
    js?: string
  }

  react?: React.ReactNode

  defaultValue?: "html" | "react"
}

export function PreviewTabs({
  html,
  react,
  defaultValue = "html",
}: PreviewTabsProps) {
  const hasHtml = Boolean(html)
  const hasReact = Boolean(react)

  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList variant="line">
        {hasHtml && <TabsTrigger value="html">HTML</TabsTrigger>}

        {hasReact && <TabsTrigger value="react">React</TabsTrigger>}
      </TabsList>

      {html && (
        <TabsContent value="html">
          <HtmlPreviewFrame
            html={html.html}
            css={html.css ?? ""}
            js={html.js ?? null}
          />
        </TabsContent>
      )}

      {hasReact && (
        <TabsContent value="react">
          <ReactPreview>{react}</ReactPreview>
        </TabsContent>
      )}
    </Tabs>
  )
}
