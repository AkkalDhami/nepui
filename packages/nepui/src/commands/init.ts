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
import {
  validateSourceDirectory,
  type NepuiConfig,
} from "@/utils/project-config.js"
import { installProjectDependencies } from "@/utils/package-manager.js"

const REACT_DEPENDENCIES = ["@base-ui/react", "class-variance-authority", "cn"]

export interface InitOptions {
  target?: string
  src?: string
  directory?: string
  force?: boolean
  local?: boolean
}

export async function initCommand(options: InitOptions): Promise<void> {
  const target = options.target
    ? validateTarget(options.target)
    : await promptForTarget()
  const directory = options.directory ?? "."
  const projectDirectory = path.resolve(process.cwd(), directory)
  const src = validateSourceDirectory(
    projectDirectory,
    options.src ?? (await promptForSourceDirectory())
  )

  const spinner = ora("Initializing nepui...").start()

  try {
    if (target === "react") {
      await requirePackageJson(projectDirectory)
    }

    spinner.text = "Fetching design tokens..."
    const content = await fetchTokens(options.local)

    if (target === "react") {
      spinner.stop()
      await installProjectDependencies(projectDirectory, REACT_DEPENDENCIES)
      spinner.start("Writing design tokens...")
    }

    const targetPath =
      target === "html" ? "styles/tokens.css" : "components/nepui/tokens.css"
    const config: NepuiConfig = { target, src }
    const configFile: RegistryFile = {
      path: "nepui.json",
      content: JSON.stringify(
        {
          $schema: "https://nepui.vercel.app/schema.json",
          ...config,
        },
        null,
        2
      ),
      type: "registry:config",
      target: "nepui.json",
    }
    const tokenFile: RegistryFile = {
      path: "tokens.css",
      content,
      type: "registry:style",
      target: targetPath,
    }

    spinner.stop()
    const resolved = [
      ...resolveAllDestinations(
        [configFile],
        target,
        "tokens",
        projectDirectory
      ),
      ...resolveAllDestinations(
        [tokenFile],
        target,
        "tokens",
        projectDirectory,
        src
      ),
    ]
    const result = await installFiles(resolved, options.force)

    logger.br()
    if (result.written.length > 0) {
      logger.success(
        `Initialized ${target} in ${logger.path(path.join(directory, src))}.`
      )
    } else {
      logger.warn(
        `Kept existing files in ${logger.path(path.join(directory, src))}.`
      )
    }
  } catch (err) {
    spinner.fail("Initialization failed.")
    throw err
  }
}

async function promptForSourceDirectory(): Promise<string> {
  const response = await prompts(
    {
      type: "text",
      name: "src",
      message: "Where should nepui component files be placed?",
      initial: ".",
    },
    {
      onCancel: () => {
        throw new UserCancelledError("Initialization cancelled.")
      },
    }
  )

  if (typeof response.src !== "string" || !response.src.trim()) {
    throw new UserCancelledError("Initialization cancelled.")
  }
  return response.src.trim()
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
