import { TargetType } from "@/hooks/use-config"
import { readFile } from "node:fs/promises"
import path from "node:path"

export async function getPrompt(target: TargetType, name: string) {
  if (!/^[a-z0-9-]+$/.test(name)) return null

  const file = path.join(
    process.cwd(),
    "content",
    "prompts",
    target,
    `${name}.md`
  )

  try {
    const raw = await readFile(file, "utf8")
    return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n+/, "").trim()
  } catch {
    return null
  }
}
