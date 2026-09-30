import "server-only"

import fs from "node:fs/promises"
import path from "node:path"
import { HtmlPreviewFrame } from "./html-preview-frame"
import { cn } from "cn"

const REGISTRY_ROOT = path.join(process.cwd(), "../../")

interface HtmlPreviewProps {
  html: string
  tokens?: string
  cssPath?: string | string[]
  cssPaths?: string[]
  className?: string
}

export async function HtmlPreview({
  html,
  tokens,
  cssPath = "./apps/docs/app/styles/globals.css",
  cssPaths,
  className,
}: HtmlPreviewProps) {
  const targetCss = cssPaths ?? cssPath
  const paths = Array.isArray(targetCss) ? targetCss : [targetCss]

  const cssContents = await Promise.all(
    paths.map(async (p) => {
      const fullPath = path.join(/* turbopackIgnore: true */ REGISTRY_ROOT, p)
      try {
        return await fs.readFile(fullPath, "utf8")
      } catch {
        return ""
      }
    })
  )

  const css = cssContents.join("\n\n")

  return (
    <HtmlPreviewFrame
      html={html}
      css={css}
      tokens={tokens ?? null}
      className={cn("rounded-xl border", className)}
      js={null}
    />
  )
}
