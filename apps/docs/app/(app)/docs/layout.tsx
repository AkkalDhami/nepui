import { DocsSidebar } from "@/components/layouts/docs-sidebar"
import { source } from "@/lib/source"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto flex w-full max-w-7xl min-w-0 gap-12">
      <DocsSidebar tree={source.pageTree} />

      <div className="mx-auto w-full min-w-0 flex-1 py-1">{children}</div>
    </div>
  )
}
