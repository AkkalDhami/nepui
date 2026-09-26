import { notFound } from "next/navigation"
import { DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page"

import { source } from "@/lib/source"
import { FrameworkTabs } from "@/components/docs/framework-tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { mdxComponents } from "@/mdx-components"

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) {
    notFound()
  }

  const doc = page.data
  const MDX = doc.body
  const isComponentPage = params.slug?.[0] === "components"

  return (
    <DocsPage>
      <div className="flex justify-between gap-12">
        <main className="flex-1">
          <DocsTitle>{page.data.title}</DocsTitle>

          <DocsDescription>{page.data.description}</DocsDescription>

          {isComponentPage && (
            <div className="mb-8">
              <FrameworkTabs />
            </div>
          )}

          <div className="typeset typeset-docs">
            <MDX components={mdxComponents} />
          </div>
        </main>

        <TableOfContents items={page.data.toc} />
      </div>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}
