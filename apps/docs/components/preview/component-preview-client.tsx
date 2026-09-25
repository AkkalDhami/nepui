"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { HtmlPreviewFrame } from "./html-preview-frame"
import { CopyButton } from "@/components/docs/copy-button"
import { getIconForLanguageExtension } from "@/components/icons"
import Link from "next/link"

interface ComponentPreviewClientProps {
  name: string
  html: string
  css: string
  js: string | null
  htmlHighlighted: string
  cssHighlighted: string
  jsHighlighted: string | null
  className?: string
}

type SourceTab = "html" | "css" | "js"

export function ComponentPreviewClient({
  name,
  html,
  css,
  js,
  htmlHighlighted,
  cssHighlighted,
  jsHighlighted,
  className,
}: ComponentPreviewClientProps) {
  const [sourceTab, setSourceTab] = useState<SourceTab>("html")

  const sourceTabs = [
    {
      value: "html" as const,
      label: `${name}.html`,
      source: html,
      highlighted: htmlHighlighted,
    },
    {
      value: "css" as const,
      label: `${name}.css`,
      source: css,
      highlighted: cssHighlighted,
    },
    // Only shown when the component actually ships a JS file.
    ...(js !== null && jsHighlighted !== null
      ? [
          {
            value: "js" as const,
            label: `${name}.js`,
            source: js,
            highlighted: jsHighlighted,
          },
        ]
      : []),
  ]

  const activeTab =
    sourceTabs.find((tab) => tab.value === sourceTab) ?? sourceTabs[0]

  return (
    <Tabs
      defaultValue="preview"
      className={cn(
        "not-prose not-typeset my-6 gap-0 overflow-hidden rounded-lg border border-border",
        className
      )}
    >
      <div className="flex h-full max-h-165 items-center justify-between border-b border-border bg-muted/40 px-2">
        <TabsList
          // variant="line"
          className="my-2 h-120 gap-0 bg-transparent p-0"
        >
          <TabsTrigger
            value="preview"
            className={cn(
              "rounded-none rounded-t-md border-b-2 border-transparent bg-transparent px-3 py-2",
              "text-base font-medium text-muted-foreground shadow-none transition-colors",
              "hover:text-foreground",
              "data-[state=active]:border-primary data-[state=active]:bg-transparent",
              "data-[state=active]:text-foreground data-[state=active]:shadow-none"
            )}
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className={cn(
              "rounded-none rounded-t-md border-b-2 border-transparent bg-transparent px-3 py-2",
              "text-sm font-medium text-muted-foreground shadow-none transition-colors",
              "hover:text-foreground",
              "data-[state=active]:border-primary data-[state=active]:bg-transparent",
              "data-[state=active]:text-foreground data-[state=active]:shadow-none"
            )}
          >
            Code
          </TabsTrigger>
        </TabsList>

        <Link
          href={`/playground/html/${name}`}
          target="_blank"
          className="mr-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Open in Playground ↗
        </Link>
      </div>

      <TabsContent value="preview" className="mt-0 bg-background">
        <HtmlPreviewFrame html={html} css={css} js={js} />
      </TabsContent>

      <TabsContent value="code" className="mt-0 bg-background">
        <Tabs
          value={sourceTab}
          onValueChange={(value) => setSourceTab(value as SourceTab)}
        >
          <div className="not-prose not-typeset relative flex items-center justify-between border-b border-border px-3 py-2">
            <TabsList
              // variant={"line"}
              className="h-auto gap-2 bg-transparent p-0"
            >
              {sourceTabs.map((tab) => {
                const Icon = getIconForLanguageExtension(tab.value)
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-base text-muted-foreground shadow-none",
                      "transition-colors hover:text-foreground",
                      "data-[state=active]:bg-muted data-[state=active]:text-foreground",
                      "data-[state=active]:shadow-none"
                    )}
                  >
                    {Icon && Icon}
                    {tab.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>
            <CopyButton
              value={activeTab.source}
              className="absolute top-1/2 right-3 -translate-y-1/2"
            />
          </div>

          {sourceTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              <div
                className={cn(
                  "max-h-110 scroll-fade scrollbar-thin overflow-auto px-2 pt-2 pb-4 text-sm leading-relaxed [&_pre]:bg-transparent!",
                  "[&_pre]:font-code! [&_pre]:m-0 [&_pre]:text-base [&_pre]:wrap-break-word [&_pre]:whitespace-pre-wrap"
                )}
                dangerouslySetInnerHTML={{ __html: tab.highlighted }}
              />
            </TabsContent>
          ))}
        </Tabs>
      </TabsContent>
    </Tabs>
  )
}
