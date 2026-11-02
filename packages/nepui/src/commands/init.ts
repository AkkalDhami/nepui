import { execa } from "execa"
import fs from "fs-extra"
import ora from "ora"
import path from "node:path"
import prompts from "prompts"
import * as logger from "@/utils/logger.js"
import { resolveAllDestinations } from "@/installer/paths.js"
import { installFiles } from "@/installer/install.js"
import { fetchTokens } from "@/registry/fech.js"
import { VALID_TARGETS, type Target, type RegistryFile } from "@/types"
import { InstallationError, UserCancelledError } from "@/utils/errors.js"
import { validateTarget } from "@/utils/validation.js"

const REACT_DEPENDENCIES = ["@base-ui/react", "class-variance-authority", "cn"]

type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

export interface InitOptions {
  target?: string
  directory?: string
  force?: boolean
  local?: boolean
}

export async function initCommand(options: InitOptions): Promise<void> {
  const target = options.target
    ? validateTarget(options.target)
    : await promptForTarget()
  const directory = options.directory ?? (await promptForDirectory())
  const projectDirectory = path.resolve(process.cwd(), directory)

  const spinner = ora("Initializing nepui...").start()

  try {
    if (target === "react") {
      await requirePackageJson(projectDirectory)
    }

    spinner.text = "Fetching design tokens..."
    const content = await fetchTokens(options.local)

    if (target === "react") {
      spinner.stop()
      await installReactDependencies(projectDirectory)
      spinner.start("Writing design tokens...")
    }

    const targetPath =
      target === "html" ? "styles/tokens.css" : "components/nepui/tokens.css"
    const tokenFile: RegistryFile = {
      path: "tokens.css",
      content,
      type: "registry:style",
      target: targetPath,
    }

    spinner.stop()
    const [resolved] = resolveAllDestinations(
      [tokenFile],
      target,
      "tokens",
      projectDirectory
    )
    const result = await installFiles([resolved], options.force)

    logger.br()
    if (result.written.length > 0) {
      logger.success(
        `Initialized ${target} tokens at ${logger.path(path.join(directory, targetPath))}.`
      )
    } else {
      logger.warn(
        `Kept existing ${logger.path(path.join(directory, targetPath))}.`
      )
    }
  } catch (err) {
    spinner.fail("Initialization failed.")
    throw err
  }
}

async function promptForDirectory(): Promise<string> {
  const response = await prompts(
    {
      type: "text",
      name: "directory",
      message: "Where should nepui be initialized?",
      initial: ".",
    },
    {
      onCancel: () => {
        throw new UserCancelledError("Initialization cancelled.")
      },
    }
  )

  if (typeof response.directory !== "string" || !response.directory.trim()) {
    throw new UserCancelledError("Initialization cancelled.")
  }
  return response.directory.trim()
}

async function promptForTarget(): Promise<Target> {
  const response = await prompts(
    {
      type: "select",
      name: "target",
      message: "Which target are you using?",
      choices: VALID_TARGETS.map((target) => ({
        title: target === "html" ? "HTML" : "React",
        value: target,
      })),
    },
    {
      onCancel: () => {
        throw new UserCancelledError("Initialization cancelled.")
      },
    }
  )

  if (!response.target) {
    throw new UserCancelledError("Initialization cancelled.")
  }
  return validateTarget(response.target)
}

async function requirePackageJson(projectDirectory: string): Promise<void> {
  const packageJsonPath = path.join(projectDirectory, "package.json")
  if (!(await fs.pathExists(packageJsonPath))) {
    throw new InstallationError(
      `No package.json found in the selected React project:\n${projectDirectory}\n\n` +
        `Run your package manager's init command first, or select a directory containing a React project.`
    )
  }

  let packageJson: unknown
  try {
    packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"))
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : String(cause)
    throw new InstallationError(
      `Could not read the React project's package.json:\n${packageJsonPath}\n\n${detail}`
    )
  }

  if (
    typeof packageJson !== "object" ||
    packageJson === null ||
    Array.isArray(packageJson)
  ) {
    throw new InstallationError(
      `The React project's package.json must contain a JSON object:\n${packageJsonPath}`
    )
  }
}

async function installReactDependencies(
  projectDirectory: string
): Promise<void> {
  const packageManager = await detectPackageManager(projectDirectory)
  const command = packageManager === "npm" ? "install" : "add"

  logger.info(`Installing React dependencies with ${packageManager}:`)
  REACT_DEPENDENCIES.forEach((dep) => logger.info(` - ${dep}`))
  try {
    await execa(packageManager, [command, ...REACT_DEPENDENCIES], {
      stdio: "inherit",
      cwd: projectDirectory,
    })
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : String(cause)
    throw new InstallationError(
      `Failed to install React dependencies with ${packageManager}.\n\n${detail}`
    )
  }
}

async function detectPackageManager(
  projectDirectory: string
): Promise<PackageManager> {
  const packageJsonPath = path.join(projectDirectory, "package.json")
  if (await fs.pathExists(packageJsonPath)) {
    const packageJson: unknown = JSON.parse(
      await fs.readFile(packageJsonPath, "utf8")
    )
    if (
      typeof packageJson === "object" &&
      packageJson !== null &&
      !Array.isArray(packageJson) &&
      "packageManager" in packageJson &&
      typeof packageJson.packageManager === "string"
    ) {
      const name = packageJson.packageManager.split("@")[0]
      if (isPackageManager(name)) return name
    }
  }

  const lockfiles: Array<[string, PackageManager]> = [
    ["pnpm-lock.yaml", "pnpm"],
    ["yarn.lock", "yarn"],
    ["bun.lock", "bun"],
    ["bun.lockb", "bun"],
    ["package-lock.json", "npm"],
  ]
  for (const [filename, manager] of lockfiles) {
    if (await fs.pathExists(path.join(projectDirectory, filename)))
      return manager
  }
  return "npm"
}

function isPackageManager(value: string): value is PackageManager {
  return (
    value === "npm" || value === "pnpm" || value === "yarn" || value === "bun"
  )
}
