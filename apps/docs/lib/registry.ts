import "server-only"

import fs from "node:fs/promises"
import path from "node:path"
import { TargetType } from "@/hooks/use-config"

const REGISTRY_ROOT =
  process.env.NEPUI_REGISTRY_ROOT ??
  path.join(process.cwd(), "..", "..", "registry")

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

export interface HtmlComponentSource {
  html: string
  css: string
  tokens: string | null
  js: string | null
}

export async function getHtmlComponentSource(
  name: string
): Promise<HtmlComponentSource | null> {
  const dir = path.join(REGISTRY_ROOT, "html", name)

  const [html, css, tokens, js] = await Promise.all([
    readOptionalSourceFile(path.join(dir, `${name}.html`)),
    readOptionalSourceFile(path.join(dir, `${name}.css`)),
    readOptionalSourceFile(path.join(dir, "tokens.css")),
    readOptionalSourceFile(path.join(dir, `${name}.js`)),
  ])

  if (html === null || css === null) {
    return null
  }

  return { html, css, tokens, js }
}

export interface RegistryFile {
  path: string
  content: string
  type: string
  target?: string
}

export interface RegistryItem {
  name: string
  type: string
  title: string
  description?: string
  files: RegistryFile[]
}

const OUBLIC_REGISTRY_ROOT = path.join(process.cwd(), "public", "r")

export async function getRegistryItem2(
  target: string,
  component: string
): Promise<RegistryItem | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/r/${target}/${component}.json`,
    {
      // next: {
      //   revalidate: 3600,
      // },
    }
  )

  if (!response.ok) {
    return null
  }

  return response.json()
}

type Style = "ktm" | "tokyo"

type RegistryComponentOptions = {
  target: string
  name: string
  style?: Style
}

export async function getRegistryComponent({
  target,
  name,
  style = "ktm",
}: RegistryComponentOptions) {
  const filePath = path.join(
    process.cwd(),
    "examples",
    style,
    target,
    `${name}.tsx`
  )

  try {
    const content = await fs.readFile(filePath, "utf8")

    return JSON.parse(content)
  } catch {
    return null
  }
}

export async function getReactComponentSource({
  target,
  name,
  style = "ktm",
}: RegistryComponentOptions) {
  const filePath = path.join(
    process.cwd(),
    "examples",
    style,
    target,
    `${name}.tsx`
  )

  try {
    const content = await fs.readFile(filePath, "utf8")
    return content
  } catch {
    return null
  }
}

export async function getRegistryItem(
  target: TargetType,
  component: string
): Promise<RegistryItem> {
  const filePath = path.join(OUBLIC_REGISTRY_ROOT, target, `${component}.json`)

  const content = await fs.readFile(filePath, "utf8")

  return JSON.parse(content) as RegistryItem
}
