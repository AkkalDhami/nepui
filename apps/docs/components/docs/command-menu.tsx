/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { useDocsSearch } from "fumadocs-core/search/client"
import {
  ArrowElbowDownLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  SelectionIcon,
} from "@phosphor-icons/react"
import type * as PageTree from "fumadocs-core/page-tree"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { Route } from "next"
import { NavItem } from "@/components/layouts/navbar"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { TargetType, useConfig } from "@/hooks/use-config"
import { convertNpmCommand } from "./package-manager-tabs"
import { PackageManager } from "@/types"

const getInstallCommand = (
  packageManager: string,
  name: string,
  target: TargetType
) => {
  const command = convertNpmCommand(
    `npx nepui@latest add ${name} ${target ? `--target ${target}` : ""}`
  )
  return command[packageManager as PackageManager]
}

const GROUP_CLASS =
  "p-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!"

const ITEM_CLASS =
  "h-9 rounded-md border border-transparent px-3! font-medium data-[selected=true]:border-input data-[selected=true]:bg-input/50"

type PageItem = { url: string; urls: string[]; name: React.ReactNode }

function collectPages(folder: PageTree.Folder, map: Map<string, PageItem>) {
  const add = (url: string, name: React.ReactNode) => {
    const key = String(name)
    const existing = map.get(key)

    if (existing) {
      if (!existing.urls.includes(url)) existing.urls.push(url)
    } else {
      map.set(key, { url, urls: [url], name })
    }
  }

  if (folder.index) add(folder.index.url, folder.index.name)

  for (const child of folder.children) {
    if (child.type === "page") add(child.url, child.name)
    else if (child.type === "folder") collectPages(child, map)
  }
}

function getPagesFromFolder(folder: PageTree.Folder): PageItem[] {
  const map = new Map<string, PageItem>()
  collectPages(folder, map)
  return [...map.values()]
}

function pickUrl(urls: string[], pathname: string) {
  if (urls.length === 1) return urls[0]

  const current = pathname.split("/").filter(Boolean)
  let best = urls[0]
  let bestScore = -1

  for (const url of urls) {
    const parts = url.split("/").filter(Boolean)
    let score = 0
    while (score < parts.length && parts[score] === current[score]) score++
    if (score > bestScore) {
      best = url
      bestScore = score
    }
  }

  return best
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch (error) {
    console.error("Failed to copy text to clipboard:", error)
  }
}

function useHighlight(
  ref: React.RefObject<HTMLElement | null>,
  onHighlight?: () => void
) {
  React.useEffect(() => {
    const node = ref.current
    if (!node || !onHighlight) return

    const observer = new MutationObserver(() => {
      if (node.getAttribute("aria-selected") === "true") {
        onHighlight()
      }
    })

    observer.observe(node, {
      attributes: true,
      attributeFilter: ["aria-selected"],
    })

    return () => observer.disconnect()
  }, [ref, onHighlight])
}

type SelectedType = "page" | "component" | "block" | null

export function CommandMenu({
  tree,
  blocks,
  navItems,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  tree: PageTree.Root
  blocks?: { name: string; description: string; categories: string[] }[]
  navItems?: NavItem[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const [renderDelayedGroups, setRenderDelayedGroups] = React.useState(false)
  const [selectedType, setSelectedType] = React.useState<SelectedType>(null)
  const [copyPayload, setCopyPayload] = React.useState("")
  const { packageManager, target } = useConfig()
  const { search, setSearch, query } = useDocsSearch({ type: "fetch" })

  const searchTimeoutRef =
    React.useRef<ReturnType<typeof setTimeout>>(undefined)

  const handleSearchChange = React.useCallback(
    (value: string) => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)

      searchTimeoutRef.current = setTimeout(() => {
        React.startTransition(() => setSearch(value))
      }, 300)
    },
    [setSearch]
  )

  React.useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    }
  }, [])

  React.useEffect(() => {
    if (!open) {
      const frame = requestAnimationFrame(() => setRenderDelayedGroups(false))
      return () => cancelAnimationFrame(frame)
    }

    const frame = requestAnimationFrame(() => setRenderDelayedGroups(true))
    return () => cancelAnimationFrame(frame)
  }, [open])

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  const commandFilter = React.useCallback(
    (value: string, searchValue: string, keywords?: string[]) => {
      const extendValue = value + " " + (keywords?.join(" ") || "")
      return extendValue.toLowerCase().includes(searchValue.toLowerCase())
        ? 1
        : 0
    },
    []
  )

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const highlightPage = React.useCallback(
    (isComponent: boolean, url: string) => {
      if (isComponent) {
        const componentName = url.split("/").pop() ?? ""
        setSelectedType("component")
        setCopyPayload(getInstallCommand(packageManager, componentName, target))
      } else {
        setSelectedType("page")
        setCopyPayload("")
      }
    },
    [packageManager, target]
  )

  const highlightBlock = React.useCallback(
    (block: { name: string }) => {
      setSelectedType("block")
      setCopyPayload(getInstallCommand(packageManager, block.name, target))
    },
    [packageManager, target]
  )

  const navItemsSection = React.useMemo(() => {
    if (!navItems || navItems.length === 0) return null

    return (
      <CommandGroup heading="Pages" className={GROUP_CLASS}>
        {navItems.map((item) => (
          <CommandMenuItem
            key={item.href}
            value={`Navigation ${item.label}`}
            keywords={["nav", "navigation", item.label.toLowerCase()]}
            onHighlight={() => {
              setSelectedType("page")
              setCopyPayload("")
            }}
            onSelect={() => runCommand(() => router.push(item.href as Route))}
          >
            <ArrowRightIcon />
            {item.label}
          </CommandMenuItem>
        ))}
      </CommandGroup>
    )
  }, [navItems, runCommand, router])

  const pageGroupsSection = React.useMemo(() => {
    return tree.children.map((group, index) => {
      if (group.type !== "folder") return null

      const pages = getPagesFromFolder(group)
      if (pages.length === 0) return null

      const groupName = group.name?.toString() ?? ""

      return (
        <CommandGroup
          key={group.$id ?? `${groupName}-${index}`}
          heading={groupName}
          className={GROUP_CLASS}
        >
          {pages.map((item) => {
            const url = pickUrl(item.urls, pathname)
            const isComponent = url.includes("/components/")

            return (
              <CommandMenuItem
                key={String(item.name)}
                value={
                  item.name?.toString() ? `${groupName} ${item.name}` : url
                }
                keywords={isComponent ? ["component"] : undefined}
                onHighlight={() => highlightPage(isComponent, url)}
                onSelect={() => runCommand(() => router.push(url as Route))}
              >
                {isComponent ? (
                  <div className="aspect-square size-4 rounded-full border border-dashed border-muted-foreground" />
                ) : (
                  <ArrowRightIcon />
                )}
                {item.name}
              </CommandMenuItem>
            )
          })}
        </CommandGroup>
      )
    })
  }, [tree.children, pathname, highlightPage, runCommand, router])

  const blocksSection = React.useMemo(() => {
    if (!blocks || blocks.length === 0) return null

    return (
      <CommandGroup heading="Blocks" className={GROUP_CLASS}>
        {blocks.map((block) => (
          <CommandMenuItem
            key={block.name}
            value={block.name}
            keywords={[
              "block",
              block.name,
              block.description,
              ...block.categories,
            ]}
            onHighlight={() => highlightBlock(block)}
            onSelect={() =>
              runCommand(() =>
                router.push(
                  `/blocks/${block.categories[0]}#${block.name}` as Route
                )
              )
            }
          >
            <SelectionIcon />
            {block.description}
            <span className="ml-auto font-mono text-xs font-normal text-muted-foreground tabular-nums">
              {block.name}
            </span>
          </CommandMenuItem>
        ))}
      </CommandGroup>
    )
  }, [blocks, highlightBlock, runCommand, router])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }

      if (e.key === "c" && (e.metaKey || e.ctrlKey) && copyPayload) {
        if (selectedType === "component" || selectedType === "block") {
          runCommand(() => copyText(copyPayload))
        }
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [copyPayload, runCommand, selectedType])

  return (
    <Dialog open={open} onOpenChange={setOpen} {...props}>
      <DialogTrigger
        render={<Button variant="outline" />}
        className={"text-muted-foreground"}
      >
        <MagnifyingGlassIcon />
        <span>Search</span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="top-[15%] translate-y-0 gap-4 rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4 ring-neutral-200/80 sm:max-w-lg dark:bg-neutral-900 dark:ring-neutral-800"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search documentation...</DialogTitle>
          <DialogDescription>Search for a command to run...</DialogDescription>
        </DialogHeader>
        <Command className="rounded-none bg-transparent" filter={commandFilter}>
          <div className="relative">
            <CommandInput
              placeholder="Search documentation..."
              onValueChange={handleSearchChange}
            />
            {query.isLoading && (
              <div className="pointer-events-none absolute top-1/2 right-3 z-10 flex -translate-y-1/2 items-center justify-center">
                <Spinner className="size-4 text-muted-foreground" />
              </div>
            )}
          </div>
          <CommandList className="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
            <CommandEmpty className="py-12 text-center text-sm text-muted-foreground">
              {query.isLoading ? "Searching..." : "No results found."}
            </CommandEmpty>
            {navItemsSection}
            {renderDelayedGroups ? (
              <>
                {pageGroupsSection}
                {blocksSection}
                <SearchResults
                  setOpen={setOpen}
                  query={query}
                  search={search}
                />
              </>
            ) : null}
          </CommandList>
        </Command>
        <div className="absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-xl px-4 text-xs font-medium text-muted-foreground dark:bg-neutral-800">
          <div className="flex items-center gap-2">
            <CommandMenuKbd>
              <ArrowElbowDownLeftIcon />
            </CommandMenuKbd>{" "}
            {selectedType === "page" || selectedType === "component"
              ? "Go to Page"
              : null}
            {selectedType === "block" ? "View block" : null}
          </div>
          {copyPayload && (
            <>
              <Separator orientation="vertical" className="h-4!" />
              <div className="flex items-center gap-1">
                <CommandMenuKbd>⌘</CommandMenuKbd>
                <CommandMenuKbd>C</CommandMenuKbd>
                {copyPayload}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CommandMenuItem({
  children,
  className,
  onHighlight,
  ...props
}: React.ComponentProps<typeof CommandItem> & {
  onHighlight?: () => void
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  useHighlight(ref, onHighlight)

  return (
    <CommandItem ref={ref} className={cn(ITEM_CLASS, className)} {...props}>
      {children}
    </CommandItem>
  )
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "pointer-events-none flex h-5 items-center justify-center gap-1 rounded border bg-background px-1 font-sans text-[0.7rem] font-medium text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
}

type Query = ReturnType<typeof useDocsSearch>["query"]

function SearchResults({
  setOpen,
  query,
  search,
}: {
  setOpen: (open: boolean) => void
  query: Query
  search: string
}) {
  const router = useRouter()

  const uniqueResults = React.useMemo(() => {
    if (!query.data || !Array.isArray(query.data)) return []

    return query.data.filter(
      (item, index, self) =>
        !(
          item.type === "text" && item.content.trim().split(/\s+/).length <= 1
        ) && index === self.findIndex((t) => t.content === item.content)
    )
  }, [query.data])

  if (!search.trim()) return null
  if (!query.data || query.data === "empty") return null
  if (uniqueResults.length === 0) return null

  return (
    <CommandGroup
      className="px-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!"
      heading="Search Results"
    >
      {uniqueResults.map((item) => (
        <CommandItem
          key={item.id}
          data-type={item.type}
          onSelect={() => {
            router.push(item.url as Route)
            setOpen(false)
          }}
          className="h-9 rounded-md border border-transparent px-3! font-normal data-[selected=true]:border-input data-[selected=true]:bg-input/50"
          keywords={[item.content, search]}
          value={`${item.content} ${item.type}`}
        >
          <div className="line-clamp-1 text-sm">{item.content}</div>
        </CommandItem>
      ))}
    </CommandGroup>
  )
}
