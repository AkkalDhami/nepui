import fs from "fs-extra"
import prompts from "prompts"
import * as logger from "@/utils/logger.js"
import { UserCancelledError } from "@/utils/errors.js"
import type { ResolvedFile } from "./paths.js"

export type ConflictDecision = "overwrite" | "skip"

/** Split resolved files into those that already exist and those that don't. */
export async function partitionByExistence(
  resolved: ResolvedFile[]
): Promise<{ existing: ResolvedFile[]; fresh: ResolvedFile[] }> {
  const existing: ResolvedFile[] = []
  const fresh: ResolvedFile[] = []

  for (const entry of resolved) {
    const exists = await fs.pathExists(entry.absolutePath)
    ;(exists ? existing : fresh).push(entry)
  }

  return { existing, fresh }
}

export async function resolveConflicts(
  existing: ResolvedFile[]
): Promise<Map<string, ConflictDecision>> {
  logger.br()
  logger.warn("File already exists:")
  for (const entry of existing) {
    logger.info(`  - ${logger.path(entry.relativePath)}`)
  }

  logger.br()
  const response = await prompts(
    {
      type: "select",
      name: "action",
      message: `${existing.length} file(s) already exist. What would you like to do?`,
      choices: [
        { title: "Overwrite", value: "overwrite" },
        { title: "Skip", value: "skip" },
        { title: "Cancel", value: "cancel" },
      ],
    },
    {
      onCancel: () => {
        throw new UserCancelledError("Installation cancelled.")
      },
    }
  )

  if (!response.action || response.action === "cancel") {
    logger.br()
    throw new UserCancelledError("Installation cancelled.")
  }

  const decision: ConflictDecision = response.action
  const decisions = new Map<string, ConflictDecision>()
  for (const entry of existing) {
    decisions.set(entry.absolutePath, decision)
  }
  return decisions
}
