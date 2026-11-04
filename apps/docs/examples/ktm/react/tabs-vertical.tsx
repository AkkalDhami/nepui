"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/react/tabs"

export default function TabsVerticalDemo() {
  return (
    <Tabs
      defaultValue="account"
      orientation="vertical"
      style={{ width: "100%", maxWidth: "24rem" }}
    >
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
      <TabsContent value="notifications">
        Configure your notification preferences.
      </TabsContent>
    </Tabs>
  )
}
