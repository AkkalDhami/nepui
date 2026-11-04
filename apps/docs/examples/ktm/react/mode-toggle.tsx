"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "cn"

import { Button } from "@/registry/react/button"

export default function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        aria-label="Toggle theme"
      >
        <span
          style={{
            width: "1.15rem",
            height: "1.15rem",
          }}
          aria-hidden="true"
        />
      </Button>
    )
  }

  const isDark = theme === "dark"

  return (
    <Button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      variant={"ghost"}
      size={"icon"}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={cn(className)}
    >
      {theme ? (
        isDark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1.15rem"
            height="1.15rem"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1.15rem"
            height="1.15rem"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6.5 6.5 0 0 0 8.268 8.268c.344-.215.825-.003.803.401" />
          </svg>
        )
      ) : (
        <span
          style={{
            width: "1.15rem",
            height: "1.15rem",
          }}
          aria-hidden
        />
      )}
    </Button>
  )
}
