import { getIconForLanguageExtension } from "../icons"
import { CopyButton } from "./copy-button"
import { highlightCode } from "@/lib/highlight-code"
import { readFileFromRoot } from "@/lib/read-file"
import { getRegistryItem } from "@/lib/registry"
import { cn } from "cn"

export interface RegistryFile {
  path: string
  content: string
  type: string
  target?: string
}

export function trimCode(code: string | undefined) {
  return code?.replace(/\r?\n+$/, "") || ""
}

export async function ComponentSource({
  name,
  src,
  title,
  language,
  className,
  target = "html",
  fileTarget = "styles/button.css",
  darkTheme,
  highlightedCode,
  code,
}: React.ComponentProps<"div"> & {
  name?: string
  src?: string
  title?: string
  language?: string
  target?: string
  fileTarget?: string
  darkTheme?: string
  highlightedCode?: string
  code?: string
  className?: string
}) {
  if (!name && !src) {
    return null
  }

  const lang = language ?? title?.split(".").pop() ?? "tsx"

  if (highlightedCode && code) {
    return (
      <ComponentCode
        code={code}
        highlightedCode={highlightedCode}
        language={lang}
        title={title ?? `${name}`}
        className={className}
      />
    )
  }

  let rawCode: string | undefined

  if (name) {
    const item = await getRegistryItem(target, name)
    rawCode = item?.files?.find(
      (file: RegistryFile) => file.target === fileTarget
    )?.content
    rawCode = trimCode(rawCode)
  }

  if (src) {
    rawCode = await readFileFromRoot(src)
  }

  if (!rawCode) {
    return null
  }

  const highlightedCodeToUse = await highlightCode(rawCode, lang, darkTheme)

  return (
    <div className={cn("relative", className)}>
      <ComponentCode
        code={trimCode(rawCode)}
        highlightedCode={highlightedCodeToUse}
        language={lang}
        title={title}
        className={className}
      />
    </div>
  )
}

function ComponentCode({
  code,
  highlightedCode,
  language,
  title,
  className,
}: {
  code: string
  highlightedCode: string
  language: string
  title: string | undefined
  className?: string
}) {
  return (
    <figure
      data-rehype-pretty-code-figure=""
      className={cn("[&>pre]:max-h-96", className)}
    >
      {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          className="[&_svg]:text-code-foreground flex items-center gap-2 font-mono text-muted-foreground [&_svg]:size-4"
          data-language={language}
        >
          {getIconForLanguageExtension(language)}
          {title}
        </figcaption>
      )}
      <CopyButton
        value={code}
        className="absolute top-1.5 right-2 z-40 w-auto cursor-pointer bg-transparent px-1.75"
      />
      <div
        data-not-typeset
        className={cn(
          "mb-0 max-h-100 scroll-fade scrollbar-none overflow-auto px-2 pt-3 pb-4 text-sm leading-relaxed [&_pre]:bg-transparent!",
          "[&_pre]:font-code! [&_pre]:m-0 [&_pre]:scrollbar-none [&_pre]:text-base [&_pre]:wrap-break-word [&_pre]:whitespace-pre-wrap"
        )}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </figure>
  )
}
