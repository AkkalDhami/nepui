"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useConfig } from "@/hooks/use-config"
import { PackageManager } from "@/types"
import { CheckIcon, CopyIcon, TerminalIcon } from "@phosphor-icons/react"
import PackageManagerTabs from "./package-manager-tabs"

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<"pre"> & {
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
}) {
  const { packageManager, setPackageManager } = useConfig()
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpm__,
      npm: __npm__,
      yarn: __yarn__,
      bun: __bun__,
    }
  }, [__npm__, __pnpm__, __yarn__, __bun__])

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager]

    if (!command) {
      return
    }

    setHasCopied(true)
  }, [packageManager, tabs])

  return (
    <div className="overflow-x-auto">
      <Tabs
        value={packageManager}
        className="gap-0"
        onValueChange={(value) => {
          setPackageManager(value as PackageManager)
        }}
      >
        <div className="hidden items-center gap-2 border-b border-border/50 px-3 py-1">
          <div className="flex size-4 items-center justify-center rounded-[1px] bg-foreground opacity-70">
            <TerminalIcon className="size-3 text-code" />
          </div>
          <TabsList className="rounded-none bg-transparent p-0">
            {Object.entries(tabs).map(([key]) => {
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="h-7 border border-transparent pt-0.5 shadow-none! data-[state=active]:border-input data-[state=active]:bg-background!"
                >
                  {key}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => {
            return (
              <TabsContent key={key} value={key} className="mt-0 px-4 py-3.5">
                <pre>
                  <code
                    className="relative font-mono text-sm leading-none"
                    data-language="bash"
                  >
                    {value}
                  </code>
                </pre>
              </TabsContent>
            )
          })}
        </div>
      </Tabs>
      <Button
        data-slot="copy-button"
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        onClick={copyCommand}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? <CheckIcon /> : <CopyIcon />}
      </Button>
      <PackageManagerTabs command={tabs[packageManager] || ""} />
    </div>
  )
}

export function ReactCodeBlockCommand({
  nepui,
  shadcn,
}: {
  shadcn: string
  nepui: string
}) {
  const { registry, setRegistry } = useConfig()

  return (
    <>
      <Tabs
        value={registry}
        onValueChange={(value) => setRegistry(value as "nepui" | "shadcn")}
        className="w-full"
      >
        <TabsList className={"mb-2 bg-transparent"} variant={"line"}>
          <TabsTrigger value="nepui" className={"text-base"}>
            nepui
          </TabsTrigger>
          <TabsTrigger value="shadcn" className={"text-base"}>
            shadcn
          </TabsTrigger>
        </TabsList>
        <TabsContent value="nepui">
          <PackageManagerTabs command={nepui} />
        </TabsContent>
        <TabsContent value="shadcn">
          <PackageManagerTabs command={shadcn} />
        </TabsContent>
      </Tabs>
    </>
  )
}
