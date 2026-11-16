import fs from "node:fs"
import path from "node:path"

const DOCS_DIR = path.join(process.cwd(), "content", "docs")

export interface DocUrl {
  url: string
  lastModified: Date
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

export function getDocUrls(): DocUrl[] {
  return walk(DOCS_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const relative = path
        .relative(DOCS_DIR, file)
        .replace(/\\/g, "/")
        .replace(/\.mdx?$/, "")
        .replace(/\/index$/, "")
      return {
        url: `/docs/${relative}`.replace(/\/$/, ""),
        lastModified: fs.statSync(file).mtime,
      }
    })
}
