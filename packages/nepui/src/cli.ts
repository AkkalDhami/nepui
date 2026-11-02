import { Command } from "commander"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"
import { addCommand, type AddOptions } from "@/commands/add.js"
import { initCommand, type InitOptions } from "@/commands/init.js"
import { listCommand, type ListOptions } from "@/commands/list.js"

function readPackageVersion(): string {
  const here = path.dirname(fileURLToPath(import.meta.url))
  const pkgPath = path.join(here, "..", "package.json")
  try {
    const raw = readFileSync(pkgPath, "utf8")
    const pkg = JSON.parse(raw) as { version?: string }
    return pkg.version ?? "0.0.0"
  } catch {
    return "0.0.0"
  }
}

export function createProgram(): Command {
  const program = new Command()

  program
    .name("nepui")
    .description("A CLI for installing nepui components.")
    .version(readPackageVersion(), "-V, --version", "output the version number")

  program
    .command("init")
    .argument("[directory]", "Project directory to initialize")
    .description("Initialize nepui design tokens for a target")
    .option("--target <target>", "Project target: html or react")
    .option("--force", "Overwrite existing files")
    .option("--local", "Use the local registry (for development)")
    .action(async (directory: string | undefined, options: InitOptions) => {
      await initCommand({ ...options, directory })
    })

  program
    .command("add")
    .argument("[components...]", "Names of the components to add")
    .description("Add one or more nepui components")
    .option("--target <target>", "Component target: html or react", "html")
    .option("--all", "Add every available component for the target")
    .option("--force", "Overwrite existing files")
    .option("--local", "Add components from local environment(for development)")
    .action(async (components: string[] | undefined, options: AddOptions) => {
      await addCommand(components ?? [], options)
    })

  program
    .command("list")
    .alias("ls")
    .description("List available nepui components")
    .option("--target <target>", "Component target: html or react", "html")
    .option("--json", "Output components as JSON")
    .option(
      "--local",
      "Fetch components from local environment(for development)"
    )
    .action(async (options: ListOptions) => {
      await listCommand(options)
    })

  return program
}
