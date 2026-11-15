"use client"

import { useHighlightedCode } from "@/hooks/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockLine,
} from "@/registry/react/code-block"

const output = `$ npm install nepui
added 12 packages in 2s

4 packages are looking for funding
  run \`npm fund\` for details`

export default function CodeBlockSizeDemo() {
  const lines = useHighlightedCode(output, "ansi")

  return (
    <CodeBlock size="sm" style={{ width: "100%", maxWidth: "32rem" }}>
      <CodeBlockContent wrap lineNumbers>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}
