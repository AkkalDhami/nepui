import { highlightCode } from "@/lib/highlight-code"
import { getHtmlComponentSource, getReactComponentSource } from "@/lib/registry"
import { HtmlComponentPreview } from "./html-component-preview"
import { Button } from "@nepui/react/button/button"
import { ReactPreview } from "./react-preview"
import { ArrowUpIcon } from "@phosphor-icons/react/ssr"
import { ComponentSource, trimCode } from "@/components/docs/component-source"
import { getExample } from "@/lib/get-example"
import { createElement } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ComponentPreviewProps {
  name: string
  target?: "html" | "react"
  className?: string
  type?: "default" | "example"
}

export async function ComponentPreview({
  name,
  target = "react",
  className,
  type = "default",
}: ComponentPreviewProps) {
  if (target === "html") {
    const source = await getHtmlComponentSource(name)

    const [htmlHighlighted, cssHighlighted, tokensHighlighted, jsHighlighted] =
      await Promise.all([
        highlightCode(source.html, "html", "ayu-dark"),
        highlightCode(source.css, "css", "ayu-dark"),
        highlightCode(source?.tokens || "", "css", "ayu-dark"),
        source?.js && highlightCode(source?.js, "js"),
      ])
    return (
      <HtmlComponentPreview
        name={name}
        html={source.html}
        tokens={source?.tokens || ""}
        css={source.css}
        js={source.js}
        htmlHighlighted={htmlHighlighted}
        tokensHighlighted={tokensHighlighted}
        cssHighlighted={cssHighlighted}
        jsHighlighted={source?.js ? jsHighlighted : null}
        className={className}
      />
    )
  }

  if (type === "example" && target === "react") {
    const source = await getReactComponentSource({ target, name })
    if (!source) {
      return (
        <p className="mt-6 text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-foreground">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      )
    }

    const refactoredSource = source
      ?.replaceAll("@nepui/react/", "@/components/nepui/")
      ?.replaceAll("export default function", "export function")

    const highlightedCode = await highlightCode(
      trimCode(refactoredSource),
      "tsx"
    )

    const ExampleComponent = getExample({
      style: "ktm",
      target: target,
      name: name,
    })

    return (
      <>
        <Tabs defaultValue="preview" className="mt-4 gap-0">
          <TabsList className="bg-transparent" variant="line">
            <TabsTrigger value="preview" className={"text-base"}>
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className={"text-base"}>
              Code
            </TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <ReactPreview className="mt-6 min-h-100">
              {createElement(ExampleComponent)}
            </ReactPreview>
          </TabsContent>
          <TabsContent value="code">
            <ComponentSource
              name={name}
              code={source}
              highlightedCode={highlightedCode}
              language="tsx"
              title={`${name}.tsx`}
              className={"mt-6"}
            />
          </TabsContent>
        </Tabs>
      </>
    )
  }

  return (
    <ReactPreview>
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
    </ReactPreview>
  )
}
