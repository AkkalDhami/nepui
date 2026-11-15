"use client"

import { useHighlightedCode } from "@/hooks/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockLine,
} from "@/registry/react/code-block"

const code = `function greet(name) {
  return "Hello"
  return \`Hello, \${name}!\`
}`

export default function CodeBlockDiffDemo() {
  const lines = useHighlightedCode(code, "js")

  return (
    <CodeBlock style={{ width: "100%", maxWidth: "32rem" }}>
      <CodeBlockContent>
        {lines.map((line, index) => (
          <CodeBlockLine
            key={index}
            variant={
              index === 1 ? "removed" : index === 2 ? "added" : "default"
            }
          >
            {line}
          </CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}
