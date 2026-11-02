import ora from "ora"
import * as logger from "@/utils/logger.js"
import { resolveAllDestinations } from "@/installer/paths.js"
import { installFiles } from "@/installer/install.js"
import { validateComponentName, validateTarget } from "@/utils/validation.js"
import {
  ComponentNotFoundError,
  isCliError,
  RegistryError,
  UsageError,
} from "@/utils/errors.js"
import { buildComponentUrl, fetchComponent, fetchIndex } from "@/registry/fech"
import { GITHUB_URL } from "@/constants"
import kleur from "kleur"
import { rewriteComponentImports } from "@/utils/rewrite-imports"
import type { ResolvedFile } from "@/installer/paths.js"

export interface AddOptions {
  target?: string
  all?: boolean
  force?: boolean
  local?: boolean
}

export async function addCommand(
  rawComponentNames: string[],
  options: AddOptions
): Promise<void> {
  const target = validateTarget(options.target ?? "html")
  const requestedNames = normalizeComponentNames(rawComponentNames)

  if (options.all && requestedNames.length > 0) {
    throw new UsageError("Use either component names or --all, not both.")
  }
  if (!options.all && requestedNames.length === 0) {
    throw new UsageError(
      "Provide one or more component names, or use --all.\n\n" +
        "Example: npx nepui add button card --target react"
    )
  }

  const spinner = ora(
    options.all ? "Fetching component list..." : "Fetching components..."
  ).start()

  let componentNames = requestedNames
  try {
    if (options.all) {
      const index = await fetchIndex(target, options.local)
      componentNames = index.components.map((component) =>
        validateComponentName(component.name)
      )
      if (componentNames.length === 0) {
        spinner.stop()
        logger.warn(`No ${target} components are available in the registry.`)
        return
      }
    }
  } catch (err) {
    spinner.fail("Failed to fetch component list.")
    logger.error(isCliError(err) ? err.message : String(err))
    process.exitCode = 1
    return
  }

  spinner.text = `Fetching ${componentNames.length} component(s)...`
  const results = await Promise.allSettled(
    componentNames.map((componentName) =>
      fetchComponent(target, componentName, options.local)
    )
  )
  const failedIndex = results.findIndex(
    (result) => result.status === "rejected"
  )
  if (failedIndex !== -1) {
    const result = results[failedIndex]
    if (result.status === "rejected") {
      spinner.fail(`Failed to fetch ${componentNames[failedIndex]}.`)
      logger.error(
        describeFetchFailure(result.reason, componentNames[failedIndex], target)
      )
    }
    process.exitCode = 1
    return
  }

  spinner.text = "Preparing component files..."
  const resolved = deduplicateResolvedFiles(
    results.flatMap((result, index) => {
      if (result.status !== "fulfilled") return []
      const files = rewriteComponentImports(result.value.files, target)
      return resolveAllDestinations(files, target, componentNames[index])
    })
  )

  spinner.stop()

  const result = await installFiles(resolved, options.force)

  if (result.written.length === 0 && result.skipped.length > 0) {
    logger.br()
    logger.warn(
      `No files written. All ${result.skipped.length} file(s) were skipped.`
    )
    return
  }

  logger.br()
  logger.success(
    `Added ${componentNames.length} component(s); created ${result.written.length} file(s):`
  )
  for (const entry of result.written) {
    logger.info(`  - ${logger.path(entry.relativePath)}`)
  }

  if (result.skipped.length > 0) {
    logger.br()
    logger.warn(`Skipped ${result.skipped.length} existing file(s):`)
    for (const entry of result.skipped) {
      logger.info(`  - ${logger.path(entry.relativePath)}`)
    }
  }
}

function normalizeComponentNames(rawNames: string[]): string[] {
  return [
    ...new Set(
      rawNames
        .flatMap((name) => name.split(","))
        .map((name) => name.trim())
        .filter(Boolean)
        .map(validateComponentName)
    ),
  ]
}

function deduplicateResolvedFiles(files: ResolvedFile[]): ResolvedFile[] {
  const uniqueFiles = new Map<string, ResolvedFile>()
  for (const resolved of files) {
    const previous = uniqueFiles.get(resolved.absolutePath)
    if (previous && previous.file.content !== resolved.file.content) {
      throw new RegistryError(
        `Multiple components provide different contents for:\n${resolved.relativePath}`
      )
    }
    uniqueFiles.set(resolved.absolutePath, resolved)
  }
  return [...uniqueFiles.values()]
}

function describeFetchFailure(
  err: unknown,
  componentName: string,
  target: "html" | "react"
): string {
  if (err instanceof ComponentNotFoundError) {
    const url = buildComponentUrl(target, componentName)
    return `Something went wrong. Please check the error below for more details.

Message:
The component at ${url} was not found.
The component may not exist yet, or the name may be incorrect.

Try:
> npx nepui ls --target ${target}

If the problem persists, please open an issue on GitHub.
> ${GITHUB_URL}/issues/new
    `
  }
  if (err instanceof RegistryError) {
    return `${kleur.red("✖")} Unable to fetch component
Component: ${kleur.cyan(componentName)}
Target: ${kleur.cyan(target)}

Error: ${kleur.red(err.message)}
    `
  }
  if (isCliError(err)) {
    return err.message
  }
  return `Failed to fetch ${componentName} from:\n${buildComponentUrl(target, componentName)}`
}
