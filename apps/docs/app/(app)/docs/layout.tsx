import { baseOptions } from "@/components/layouts/layout.shared"
import { source } from "@/lib/source"
import { DocsLayout } from "fumadocs-ui/layouts/docs"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions()}>
      <div className="border-edge relative mx-auto flex max-w-7xl gap-8 px-4 py-1">
        <div className="h-full w-full">{children}</div>
      </div>
    </DocsLayout>
  )
}
