"use client"

import { AppWindowIcon, CodeIcon } from "@phosphor-icons/react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/react/tabs"

export default function TabsIconsDemo() {
  return (
    <Tabs defaultValue="preview" style={{ width: "100%", maxWidth: "24rem" }}>
      <TabsList>
        <TabsTrigger value="preview">
          <AppWindowIcon />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <CodeIcon />
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview">See how the component looks.</TabsContent>
      <TabsContent value="code">Read the source of the component.</TabsContent>
    </Tabs>
  )
}
