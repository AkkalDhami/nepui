import { getPreviewCss } from "./preview"

export type PlaygroundLanguage =
  "html" | "css" | "javascript" | "typescript" | "text"

export interface PlaygroundFile {
  path: string
  language: PlaygroundLanguage
  content: string
}

export function getLanguage(path: string): PlaygroundLanguage {
  const extension = path.split(".").pop()?.toLowerCase()

  switch (extension) {
    case "html":
      return "html"

    case "css":
      return "css"

    case "js":
    case "jsx":
      return "javascript"

    case "ts":
    case "tsx":
      return "typescript"

    default:
      return "text"
  }
}

export function normalizeFiles(
  files: {
    path: string
    content: string
  }[]
): PlaygroundFile[] {
  return files.map((file) => ({
    ...file,
    language: getLanguage(file.path),
  }))
}

export interface PlaygroundFile {
  path: string
  language: PlaygroundLanguage
  content: string
}

function escapeScriptContent(content: string) {
  // Prevent user code from prematurely closing the
  // <script> element inside srcDoc.
  return content.replace(/<\/script/gi, "<\\/script")
}

export function buildHtmlDocument(files: PlaygroundFile[]) {
  const html = files.find((file) => file.language === "html")?.content ?? ""

  const css = files
    .filter((file) => file.language === "css")
    .map((file) => file.content)
    .join("\n\n")

  const js = files
    .filter(
      (file) => file.language === "javascript" || file.language === "typescript"
    )
    .map((file) => file.content)
    .join("\n\n")

  const safeJs = escapeScriptContent(js)

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">

    <style>
      /* Preview reset */
      ${getPreviewCss("playground")}
    </style>

    <style>
      /* Component CSS */
      ${css}
    </style>
  </head>

  <body>
    ${html}

    ${
      safeJs.trim()
        ? `<script>
      ${safeJs}
    </script>`
        : ""
    }
  </body>
</html>`
}
