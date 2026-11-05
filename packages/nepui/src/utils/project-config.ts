import fs from "fs-extra"
import path from "node:path"
import { InstallationError } from "@/utils/errors.js"
import { isValidTarget } from "@/utils/validation.js"
import type { Target } from "@/types"

export interface NepuiConfig {
  target: Target
  src: string
}

export function validateSourceDirectory(
  projectDirectory: string,
  sourceDirectory: string
): string {
  const src = sourceDirectory.trim()
  const absoluteSource = path.resolve(projectDirectory, src)
  const relativeSource = path.relative(
    path.resolve(projectDirectory),
    absoluteSource
  )
  if (
    !src ||
    path.isAbsolute(src) ||
    relativeSource === ".." ||
    relativeSource.startsWith(`..${path.sep}`)
  ) {
    throw new InstallationError(
      `The "src" path must be a non-empty relative path inside the project directory:\n${sourceDirectory}`
    )
  }
  return path.normalize(src)
}

export async function readProjectConfig(
  projectDirectory: string
): Promise<NepuiConfig | undefined> {
  const configPath = path.join(projectDirectory, "nepui.json")
  if (!(await fs.pathExists(configPath))) return undefined

  let value: unknown
  try {
    value = JSON.parse(await fs.readFile(configPath, "utf8"))
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : String(cause)
    throw new InstallationError(
      `Could not read nepui configuration:\n${configPath}\n\n${detail}`
    )
  }

  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    !("target" in value) ||
    typeof value.target !== "string" ||
    !isValidTarget(value.target) ||
    !("src" in value) ||
    typeof value.src !== "string" ||
    !value.src.trim()
  ) {
    throw new InstallationError(
      `Invalid nepui configuration:\n${configPath}\n\n` +
        `Expected a JSON object with "target" ("html" or "react") and a non-empty "src" path.`
    )
  }

  return {
    target: value.target,
    src: validateSourceDirectory(projectDirectory, value.src),
  }
}
