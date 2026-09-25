"use client"

import { useState } from "react"
import { CodeEditor } from "./code-editor"

interface HtmlPlaygroundProps {
  initialHtml: string
  initialCss: string
}

export function HtmlPlayground({
  initialHtml,
  initialCss,
}: HtmlPlaygroundProps) {
  const [html, setHtml] = useState(initialHtml)

  const [css, setCss] = useState(initialCss)

  return (
    <div className="grid grid-cols-2">
      <div>
        <CodeEditor value={html} language="html" onChange={setHtml} />

        <CodeEditor value={css} language="css" onChange={setCss} />
      </div>

      <iframe
        title="Preview"
        srcDoc={`
          <!doctype html>
          <html>
            <head>
              <style>${css}</style>
            </head>

            <body>
              ${html}
            </body>
          </html>
        `}
        sandbox=""
      />
    </div>
  )
}
