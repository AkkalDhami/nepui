"use client"

import {
  AnchorProvider,
  ScrollProvider,
  TOCItem,
  type TOCItemType,
} from "fumadocs-core/toc"
import { useRef } from "react"

interface TableOfContentsProps {
  items: TOCItemType[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const containerRef = useRef<HTMLUListElement>(null)

  return (
    <aside className="sticky top-16 hidden h-fit w-48 xl:block">
      <p className="mb-4 text-sm font-medium">On this page</p>

      <AnchorProvider toc={items}>
        <ul ref={containerRef} className="text-sm">
          <ScrollProvider containerRef={containerRef}>
            {items.map((item) => (
              <li
                key={item.url}
                className={item.depth > 2 ? "pl-3" : undefined}
              >
                <TOCItem
                  href={item.url}
                  className="block border-l-2 border-transparent py-1 pl-3 text-muted-foreground transition-colors hover:text-foreground data-[active=true]:border-foreground data-[active=true]:font-medium data-[active=true]:text-foreground"
                >
                  {item.title}
                </TOCItem>
              </li>
            ))}
          </ScrollProvider>
        </ul>
      </AnchorProvider>
    </aside>
  )
}
