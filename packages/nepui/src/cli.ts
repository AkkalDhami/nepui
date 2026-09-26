import { Command } from "commander"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"
import { addCommand, type AddOptions } from "@/commands/add.js"
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
    .command("add")
    .argument("<component>", "Name of the component to add")
    .description("Add a nepui component")
    .option(
      "--target <target>",
      "Component target: html or react (required)",
      "html"
    )
    .option("--force", "Overwrite existing files")
    .option("--local", "Add components from local environment(for development)")
    .action(async (component: string, options: AddOptions) => {
      await addCommand(component, options)
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
