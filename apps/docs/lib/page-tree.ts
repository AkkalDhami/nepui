import type { source } from "@/lib/source"

export type PageTreeNode = (typeof source.pageTree)["children"][number]
export type PageTreeFolder = Extract<PageTreeNode, { type: "folder" }>
export type PageTreePage = Extract<PageTreeNode, { type: "page" }>

export function getAllPagesFromFolder(folder: PageTreeFolder): PageTreePage[] {
  const pages: PageTreePage[] = []

  for (const child of folder.children) {
    if (child.type === "page") {
      pages.push(child)
    } else if (child.type === "folder") {
      pages.push(...getAllPagesFromFolder(child))
    }
  }

  return pages
}

export function getPagesFromFolder(
  folder: PageTreeFolder,
  target: string
): PageTreePage[] {
  if (folder.$id === "components" || folder.name === "Components") {
    for (const child of folder.children) {
      if (child.type === "folder") {
        const isReact = child.$id === "react" || child.name === "React"
        const isHtml = child.$id === "html" || child.name === "Html"

        if ((target === "react" && isReact) || (target === "html" && isHtml)) {
          return child.children.filter(
            (c): c is PageTreePage => c.type === "page"
          )
        }
      }
    }

    return getAllPagesFromFolder(folder).filter(
      (page) => !page.url.endsWith("/components")
    )
  }

  return folder.children.filter(
    (child): child is PageTreePage => child.type === "page"
  )
}

export function getCurrentTarget(pathname: string): string {
  const targetMatch = pathname.match(/\/docs\/components\/(react|html)\//)
  return targetMatch ? targetMatch[1] : "react" //
}
