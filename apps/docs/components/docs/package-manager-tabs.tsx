"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import { useConfig } from "@/hooks/use-config"
import { PackageManager } from "@/types"
import { getPackageManagerIcon } from "@/components/icons"
import { CopyButton } from "@/components/docs/copy-button"

const pkgManagers = ["npm", "yarn", "pnpm", "bun"]

export default function PackageManagerTabs({
  command = "",
}: {
  command: string
}) {
  const { packageManager, setPackageManager } = useConfig()

  function onChangePackageManager(pkgManager: PackageManager) {
    setPackageManager(pkgManager)
  }
  const Icon = getPackageManagerIcon(packageManager, "size-5")

  return (
    <Tabs
      value={packageManager}
      className={cn(
        "not-typeset rounded-lg border border-transparent bg-code py-2"
      )}
    >
      <TabsList
        // variant={"line"}
        className={cn("bg-transparent pl-4")}
      >
        <div className="mr-4 flex items-center gap-3">{Icon}</div>
        {pkgManagers.map((m) => {
          return (
            <TabsTrigger
              key={m}
              value={m}
              className={cn(
                "flex items-center gap-3 bg-transparent text-base font-medium text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent"
              )}
              onClick={() => onChangePackageManager(m as PackageManager)}
            >
              {m}
            </TabsTrigger>
          )
        })}
      </TabsList>

      {pkgManagers.map((key) => {
        const commands = convertNpmCommand(command)
        const cmd = commands[key as PackageManager]
        return (
          <TabsContent
            key={key}
            value={key}
            className="border-t border-neutral-500/10"
          >
            <CopyButton
              value={cmd}
              className="absolute right-3 bottom-0 z-10 w-auto cursor-pointer bg-transparent p-1.5 text-xs"
            />
            <pre
              className={cn(
                "overflow-x-auto overscroll-x-contain px-4 pt-4 pb-2"
              )}
            >
              <code className="not-typeset font-code! text-base leading-none text-muted-foreground">
                {cmd}
              </code>
            </pre>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}

// Thanks https://chanhdai.com/components/code-block-command

type ConvertNpmCommandResult = {
  pnpm: string
  yarn: string
  npm: string
  bun: string
}

export function convertNpmCommand(npmCommand: string): ConvertNpmCommandResult {
  // npm install
  if (npmCommand.startsWith("npm install")) {
    return {
      pnpm: npmCommand.replaceAll("npm install", "pnpm add"),
      yarn: npmCommand.replaceAll("npm install", "yarn add"),
      npm: npmCommand,
      bun: npmCommand.replaceAll("npm install", "bun add"),
    }
  }

  // npx create- (must be checked before generic npx)
  if (npmCommand.startsWith("npx create-")) {
    return {
      pnpm: npmCommand.replace("npx create-", "pnpm create "),
      yarn: npmCommand.replace("npx create-", "yarn create "),
      npm: npmCommand,
      bun: npmCommand.replace("npx", "bunx --bun"),
    }
  }

  // npm create
  if (npmCommand.startsWith("npm create")) {
    return {
      pnpm: npmCommand.replace("npm create", "pnpm create"),
      yarn: npmCommand.replace("npm create", "yarn create"),
      npm: npmCommand,
      bun: npmCommand.replace("npm create", "bun create"),
    }
  }

  // npx (general)
  if (npmCommand.startsWith("npx")) {
    return {
      pnpm: npmCommand.replace("npx", "pnpm dlx"),
      yarn: npmCommand.replace("npx", "yarn dlx"),
      npm: npmCommand,
      bun: npmCommand.replace("npx", "bunx --bun"),
    }
  }

  // npm run
  if (npmCommand.startsWith("npm run")) {
    return {
      pnpm: npmCommand.replace("npm run", "pnpm"),
      yarn: npmCommand.replace("npm run", "yarn"),
      npm: npmCommand,
      bun: npmCommand.replace("npm run", "bun"),
    }
  }

  return {
    pnpm: npmCommand,
    yarn: npmCommand,
    npm: npmCommand,
    bun: npmCommand,
  }
}
