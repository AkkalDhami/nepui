import { CodeBlock, CodeBlockContent } from "@/registry/react/code-block"

const error =
  "Error: Cannot find module './config'\n    at Module._resolveFilename (node:internal/modules/cjs/loader:1225:15)\n    at require (node:internal/modules/helpers:179:18)"

export default function CodeBlockDestructiveDemo() {
  return (
    <CodeBlock
      variant="destructive"
      style={{ width: "100%", maxWidth: "32rem" }}
    >
      <CodeBlockContent>{error}</CodeBlockContent>
    </CodeBlock>
  )
}
