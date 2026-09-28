"use client"

import {
  AnchorProvider,
  ScrollProvider,
  TOCItem,
  useActiveAnchor,
  type TOCItemType,
} from "fumadocs-core/toc"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useMemo, useRef, useState } from "react"

const MAX_DEPTH = 3 // h2 and h3 only (h1 is the page title)
const IGNORE_CLASS = "toc-ignore"

interface TableOfContentsProps {
  items: TOCItemType[]
}

/** Collect ids of headings marked with `.toc-ignore` (or headings inside such an element). */
function getIgnoredIds(): Set<string> {
  const ids = new Set<string>()
  document.querySelectorAll(`.${IGNORE_CLASS}`).forEach((el) => {
    if (el.id) ids.add(el.id)
    el.querySelectorAll("[id]").forEach((child) => ids.add(child.id))
  })
  return ids
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [ignored, setIgnored] = useState<Set<string>>(new Set())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIgnored(getIgnoredIds())
    setReady(true)
  }, [items])

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        if (item.depth > MAX_DEPTH) return false
        const id = decodeURIComponent(item.url.replace(/^#/, ""))
        return !ignored.has(id)
      }),
    [items, ignored]
  )

  if (filtered.length === 0) return null

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="sticky top-16 hidden h-fit w-56 shrink-0 xl:block"
    >
      <p className="mb-4 text-sm font-medium">On this page</p>

      <AnchorProvider toc={filtered}>
        <TocList items={filtered} />
      </AnchorProvider>
    </motion.aside>
  )
}

function TocList({ items }: { items: TOCItemType[] }) {
  const containerRef = useRef<HTMLUListElement>(null)
  const activeId = useActiveAnchor() // id without the "#"

  return (
    <ul ref={containerRef} className="relative text-sm">
      <ScrollProvider containerRef={containerRef}>
        <AnimatePresence initial={false}>
          {items.map((item, i) => {
            const isActive = item.url === `#${activeId}`

            return (
              <motion.li
                key={item.url}
                layout="position"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2, delay: i * 0.02 }}
                className="relative"
              >
                {/* Sliding active indicator, shared between items via layoutId */}
                {isActive && (
                  <motion.span
                    layoutId="toc-indicator"
                    className="absolute inset-y-0 left-0 w-0.5 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}

                <TOCItem
                  href={item.url}
                  className={
                    "block py-1 pr-2 text-muted-foreground transition-colors hover:text-foreground data-[active=true]:font-medium data-[active=true]:text-foreground " +
                    (item.depth > 2 ? "pl-6" : "pl-3")
                  }
                >
                  {item.title}
                </TOCItem>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ScrollProvider>
      {/* faint track behind the indicator */}
      <span className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-0.5 rounded-full bg-border" />
    </ul>
  )
}
