import Link from "next/link"

export const FOOTER_LINKS = {
  creator: {
    label: "Akkal Dhami",
    href: "https://www.akkal.com.np",
  },
  github: {
    label: "GitHub",
    href: "https://github.com/akkaldhami/nepui",
  },
} as const

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-1 px-4 py-5 text-sm text-muted-foreground sm:flex-row">
        © {new Date().getFullYear()} nepui · Built by
        <Link
          href={FOOTER_LINKS.creator.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {FOOTER_LINKS.creator.label}
        </Link>
        {" ·"} The source code is available on
        <Link
          href={FOOTER_LINKS.github.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {FOOTER_LINKS.github.label}
        </Link>
      </div>
    </footer>
  )
}
