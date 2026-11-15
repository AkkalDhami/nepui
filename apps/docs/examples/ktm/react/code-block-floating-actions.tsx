"use client"

import { useHighlightedCode } from "@/hooks/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockLine,
} from "@/registry/react/code-block"

const code = `function greet(name) {
  const message = \`Hello, \${name}!\`
  console.log(message)
  return message
}`

export default function CodeBlockFloatingActionsDemo() {
  const lines = useHighlightedCode(code, "js")

  return (
    <CodeBlock style={{ width: "100%", maxWidth: "32rem" }}>
      <CodeBlockActions>
        <CodeBlockCopyButton value={code} />
      </CodeBlockActions>
      <CodeBlockContent>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}
