import { highlightCode } from "@/lib/highlight-code"
import { getHtmlComponentSource } from "@/lib/registry"
import { HtmlComponentPreview } from "./html-component-preview"
import { Button } from "@nepui/react/button/button"
import { ReactPreview } from "./react-preview"
import { ArrowUpIcon } from "@phosphor-icons/react/ssr"

interface ComponentPreviewProps {
  name: string
  target?: "html" | "react"
  className?: string
}

export async function ComponentPreview({
  name,
  target = "html",
  className,
}: ComponentPreviewProps) {
  const source = await getHtmlComponentSource(name)

  const [htmlHighlighted, cssHighlighted, jsHighlighted] = await Promise.all([
    highlightCode(source.html, "html"),
    highlightCode(source.css, "css"),
    source?.js && highlightCode(source?.js, "js"),
  ])

  return (
    <>
      {target === "html" && (
        <HtmlComponentPreview
          name={name}
          html={source.html}
          css={source.css}
          js={source.js}
          htmlHighlighted={htmlHighlighted}
          cssHighlighted={cssHighlighted}
          jsHighlighted={source?.js ? jsHighlighted : null}
          className={className}
        />
      )}

      {target === "react" && (
        <ReactPreview>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "start",
                gap: "8px",
              }}
            >
              <Button size="xs" variant="outline">
                Extra Small
              </Button>
              <Button size="icon-xs" aria-label="Submit" variant="outline">
                <ArrowUpIcon />
              </Button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "start",
                gap: "8px",
              }}
            >
              <Button size="sm" variant="outline">
                Small
              </Button>
              <Button size="icon-sm" aria-label="Submit" variant="outline">
                <ArrowUpIcon />
              </Button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "start",
                gap: "8px",
              }}
            >
              <Button variant="outline">Default</Button>
              <Button size="icon" aria-label="Submit" variant="outline">
                <ArrowUpIcon />
              </Button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "start",
                gap: "8px",
              }}
            >
              <Button variant="outline" size="lg">
                Large
              </Button>
              <Button size="icon-lg" aria-label="Submit" variant="outline">
                <ArrowUpIcon />
              </Button>
            </div>
          </div>
        </ReactPreview>
      )}
    </>
  )
}
