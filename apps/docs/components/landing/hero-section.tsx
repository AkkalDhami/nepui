"use client"

import { Button } from "@/registry/react/button"
import Link from "next/link"
import { Badge } from "@/registry/react/badge"
import { Route } from "next"
import { Highlight } from "@/components/ui/highlight"
import { ArrowRightIcon } from "@phosphor-icons/react"

export function HeroSection() {
  return (
    <section className="relative mx-auto space-y-8 px-4 py-14">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-7 text-center">
        <Link href="/docs/components" className="no-underline">
          <Badge variant="secondary" appearance="light">
            70+ accessible components
            <ArrowRightIcon />
          </Badge>
        </Link>

        <h1
          id="hero-centered-title"
          className="m-0 text-5xl leading-[1.02] font-medium tracking-tight text-balance sm:text-7xl"
        >
          Build interfaces that feel{" "}
          <Highlight
            delay={0.2}
            animate={false}
            variant="solid"
            //  color="var(--np-blue-500)"
          >
            intentional
          </Highlight>
        </h1>

        <p className="m-0 max-w-2xl text-lg leading-8 text-pretty text-(--np-muted-foreground)">
          nepui is a{" "}
          <Highlight
            variant="outline"
            handle="round"
            delay={0.7}
            animate={false}
            // color="var(--np-orange-500)"
            className="text-foreground"
          >
            CSS-first design system
          </Highlight>{" "}
          . Use each component as a class in plain HTML or as a React component
          on Base UI. Accessible by default, no Tailwind inside, nothing to
          compile.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            nativeButton={false}
            size="lg"
            className="np-button-rounded"
            render={<Link href="/docs/components">Explore components</Link>}
          />
          <Button
            nativeButton={false}
            size="lg"
            variant="secondary"
            className="np-button-rounded"
            render={<Link href={"/docs" as Route}>Get started</Link>}
          />
        </div>
      </div>
    </section>
  )
}
