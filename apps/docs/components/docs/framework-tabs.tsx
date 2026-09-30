"use client"

import { usePathname, useRouter } from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Route } from "next"
import { getCurrentTarget } from "@/lib/page-tree"
import { LanguageIcons } from "../icons"

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

// type Framework = (typeof frameworks)[number]["value"]

export function FrameworkTabs() {
  const pathname = usePathname()
  const router = useRouter()

  // const current: Framework = pathname.includes("/react/") ? "react" : "html"

  const current = getCurrentTarget(pathname)
  function handleFrameworkChange(value: string) {
    if (value === current) return

    const nextPath = pathname.replace(`/${current}/`, `/${value}/`)

    router.push(nextPath as Route, { scroll: false })
  }
  const Icons = {
    html: LanguageIcons.html,
    react: LanguageIcons.tsx,
  }

  const Icon = Icons[current as keyof typeof Icons]

  return (
    <Tabs
      value={current}
      onValueChange={handleFrameworkChange}
      className={"min-w-0 gap-0"}
    >
      <TabsList
        variant="line"
        className={"mb-0 flex w-full items-center justify-between gap-2"}
      >
        <div className="space-x-2">
          {frameworks.map(({ value, label }) => (
            <TabsTrigger key={value} value={value} className={"text-base"}>
              {label}
            </TabsTrigger>
          ))}
        </div>
        <Icon className="size-5" />
      </TabsList>
    </Tabs>
  )
}
