"use client"

import { useMemo, useState } from "react"

import { CodeEditor } from "./code-editor"

import { normalizeFiles, type PlaygroundFile } from "@/lib/playground"
import { HtmlPreview } from "@/components/preview/html-preview"
import { ArrowsClockwiseIcon, PlayIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

interface RegistryFile {
  path: string
  content: string
}

interface PlaygroundProps {
  name: string
  title: string
  files: RegistryFile[]
  tokens?: string
}

export function Playground({
  // name,
  title,
  files: registryFiles,
  tokens = "",
}: PlaygroundProps) {
  const initialFiles = useMemo(
    () => normalizeFiles(registryFiles),
    [registryFiles]
  )

  const [files, setFiles] = useState<PlaygroundFile[]>(initialFiles)

  const [, setPreviewFiles] = useState<PlaygroundFile[]>(initialFiles)

  const [activePath, setActivePath] = useState(initialFiles[0]?.path ?? "")

  const activeFile = files.find((file) => file.path === activePath)

  function updateFile(path: string, content: string) {
    setFiles((current) =>
      current.map((file) =>
        file.path === path
          ? {
              ...file,
              content,
            }
          : file
      )
    )
  }

  function run() {
    setPreviewFiles(files)
  }

  function reset() {
    const resetFiles = normalizeFiles(registryFiles)

    setFiles(resetFiles)
    setPreviewFiles(resetFiles)
    setActivePath(resetFiles[0]?.path ?? "")
  }
  if (!activeFile) {
    return null
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="flex h-12 items-center justify-between border-b px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="truncate">{title}</div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={"secondary"} onClick={reset} size={"icon-lg"}>
            <ArrowsClockwiseIcon />
          </Button>

          <button
            type="button"
            onClick={run}
            className="hidden items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background"
          >
            <PlayIcon />
            Run
          </button>
        </div>
      </div>

      {/* File tabs */}
      <div className="flex overflow-x-auto border-b">
        {files.map((file) => {
          const fileName = file.path.split("/").pop() ?? file.path

          const active = file.path === activePath

          return (
            <button
              key={file.path}
              type="button"
              onClick={() => setActivePath(file.path)}
              className={[
                "border-r px-4 py-2.5 font-mono text-xs",
                "transition-colors",
                active
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              ].join(" ")}
            >
              {fileName}
            </button>
          )
        })}
      </div>

      {/* Editor + preview */}
      <div className="grid lg:grid-cols-2">
        <div className="h-full max-h-120 min-w-0 scroll-fade overflow-y-auto border-b lg:border-r lg:border-b-0">
          <CodeEditor
            value={activeFile.content}
            language={activeFile.language}
            onChange={(content) => updateFile(activeFile.path, content)}
          />
        </div>

        {/* Preview */}
        <div className="h-full max-h-120 min-h-100 min-w-0 scroll-fade scrollbar-thin overflow-y-auto bg-muted/20 p-4">
          <HtmlPreview files={files} tokens={tokens} />
        </div>
      </div>
    </div>
  )
}
