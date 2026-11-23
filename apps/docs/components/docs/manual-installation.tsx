import type { ReactNode } from "react"

import { getPrompt } from "@/lib/prompts"

import { AgentsPrompt } from "./agents-prompt"
import { ManualInstallationTabs } from "./manual-installation-tabs"
import { TargetType } from "@/hooks/use-config"

export async function ManualInstallation({
  cli,
  manual,
  name,
  target = "react",
}: {
  cli: ReactNode
  manual: ReactNode
  name?: string
  target?: TargetType
}) {
  const prompt = name ? await getPrompt(target, name) : null

  return (
    <ManualInstallationTabs
      cli={cli}
      manual={manual}
      prompt={prompt ? <AgentsPrompt prompt={prompt} /> : undefined}
    />
  )
}
