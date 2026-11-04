"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/react/tabs"

export default function TabsDisabledDemo() {
  return (
    <Tabs defaultValue="home" style={{ width: "100%", maxWidth: "24rem" }}>
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">This tab is enabled.</TabsContent>
      <TabsContent value="disabled">This tab can not be reached.</TabsContent>
    </Tabs>
  )
}
