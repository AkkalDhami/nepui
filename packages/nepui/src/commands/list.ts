import ora from "ora"
import * as logger from "@/utils/logger.js"
import { validateTarget } from "@/utils/validation.js"
import type { Target } from "@/types"
import { fetchIndex } from "@/registry/fech"
import { printHumanList } from "@/output/list-output"

export interface ListOptions {
  target?: string
  json?: boolean
  local?: boolean
}

const DEFAULT_LIST_TARGET: Target = "react"

export async function listCommand(options: ListOptions): Promise<void> {
  const target = validateTarget(options.target ?? DEFAULT_LIST_TARGET)
  const json = options.json ?? false

  logger.setQuiet(json)

  const spinner = json
    ? null
    : ora(`Fetching ${labelFor(target)} components...`).start()

  let index
  try {
    index = await fetchIndex(target, options.local)
  } catch (err) {
    spinner?.fail(`Failed to fetch component list.`)
    throw err
  }
  spinner?.stop()

  const components = [...index.components].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  if (json) {
    logger.printJson({ target, components })
    return
  }

  printHumanList(target, components)
}

function labelFor(target: Target): string {
  return target === "react" ? "React" : "HTML"
}
