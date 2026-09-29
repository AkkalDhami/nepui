"use client"

import { useTheme } from "next-themes"
import { cn } from "cn"
import { MoonIcon, SunIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
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
