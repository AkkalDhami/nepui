import { Metadata, Route } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FrameworkTabs } from "@/components/docs/framework-tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { ComponentPreview } from "@/components/preview/component-preview"
import { JsonLd } from "@/components/seo/json-ld"
import { Button } from "@/components/ui/button"
import {
  createBreadcrumbJsonLd,
  createTechArticleJsonLd,
  getDocsBreadcrumbs,
  createDocsPageMetadata,
} from "@/lib/seo"
import { source } from "@/lib/source"
import { mdxComponents } from "@/mdx-components"
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr"
import { findNeighbour } from "fumadocs-core/page-tree"
import { FrameworkTabs } from "@/components/docs/framework-tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { ComponentPreview } from "@/components/preview/component-preview"
import { JsonLd } from "@/components/seo/json-ld"
import { Button } from "@/components/ui/button"
import {
  createBreadcrumbJsonLd,
  createTechArticleJsonLd,
  getDocsBreadcrumbs,
  createDocsPageMetadata,
} from "@/lib/seo"
import { source } from "@/lib/source"
import { mdxComponents } from "@/mdx-components"
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr"
import { findNeighbour } from "fumadocs-core/page-tree"
import { FrameworkTabs } from "@/components/docs/framework-tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { ComponentPreview } from "@/components/preview/component-preview"
import { JsonLd } from "@/components/seo/json-ld"
import { Button } from "@/components/ui/button"
import {
  createBreadcrumbJsonLd,
  createTechArticleJsonLd,
  getDocsBreadcrumbs,
  createDocsPageMetadata,
} from "@/lib/seo"
import { source } from "@/lib/source"
import { mdxComponents } from "@/mdx-components"
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr"
import { findNeighbour } from "fumadocs-core/page-tree"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

type DocsPageProps = {
  params: Promise<{
    slug?: string[]
  }>
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const resolved = await params
  const page = getDocsPage(resolved.slug)

  if (!page) {
    return {}
  }

  return createDocsPageMetadata({
    title: page.data.title,
    description: page.data.description,
    path: page.url,
  })
}

function getDocsPage(slug?: string[]) {
  if (slug && slug.length > 0) {
    return source.getPage(slug)
  }

  // TODO: Remove this filter
  const defaultPage = source
    .getPages()
    .filter(
      (page) =>
        !page.url.startsWith("/docs/icons") &&
        !page.url.startsWith("/docs/logos") &&
        !page.url.startsWith("/docs/scroll-bars")
    )
    .sort((a, b) => a.url.localeCompare(b.url))[0]

  return (
    defaultPage ??
    source.getPages().sort((a, b) => a.url.localeCompare(b.url))[0] ??
    null
  )
}

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) {
    notFound()
  }

  const doc = page.data
  const MDX = doc.body

  const isComponentPage = params.slug?.[0] === "components"
  const breadcrumbs = getDocsBreadcrumbs(page.url, page.data.title)

  const itemName = params.slug?.[2]?.trim() || ""

  const isChangelog = params.slug?.[0] === "changelog"
  const isHtmlDocs = params.slug?.[1] === "html" && itemName
  const neighbours = isChangelog
    ? { previous: null, next: null }
    : findNeighbour(source.pageTree, page.url)

  const contributors = doc.contributor
    ? Array.isArray(doc.contributor)
      ? doc.contributor
      : [doc.contributor]
    : []

  return (
    <div
      data-slot="docs"
      className="flex max-w-code scroll-mt-24 items-stretch pb-8 xl:w-full"
    >
      <JsonLd
        data={[
          createTechArticleJsonLd({
            title: page.data.title,
            description: page.data.description,
            path: page.url,
          }),
          createBreadcrumbJsonLd(breadcrumbs),
        ]}
      />
      <div className="flex justify-between gap-12">
        <main className="flex-1 space-y-6 pt-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between md:items-start">
              <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl">
                {doc.title}
              </h1>
              <div className="docs-nav flex items-center gap-2">
                <div className="hidden sm:block">
                  {/* <DocsCopyPage page={raw} url={absoluteUrl(page.url)} /> */}
                </div>
                <div className="ml-auto flex gap-2">
                  {neighbours.previous && (
                    <Button
                      variant="secondary"
                      size="icon"
                      nativeButton={false}
                      className="extend-touch-target size-8 shadow-none md:size-9"
                      render={
                        <Link href={neighbours.previous.url as Route}>
                          <ArrowLeftIcon />
                          <span className="sr-only">Previous</span>
                        </Link>
                      }
                    ></Button>
                  )}
                  {neighbours.next && (
                    <Button
                      variant="secondary"
                      size="icon"
                      nativeButton={false}
                      className="extend-touch-target size-8 shadow-none md:size-9"
                      render={
                        <Link href={neighbours.next.url as Route}>
                          <span className="sr-only">Next</span>
                          <ArrowRightIcon />
                        </Link>
                      }
                    ></Button>
                  )}
                </div>
              </div>
            </div>

            {doc.description && (
              <p className="text-base text-muted-foreground sm:text-balance md:max-w-[80%]">
                {doc.description}
              </p>
            )}
          </div>

          {isComponentPage && (
            <div className="mb-8">
              <FrameworkTabs />
            </div>
          )}

          {isHtmlDocs && (
            <>
              <ComponentPreview name={itemName} />
              <hr className="mt-10" />
            </>
          )}
          <div className="typeset typeset-docs">
            <MDX components={mdxComponents} />
          </div>
          {contributors?.length > 0 && (
            <div className="border-t py-6">
              <p className="text-sm tracking-wide text-muted-foreground uppercase">
                {contributors?.length > 1 ? "Contributors" : "Contributor"}
              </p>

              {contributors?.map((item, i) => (
                <div
                  key={`${item.avatar}-${i + 1}-${i}`}
                  className="mt-2 flex items-center gap-2"
                >
                  <img
                    height={32}
                    width={32}
                    src={item.avatar}
                    alt={item.name}
                    className="size-10 rounded-full border object-cover p-1"
                  />

                  <Link
                    href={item.url as Route}
                    target="_blank"
                    className="text-base font-medium underline-offset-2 hover:underline"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </main>

        <TableOfContents items={page.data.toc} />
      </div>
    </div>
  )
}
