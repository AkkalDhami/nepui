import { DocsLayout } from "fumadocs-ui/layouts/docs"

import { baseOptions } from "@/components/layouts/layout.shared"
import { source } from "@/lib/source"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  )
}
