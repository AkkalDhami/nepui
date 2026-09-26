import path from "node:path"
import fs from "fs-extra"
import { InstallationError } from "@/utils/errors.js"
import { partitionByExistence, resolveConflicts } from "./conflicts.js"
import type { ResolvedFile } from "./paths.js"

export interface InstallResult {
  /** Files that were written to disk. */
  written: ResolvedFile[]
  /** Files that were skipped because they already existed. */
  skipped: ResolvedFile[]
}

export async function installFiles(
  resolved: ResolvedFile[]
): Promise<InstallResult> {
  const { existing, fresh } = await partitionByExistence(resolved)

  const toWrite: ResolvedFile[] = [...fresh]
  const skipped: ResolvedFile[] = []

  if (existing.length > 0) {
    const decisions = await resolveConflicts(existing)
    for (const entry of existing) {
      const decision = decisions.get(entry.absolutePath)
      if (decision === "overwrite") {
        toWrite.push(entry)
      } else {
        skipped.push(entry)
      }
    }
  }

  const written: ResolvedFile[] = []
  for (const entry of toWrite) {
    await writeOne(entry)
    written.push(entry)
  }

  return { written, skipped }
}

async function writeOne(entry: ResolvedFile): Promise<void> {
  try {
    await fs.ensureDir(path.dirname(entry.absolutePath))
    await fs.writeFile(entry.absolutePath, entry.file.content, "utf8")
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : String(cause)
    throw new InstallationError(
      `Failed to write file:\n${entry.relativePath}\n\n${detail}`,
      entry.relativePath
    )
  }
}
