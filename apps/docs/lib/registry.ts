import "server-only"

import fs from "node:fs/promises"
import path from "node:path"

const REGISTRY_ROOT =
  process.env.NEPUI_REGISTRY_ROOT ??
  path.join(process.cwd(), "..", "..", "registry")

export interface HtmlComponentSource {
  html: string
  css: string
  js: string | null
}

async function readSourceFile(filePath: string): Promise<string> {
  try {
    const contents = await fs.readFile(filePath, "utf-8")
    return contents.trim()
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error(
        `[nepui] Registry file not found: ${filePath}. ` +
          `Check that the component name is correct and that NEPUI_REGISTRY_ROOT ` +
          `(currently resolved to "${REGISTRY_ROOT}") points at the registry directory.`
      )
    }
    throw error
  }
}

// A missing JS file is expected (most components are markup + CSS only),
// so this resolves to null on ENOENT instead of throwing.
async function readOptionalSourceFile(
  filePath: string
): Promise<string | null> {
  try {
    const contents = await fs.readFile(filePath, "utf-8")
    return contents.trim()
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null
    }
    throw error
  }
}

export async function getHtmlComponentSource(
  name: string
): Promise<HtmlComponentSource> {
  const dir = path.join(REGISTRY_ROOT, "html", name)

  const [html, css, js] = await Promise.all([
    readSourceFile(path.join(dir, `${name}.html`)),
    readSourceFile(path.join(dir, `${name}.css`)),
    readOptionalSourceFile(path.join(dir, `${name}.js`)),
  ])

  return { html, css, js }
}

export async function getRegistryItem2(target: string, component: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/r/${target}/${component}.json`,
    {
      next: {
        revalidate: 3600,
      },
    }
  )

  if (!response.ok) {
    return null
  }

  return response.json()
}

export async function getRegistryItem(target: string, component: string) {
  const filePath = path.join(
    process.cwd(),
    "public",
    "r",
    target,
    `${component}.json`
  )

  try {
    const content = await fs.readFile(filePath, "utf8")

    return JSON.parse(content)
  } catch {
    return null
  }
}