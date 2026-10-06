import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HtmlPreview } from "@/components/preview/html-preview"

interface HtmlPreviewTabsProps {
  html: string
  styles?: string[]
  children: React.ReactNode
  className?: string
}

/**
 * @deprecated
 */

export function HtmlPreviewTabs({
  html,
  styles,
  children,
  className,
}: HtmlPreviewTabsProps) {
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
          styles={(Array.isArray(styles) ? styles : [styles]) as string[]}
          html={html}
          className="mt-3"
        />
      </TabsContent>

      <TabsContent
        value="code"
        className="mt-2 [&_figure]:my-1 [&_figure]:pt-0"
      >
        {children}
      </TabsContent>
    </Tabs>
  )
}
