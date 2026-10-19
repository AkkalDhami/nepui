import type { RegistryFile } from "@/types"

export function rewriteComponentImports(
  files: RegistryFile[],
  target: "react" | "html"
): RegistryFile[] {
  if (target !== "react") return files

  return files.map((file) => ({
    ...file,
    content:
      file.content
        ?.replace(/\r?\n+$/, "")
        .replaceAll("@/registry/react/", "@/components/nepui/")
        .replaceAll(
          'import "../../styles/tokens.css"',
          'import "../tokens.css"'
        ) || "",
  }))
}
