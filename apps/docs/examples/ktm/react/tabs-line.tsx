"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/react/tabs"

export default function TabsLineDemo() {
  return (
    <Tabs defaultValue="overview" style={{ width: "100%", maxWidth: "24rem" }}>
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        View your key metrics and recent project activity.
      </TabsContent>
      <TabsContent value="analytics">
        Track performance and user engagement metrics.
      </TabsContent>
      <TabsContent value="reports">
        Generate and download your detailed reports.
      </TabsContent>
    </Tabs>
  )
}
