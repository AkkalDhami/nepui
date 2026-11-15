"use client"

import { useHighlightedCode } from "@/hooks/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockLine,
} from "@/registry/react/code-block"

const code = `function greet(name) {
  const message = \`Hello, \${name}!\`
  console.log(message)
  return message
}`

export default function CodeBlockHighlightedDemo() {
  const lines = useHighlightedCode(code, "js")

  return (
    <CodeBlock style={{ width: "100%", maxWidth: "32rem" }}>
      <CodeBlockContent lineNumbers>
        {lines.map((line, index) => (
          <CodeBlockLine
            key={index}
            variant={index === 1 || index === 2 ? "highlighted" : "default"}
          >
            {line}
          </CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}
