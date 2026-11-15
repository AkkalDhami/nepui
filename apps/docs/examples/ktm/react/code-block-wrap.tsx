"use client"

import { useHighlightedCode } from "@/hooks/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockLine,
} from "@/registry/react/code-block"

const code = `const sentence = "A very long line of code that does not fit in the box, so it either scrolls sideways or wraps onto the next line."`

export default function CodeBlockWrapDemo() {
  const lines = useHighlightedCode(code, "js")

  return (
    <CodeBlock style={{ width: "100%", maxWidth: "32rem" }}>
      <CodeBlockContent wrap>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}
