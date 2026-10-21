import { highlightCode } from "@/lib/highlight-code"
import { getExampleSource } from "@/lib/registry"
import { ReactPreview } from "./react-preview"
import { ComponentSource, trimCode } from "@/components/docs/component-source"
import { getExample } from "@/lib/get-example"
import { createElement } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HtmlPreview } from "./html-preview"
import { cn } from "cn"

interface ComponentPreviewProps {
  name: string
  target?: "html" | "react"
  className?: string
  styles?: string[]
}

export async function ComponentPreview({
  name,
  target = "react",
  className,
  styles,
}: ComponentPreviewProps) {
  const source = await getExampleSource({ target, name })
  if (!source) {
    return (
      <p className="mt-6 text-sm text-amber-600">
        Component{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-foreground">
          {name}
        </code>{" "}
        not found in <code className="text-foreground">examples/{target}</code>
      </p>
    )
  }

  if (target === "html") {
    const highlightedCode = await highlightCode(trimCode(source), "html")
    const nameParts = name.split("-")

    const groupedComponents = ["button-group", "input-group"]

    const componentName = groupedComponents.includes(
      nameParts.slice(0, 2).join("-")
    )
      ? nameParts.slice(0, 2).join("-")
      : nameParts[0]

    return (
      <Tabs defaultValue="preview" className={cn("mt-4 gap-0", className)}>
        <TabsList className="bg-transparent" variant="line">
          <TabsTrigger value="preview" className="text-base">
            Preview
          </TabsTrigger>

          <TabsTrigger value="code" className="text-base">
            Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <HtmlPreview
            html={source}
            styles={[
              `/tokens.css`,
              `/${componentName}/${componentName}.css`,
              ...(styles ?? []),
            ]}
            className="mt-6"
          />
        </TabsContent>

        <TabsContent value="code">
          <ComponentSource
            name={name}
            code={source}
            highlightedCode={highlightedCode}
            language="html"
            title={`${name}.html`}
            className="mt-6"
          />
        </TabsContent>
      </Tabs>
    )
  }

  if (target === "react") {
    const refactoredSource = source
      ?.replaceAll("@nepui/react/", "@/components/nepui/")
      ?.replaceAll("@/registry/react/", "@/components/nepui/")
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
      <Tabs defaultValue="preview" className={cn("mt-4 gap-0", className)}>
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
    )
  }
}
