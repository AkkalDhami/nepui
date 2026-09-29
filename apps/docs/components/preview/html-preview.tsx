import "server-only"

import fs from "node:fs/promises"
import path from "node:path"
import { HtmlPreviewFrame } from "./html-preview-frame"
import { cn } from "cn"

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
      const fullPath = path.resolve(process.cwd(), "../..", p)
      try {
        return await fs.readFile(fullPath, "utf8")
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
          throw new Error(
            `[HtmlPreview] CSS file not found at: ${fullPath} (resolved from "${p}")`
          )
        }
        throw error
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
