"use client"

import { usePathname, useRouter } from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Route } from "next"

const frameworks = [
  {
    value: "html",
    label: "HTML",
  },
  {
    value: "react",
    label: "React",
  },
] as const

type Framework = (typeof frameworks)[number]["value"]

export function FrameworkTabs() {
  const pathname = usePathname()
  const router = useRouter()

  const current: Framework = pathname.includes("/react/") ? "react" : "html"

  function handleFrameworkChange(value: string) {
    if (value === current) return

    const nextPath = pathname.replace(`/${current}/`, `/${value}/`)

    router.push(nextPath as Route, { scroll: false })
  }

  return (
    <Tabs
      value={current}
      onValueChange={handleFrameworkChange}
      className={"gap-0"}
    >
      <TabsList variant="line" className={"mb-0 gap-2"}>
        {frameworks.map(({ value, label }) => (
          <TabsTrigger key={value} value={value} className={"text-base"}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
