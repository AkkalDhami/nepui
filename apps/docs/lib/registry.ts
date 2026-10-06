import "server-only"

import fs from "node:fs/promises"
import path from "node:path"
import { TargetType } from "@/hooks/use-config"
import { ExamplesIndex } from "@/examples/__index__"

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

const PUBLIC_REGISTRY_ROOT = path.join(process.cwd(), "public", "r")

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

export async function getExampleSource({
  target,
  name,
  style = "ktm",
}: RegistryComponentOptions) {
  if (target === "react") {
    const filePath = path.join(
      process.cwd(),
      "examples",
      style,
      target,
      `${name}.tsx`
    )

    try {
      return await fs.readFile(filePath, "utf8")
    } catch {
      return null
    }
  }

  const examplePath = ExamplesIndex[style]?.[target]?.[name]

  if (typeof examplePath !== "string") {
    return null
  }

  try {
    return await fs.readFile(
      path.join(process.cwd(), "examples", examplePath),
      "utf8"
    )
  } catch {
    return null
  }
}

export async function getRegistryItem(
  target: TargetType,
  component: string
): Promise<RegistryItem> {
  const filePath = path.join(PUBLIC_REGISTRY_ROOT, target, `${component}.json`)

  const content = await fs.readFile(filePath, "utf8")

  return JSON.parse(content) as RegistryItem
}
