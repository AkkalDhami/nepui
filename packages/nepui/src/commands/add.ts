import ora from "ora"
import * as logger from "@/utils/logger.js"
import { resolveAllDestinations } from "@/installer/paths.js"
import { installFiles } from "@/installer/install.js"
import { validateComponentName, validateTarget } from "@/utils/validation.js"
import {
  ComponentNotFoundError,
  isCliError,
  RegistryError,
} from "@/utils/errors.js"
import { buildComponentUrl, fetchComponent } from "@/registry/fech"
import { GITHUB_URL } from "@/constants"
import kleur from "kleur"

export interface AddOptions {
  target?: string
  force?: boolean
  local?: boolean
}

export async function addCommand(
  rawComponentName: string,
  options: AddOptions
): Promise<void> {
  const componentName = validateComponentName(rawComponentName)
  const target = validateTarget(options.target)

  const spinner = ora(`Fetching ${componentName}...`).start()

  let item

  try {
    item = await fetchComponent(target, componentName, options.local)
  } catch (err) {
    spinner.fail("Failed to fetch component.")
    logger.error(describeFetchFailure(err, componentName, target))
    process.exitCode = 1
    return
  }
  spinner.text = `Installing ${componentName}...`

  const resolved = resolveAllDestinations(item.files, target, componentName)
  spinner.stop()

  const result = await installFiles(resolved)

  if (result.written.length === 0 && result.skipped.length > 0) {
    logger.br()
    logger.warn(
      `No files written. All ${result.skipped.length} file(s) were skipped.`
    )
    return
  }

  logger.br()
  logger.success(`Created ${result.written.length} file(s):`)
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
> npx nepui ls --target react

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
