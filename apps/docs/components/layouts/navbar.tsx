"use client"

import Link from "next/link"
import { ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Route } from "next"
import { siteConfig } from "@/lib/seo"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Logo } from "@/components/shared/logo"
import { buttonVariants } from "../ui/button"
import { DocsMobileNav } from "./docs-sidebar"
import { source } from "@/lib/source"

export type NavItem = {
  label: string
  href: string
  external?: boolean
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Changelog", href: "/docs/changelog" },
]

const GITHUB_URL = siteConfig.github

const navLinkClassName =
  "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

function DesktopNavLink({ item }: { item: NavItem }) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className={navLinkClassName}
      >
        {item.label}
        <ArrowUpRightIcon className="size-3.5" weight="bold" aria-hidden />
      </a>
    )
  }

  return (
    <Link href={item.href as Route} className={navLinkClassName}>
      {item.label}
    </Link>
  )
}

function GitHubLink({ className }: { className?: string }) {
  return (
    <Link
      href={GITHUB_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="View nepui on GitHub"
      className={cn(
        "text-foreground hover:text-foreground",
        buttonVariants({
          variant: "ghost",
          size: "icon-lg",
        }),
        className
      )}
    >
      <GithubLogoIcon className="size-[1.185rem]" aria-hidden />
    </Link>
  )
}

export type NavbarProps = {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  return (
    <nav
      aria-label="Main"
      className={cn("sticky top-0 z-50 w-full bg-background", className)}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4">
        <Logo variant="default" className="-ml-4" />

        <div className="flex items-center gap-5">
          <div className="hidden md:flex md:items-center md:gap-1">
            {NAV_ITEMS.map((item) => (
              <DesktopNavLink key={item.href} item={item} />
            ))}
            <div className="hidden md:flex md:items-center md:gap-1">
              <GitHubLink />
              <ThemeToggle />
            </div>
            {/* 
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
          </div> */}
          </div>

          <div className="md:hidden">
            <DocsMobileNav tree={source.pageTree} />
          </div>
        </div>
      </div>
    </nav>
  )
}
