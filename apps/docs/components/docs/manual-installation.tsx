"use client"

import type { ReactNode } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ManualInstallation({
  cli,
  manual,
}: {
  cli: ReactNode
  manual: ReactNode
}) {
  return (
    <Tabs defaultValue="cli" className="mt-8 gap-0">
      <TabsList className="mb-4 bg-transparent" variant="line">
        <TabsTrigger value="cli" className="text-base">
          Command
        </TabsTrigger>
        <TabsTrigger value="manual" className="text-base">
          Manual
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cli">{cli}</TabsContent>
      <TabsContent value="manual" className="mt-0">
        {manual}
      </TabsContent>
    </Tabs>
  )
}
