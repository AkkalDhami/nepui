import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HtmlPreview } from "@/components/preview/html-preview"

interface HtmlPreviewTabsProps {
  html: string
  cssPath?: string | string[]
  cssPaths?: string[]
  tokens?: string
  children: React.ReactNode
  className?: string
}

export function HtmlPreviewTabs({
  html,
  cssPath,
  cssPaths,
  tokens,
  children,
  className,
}: HtmlPreviewTabsProps) {
  const targetCss = cssPaths ?? cssPath

  return (
    <Tabs defaultValue="preview" className={className}>
      <TabsList className="bg-transparent text-foreground" variant="line">
        <TabsTrigger value="preview" className="pb-2 text-base">
          Preview
        </TabsTrigger>

        <TabsTrigger value="code" className="pb-2 text-base">
          Code
        </TabsTrigger>
      </TabsList>

      <TabsContent value="preview">
        <HtmlPreview
          cssPath={targetCss}
          tokens={tokens}
          html={html}
          className="mt-2"
        />
      </TabsContent>

      <TabsContent value="code" className="[&_figure]:my-1 [&_figure]:pt-0">
        {children}
      </TabsContent>
    </Tabs>
  )
}
