"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/react/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="account" style={{ width: "100%", maxWidth: "24rem" }}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  )
}
