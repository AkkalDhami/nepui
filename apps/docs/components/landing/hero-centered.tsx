"use client"

import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react"

import { Badge } from "@/registry/react/badge"
import { Button } from "@/registry/react/button"

import PackageManagerTabs from "@/components/docs/package-manager-tabs"
import { Highlight } from "@/components/ui/highlight"

export function HeroCentered() {
  return (
    <section
      aria-labelledby="hero-centered-title"
      className="relative overflow-hidden px-4 pt-14"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-7 text-center">
        <div>
          <Link href="/docs/components" className="no-underline">
            <Badge variant="secondary" appearance="light">
              70+ components, React and HTML
              <ArrowRightIcon />
            </Badge>
          </Link>
        </div>

        <h1
          id="hero-centered-title"
          className="m-0 text-5xl leading-[1.02] font-medium tracking-tight text-balance sm:text-7xl"
        >
          Build with <Highlight delay={0.2}>CSS</Highlight>
          <br />
          Ship in React or HTML
        </h1>

        <p
          className="m-0 max-w-2xl text-lg leading-8 text-pretty"
          style={{ color: "var(--np-muted-foreground)" }}
        >
          Every nepui component is plain CSS first. Use it as a React component
          on Base UI, or as a class in any page. No Tailwind inside, nothing to
          compile.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            nativeButton={false}
            size="lg"
            className="np-button-rounded"
            render={<Link href="/docs/components">Explore components</Link>}
          ></Button>
          <Button
            size="lg"
            variant="secondary"
            nativeButton={false}
            className="np-button-rounded"
            render={<Link href="/docs/">Get started</Link>}
          ></Button>
        </div>

        <div className="hidden">
          <PackageManagerTabs command="npx nepui@latest add button" />
        </div>
      </div>
    </section>
  )
}
