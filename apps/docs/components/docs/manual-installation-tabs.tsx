"use client"

import type { ReactNode } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InstallationType, useConfig } from "@/hooks/use-config"

export function ManualInstallationTabs({
  cli,
  manual,
  prompt,
}: {
  cli: ReactNode
  manual: ReactNode
  prompt?: ReactNode
}) {
  const { installationType, setInstallationType } = useConfig()

  const value =
    installationType === "prompt" && !prompt ? "cli" : installationType

  return (
    <Tabs
      value={value}
      onValueChange={(next) => setInstallationType(next as InstallationType)}
      className="mt-8 gap-0"
    >
      <TabsList className="mb-4 bg-transparent" variant="line">
        <TabsTrigger value="cli" className="text-base">
          Command
        </TabsTrigger>
        {prompt ? (
          <TabsTrigger value="prompt" className="text-base">
            Prompt
          </TabsTrigger>
        ) : null}
        <TabsTrigger value="manual" className="text-base">
          Manual
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cli">{cli}</TabsContent>
      {prompt ? (
        <TabsContent value="prompt" className={"mt-4"}>
          {prompt}
        </TabsContent>
      ) : null}
      <TabsContent value="manual" className="mt-0">
        {manual}
      </TabsContent>
    </Tabs>
  )
}
