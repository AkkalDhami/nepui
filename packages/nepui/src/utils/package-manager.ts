import { execa } from "execa"
import fs from "fs-extra"
import path from "node:path"
import * as logger from "@/utils/logger.js"
import { InstallationError } from "@/utils/errors.js"

type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

export async function installProjectDependencies(
  projectDirectory: string,
  dependencies: string[],
  devDependencies: string[] = []
): Promise<void> {
  if (dependencies.length === 0 && devDependencies.length === 0) return

  const packageJsonPath = path.join(projectDirectory, "package.json")
  if (!(await fs.pathExists(packageJsonPath))) {
    throw new InstallationError(
      `Cannot install component dependencies because no package.json exists:\n${packageJsonPath}`
    )
  }

  const packageManager = await detectPackageManager(projectDirectory)
  logger.info(`Installing component dependencies with ${packageManager}:`)
  dependencies.forEach((dependency) => logger.info(` - ${dependency}`))
  devDependencies.forEach((dependency) => logger.info(` - ${dependency} (dev)`))

  try {
    if (dependencies.length > 0) {
      await execa(
        packageManager,
        [packageManager === "npm" ? "install" : "add", ...dependencies],
        { stdio: "inherit", cwd: projectDirectory }
      )
    }
    if (devDependencies.length > 0) {
      const command = packageManager === "npm" ? "install" : "add"
      const flag = packageManager === "npm" ? "--save-dev" : "--dev"
      await execa(packageManager, [command, flag, ...devDependencies], {
        stdio: "inherit",
        cwd: projectDirectory,
      })
    }
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : String(cause)
    throw new InstallationError(
      `Failed to install component dependencies with ${packageManager}.\n\n${detail}`
    )
  }
}

async function detectPackageManager(
  projectDirectory: string
): Promise<PackageManager> {
  const packageJsonPath = path.join(projectDirectory, "package.json")
  if (await fs.pathExists(packageJsonPath)) {
    let packageJson: unknown
    try {
      packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"))
    } catch (cause) {
      const detail = cause instanceof Error ? cause.message : String(cause)
      throw new InstallationError(
        `Could not read the project's package.json:\n${packageJsonPath}\n\n${detail}`
      )
    }
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
