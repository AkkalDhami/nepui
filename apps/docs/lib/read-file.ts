import fs from "node:fs/promises"
import path from "node:path"

const ROOT = path.join(process.cwd(), "registry")

export async function readFileFromRoot(relativePath: string) {
  const filePath = path.join(ROOT, relativePath)

  return fs.readFile(filePath, "utf-8")
}
