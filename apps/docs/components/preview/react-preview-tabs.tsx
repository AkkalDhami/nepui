import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ReactPreviewTabsProps {
  children: React.ReactNode
  className?: string
}

export function ReactPreviewTabs({
  children,
  className,
}: ReactPreviewTabsProps) {
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

      <TabsContent value="preview">{children}</TabsContent>

      <TabsContent value="code" className="[&_figure]:my-1 [&_figure]:pt-0">
        {children}
      </TabsContent>
    </Tabs>
  )
}
