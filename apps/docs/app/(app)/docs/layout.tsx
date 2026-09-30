import { DocsMobileNav, DocsSidebar } from "@/components/layouts/docs-sidebar"
import { source } from "@/lib/source"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-5xl flex w-full min-w-0">
      <DocsSidebar tree={source.pageTree} />

      <DocsMobileNav tree={source.pageTree} />

      <div className="mx-auto w-full max-w-5xl min-w-0 flex-1 px-4 py-1 lg:px-8">
        {children}
      </div>
    </div>
  )
}
