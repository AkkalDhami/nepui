"use client"

import * as React from "react"

import { Button } from "@/registry/react/button"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/registry/react/code-block"
import { useHighlightedCode } from "@/hooks/use-highlighted-code"

const code =
  'const sentence = "A very long line of code that does not fit in the box, so it either scrolls sideways or wraps onto the next line."'

export default function CodeBlockActionsDemo() {
  const [wrap, setWrap] = React.useState(false)
  const lines = useHighlightedCode(code, "js")

  return (
    <CodeBlock style={{ width: "100%", maxWidth: "32rem" }}>
      <CodeBlockHeader>
        <CodeBlockTitle>src/greet.js</CodeBlockTitle>
        <CodeBlockActions>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Toggle line wrap"
            aria-pressed={wrap}
            onClick={() => setWrap((value) => !value)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 6h18" />
              <path d="M3 12h15a3 3 0 1 1 0 6h-4" />
              <path d="m16 16-2 2 2 2" />
              <path d="M3 18h7" />
            </svg>
          </Button>
          <CodeBlockCopyButton value={code} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent wrap={wrap}>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}
