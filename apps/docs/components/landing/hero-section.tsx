"use client"

import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/registry/react/button"
import Link from "next/link"
import { LogoIcon } from "@/components/shared/logo"

const ease = [0.22, 1, 0.36, 1] as const

export function HeroSection() {
  const reduce = useReducedMotion()
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  }

  return (
    <section className="relative mx-auto px-4 py-12">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          show: { transition: { staggerChildren: reduce ? 0 : 0.09 } },
        }}
        className="relative flex flex-col items-center text-center"
      >
        <motion.p
          variants={item}
          className="mb-5 font-medium text-muted-foreground"
        >
          A CSS-first design system
        </motion.p>
        <motion.h1
          variants={item}
          className="mb-5 text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] font-medium tracking-[-0.035em] text-balance"
        >
          Build interfaces
          <br />
          that feel intentional.
        </motion.h1>
        <motion.p
          variants={item}
          className="mb-8 max-w-[56ch] text-lg text-muted-foreground"
        >
          A foundational system of accessible components for HTML and React —
          styled with plain CSS you can read, own, and override.
          {/* A foundational system of accessible components for HTML and React,
          built with CSS, not Tailwind. */}
        </motion.p>
        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-3"
        >
          <Button
            nativeButton={false}
            size="lg"
            render={<Link href="/docs/components">Explore components</Link>}
          ></Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/docs/">Get started</Link>}
          ></Button>
        </motion.div>
        <LogoIcon className="size-0 text-muted-foreground hover:text-primary sm:size-140" />
      </motion.div>
    </section>
  )
}
