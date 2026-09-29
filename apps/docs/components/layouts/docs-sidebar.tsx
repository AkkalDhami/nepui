/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { PAGES_NEW } from "@/lib/docs"
import { cn } from "@/lib/utils"
import { ListIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"
import type * as PageTree from "fumadocs-core/page-tree"
import { useSearchContext } from "fumadocs-ui/contexts/search"
import { LayoutGroup, motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useState } from "react"

const normalize = (url: string) =>
  url.length > 1 ? url.replace(/\/$/, "") : url

type FlatLink = {
  name: React.ReactNode
  url: string
  urls: string[]
  external?: boolean
}
const TOP_LEVEL_SECTIONS = [
  {
    name: "Introduction",
    href: "/docs",
  },
  {
    name: "Components",
    href: "/docs/components",
  },
  {
    name: "Installation",
    href: "/docs/installation",
  },
  // {
  //   name: "CLI",
  //   href: "/docs/cli",
  // },
  {
    name: "Changelog",
    href: "/docs/changelog",
  },
]

const SECTION_LINKS: FlatLink[] = TOP_LEVEL_SECTIONS.map((s) => ({
  name: s.name,
  url: s.href,
  urls: [s.href],
}))

function flatten(nodes: PageTree.Node[]): FlatLink[] {
  const map = new Map<string, FlatLink>()

  const walk = (list: PageTree.Node[]) => {
    for (const node of list) {
      if (node.type === "page") {
        const key = String(node.name)
        const existing = map.get(key)
        if (existing) existing.urls.push(normalize(node.url))
        else
          map.set(key, {
            name: node.name,
            url: node.url,
            urls: [normalize(node.url)],
            external: node.external,
          })
      } else if (node.type === "folder") {
        walk(node.children)
      }
    }
  }

  walk(nodes)
  return [...map.values()]
}

function SidebarLink({
  url,
  urls,
  external,
  children,
}: {
  url: string
  urls: string[]
  external?: boolean
  children: React.ReactNode
}) {
  const pathname = normalize(usePathname())
  const active = urls.includes(pathname)

  const isNew = PAGES_NEW.includes(url)

  return (
    <Link
      href={url as never}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      data-active={active}
      className="relative flex items-center gap-2 rounded-md px-3 py-1.5 text-[15px] text-foreground transition-colors hover:bg-muted hover:text-foreground data-[active=true]:font-medium data-[active=true]:text-foreground"
    >
      {active && (
        <motion.span
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-md bg-accent"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
      )}
      <span className="relative z-10">{children}</span>
      {isNew && (
        <>
          <span className="sr-only z-10">New</span>
          <span
            aria-hidden="true"
            className="z-10 flex size-2 rounded-full bg-blue-500"
          />
        </>
      )}
    </Link>
  )
}

function SidebarGroup({
  label,
  href,
  links,
}: {
  label?: React.ReactNode
  href?: string
  links: FlatLink[]
}) {
  return (
    <div className="space-y-1">
      {label &&
        (href ? (
          <Link
            href={href as never}
            className="block px-3 pt-4 pb-2 text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {label}
          </Link>
        ) : (
          <p className="px-3 pt-4 pb-2 text-[15px] font-medium text-muted-foreground">
            {label}
          </p>
        ))}
      {links.map((link) => (
        <SidebarLink
          key={link.url}
          url={link.url}
          urls={link.urls}
          external={link.external}
        >
          {link.name}
        </SidebarLink>
      ))}
    </div>
  )
}

function SidebarItems({ tree }: { tree: PageTree.Root }) {
  return (
    <>
      <SidebarGroup label="Sections" links={SECTION_LINKS} />

      {tree.children.map((node, i) => {
        // top-level pages are covered by the Sections group above
        if (node.type !== "folder") return null

        const links = flatten(node.children)
        return <SidebarGroup key={i} label={node.name} links={links} />
      })}
    </>
  )
}

function SearchButton() {
  const { setOpenSearch, enabled } = useSearchContext()
  if (!enabled) return null

  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      className="mt-3 flex w-full items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent"
    >
      <MagnifyingGlassIcon className="size-4" />
      <span>Search</span>
      <span className="ml-auto flex gap-1">
        <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
          Ctrl
        </kbd>
        <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
          K
        </kbd>
      </span>
    </button>
  )
}

function SidebarContent({ tree }: { tree: PageTree.Root }) {
  return (
    <LayoutGroup id={useId()}>
      <div className="flex h-full flex-col">
        <div className="space-y-4 p-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            nepui
          </Link>
          <SearchButton />
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-6">
          <SidebarItems tree={tree} />
        </nav>
      </div>
    </LayoutGroup>
  )
}

/** Desktop sidebar (hidden below `lg`) */
export function DocsSidebar({
  tree,
  className,
}: {
  tree: PageTree.Root
  className?: string
}) {
  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-svh w-64 shrink-0 border-r bg-background lg:block",
        className
      )}
    >
      <SidebarContent tree={tree} />
    </aside>
  )
}

/** Mobile top bar + drawer (hidden from `lg` up) */
export function DocsMobileNav({ tree }: { tree: PageTree.Root }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <ListIcon className="size-5" />
      </Button>
      <Link href="/" className="font-semibold tracking-tight">
        nepui
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 gap-0 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <SidebarContent tree={tree} />
        </SheetContent>
      </Sheet>
    </header>
  )
}
