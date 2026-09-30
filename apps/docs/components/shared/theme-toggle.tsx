"use client"

import { useTheme } from "next-themes"
import { cn } from "cn"
import { MoonIcon, SunIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle({ className }: { className?: string }) {
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
        <span className="size-[1.15rem]" aria-hidden="true" />
      </Button>
    )
  }

  const isDark = theme === "dark"

  return (
    <Button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      variant={"ghost"}
      size={"icon-lg"}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={cn(className)}
    >
      {theme ? (
        isDark ? (
          <SunIcon className="size-[1.15rem]" aria-hidden />
        ) : (
          <MoonIcon className="size-[1.15rem]" aria-hidden />
        )
      ) : (
        <span className="size-[1.15rem]" aria-hidden />
      )}
    </Button>
  )
}
