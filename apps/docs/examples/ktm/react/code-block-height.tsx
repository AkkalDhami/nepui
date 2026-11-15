import type * as React from "react"

import { CodeBlock, CodeBlockContent } from "@/registry/react/code-block"

const lines =
  "line 1: processing step 1 of 24\nline 2: processing step 2 of 24\nline 3: processing step 3 of 24\nline 4: processing step 4 of 24\nline 5: processing step 5 of 24\nline 6: processing step 6 of 24\nline 7: processing step 7 of 24\nline 8: processing step 8 of 24\nline 9: processing step 9 of 24\nline 10: processing step 10 of 24\nline 11: processing step 11 of 24\nline 12: processing step 12 of 24\nline 13: processing step 13 of 24\nline 14: processing step 14 of 24\nline 15: processing step 15 of 24\nline 16: processing step 16 of 24\nline 17: processing step 17 of 24\nline 18: processing step 18 of 24\nline 19: processing step 19 of 24\nline 20: processing step 20 of 24\nline 21: processing step 21 of 24\nline 22: processing step 22 of 24\nline 23: processing step 23 of 24\nline 24: processing step 24 of 24"

export default function CodeBlockHeightDemo() {
  return (
    <CodeBlock style={{ width: "100%", maxWidth: "32rem" }}>
      <CodeBlockContent
        lineNumbers
        style={{ "--np-code-block-max-height": "12rem" } as React.CSSProperties}
      >
        {lines}
      </CodeBlockContent>
    </CodeBlock>
  )
}
