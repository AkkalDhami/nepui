import "server-only"

import fs from "node:fs/promises"
import path from "node:path"
import { HtmlPreviewFrame } from "./html-preview-frame"
import { cn } from "cn"

const REGISTRY_ROOT = path.join(process.cwd(), "registry", "html")

interface HtmlPreviewProps {
  html: string
  tokens?: string
  height?: string
  styles?: string[]
  className?: string
  scripts?: string[]
  scriptType?: "module" | "text/javascript"
}

export async function HtmlPreview({
  html,
  tokens,
  height,
  styles = ["/app/styles/globals.css"],
  className,
  scripts,
  scriptType,
}: HtmlPreviewProps) {
  const targetCss = styles
  const paths = Array.isArray(targetCss) ? targetCss : [targetCss]

  const cssContents = await Promise.all(
    paths.map(async (p) => {
      const fullPath = path.join(REGISTRY_ROOT, p)
      try {
        return await fs.readFile(fullPath, "utf8")
      } catch {
        return ""
      }
    })
  )

  const previewScripts = await Promise.all(
    (scripts ?? []).map(async (script) => {
      if (/^https?:\/\//i.test(script)) {
        return { src: script }
      }

      const fullPath = path.join(REGISTRY_ROOT, script)
      try {
        return { code: await fs.readFile(fullPath, "utf8") }
      } catch {
        return { code: "" }
      }
    })
  )

  const css = cssContents.join("\n\n")

  return (
    <HtmlPreviewFrame
      html={html}
      css={css}
      height={height}
      tokens={tokens ?? null}
      className={cn("rounded-xl border", className)}
      js={null}
      scripts={previewScripts}
      scriptType={scriptType}
    />
  )
}
