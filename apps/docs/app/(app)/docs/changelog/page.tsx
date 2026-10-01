import { TableOfContents } from "@/components/docs/table-of-contents"
import { absoluteUrl } from "@/lib/seo"
import { source } from "@/lib/source"
import { mdxComponents } from "@/mdx-components"
import { notFound } from "next/navigation"

export const revalidate = false
export const dynamic = "force-static"

export function generateMetadata() {
  return {
    title: "Changelog",
    description: "Latest updates and announcements.",
    openGraph: {
      title: "Changelog",
      description: "Latest updates and announcements.",
      type: "article",
      url: absoluteUrl("/docs/changelog"),
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            "Changelog"
          )}&description=${encodeURIComponent(
            "Latest updates and announcements."
          )}`,
        },
      ],
    },
  }
}

export default function ChangelogPage() {
  const page = source.getPage(["changelog"])

  if (!page) {
    notFound()
  }

  const MDX = page.data.body

  return (
    <div
      data-slot="docs"
      className="flex w-full min-w-0 scroll-mt-24 items-stretch px-4 pb-8 text-[1.05rem] sm:text-[15px]"
    >
      <div className="flex w-full min-w-0 justify-between gap-12">
        <main className="w-full min-w-0 flex-1 space-y-6 pt-8 [font-variant-ligatures:none]">
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center justify-between">
              <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl">
                Changelog
              </h1>
            </div>
            <p className="text-base text-muted-foreground sm:text-balance md:max-w-[80%]">
              Latest updates and announcements.
            </p>
          </div>

          <div className="typeset typeset-docs min-w-0">
            <MDX components={mdxComponents} />
          </div>
        </main>

        <TableOfContents items={page.data.toc} />
      </div>
    </div>
  )
}
