/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect, useMemo, useState } from "react"
import { useTheme } from "next-themes"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { CODE_THEMES, FONT_FAMILIES, FONT_SIZES } from "@/lib/code-preference"
import { useConfig } from "@/hooks/use-config"
import { CheckIcon } from "@phosphor-icons/react"
import { cn } from "cn"

export function CodePreferencesDialog() {
  const { resolvedTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  const theme = useConfig((state) => state.theme)
  const setTheme = useConfig((state) => state.setTheme)

  const font = useConfig((state) => state.font)
  const setFont = useConfig((state) => state.setFont)

  const fontSize = useConfig((state) => state.fontSize)
  const setFontSize = useConfig((state) => state.setFontSize)

  useEffect(() => {
    setMounted(true)
  }, [])

  const availableThemes = useMemo(() => {
    if (!resolvedTheme) return []

    return CODE_THEMES.filter((codeTheme) => codeTheme.mode === resolvedTheme)
  }, [resolvedTheme])

  useEffect(() => {
    if (!mounted || !resolvedTheme || availableThemes.length === 0) {
      return
    }

    const selectedTheme = availableThemes.some((item) => item.value === theme)

    if (!selectedTheme) {
      setTheme(availableThemes[0].value)
    }
  }, [mounted, resolvedTheme, availableThemes, theme, setTheme])

  if (!mounted) {
    return null
  }

  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline">Code preferences</Button>}
      ></DialogTrigger>

      <DialogContent className="sm:max-w-155">
        <DialogHeader>
          <DialogTitle>Code preferences</DialogTitle>

          <DialogDescription>
            Customize the appearance of code examples.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <section className="space-y-3">
            <div>
              <h3 className="text-sm font-medium">Code theme</h3>

              <p className="text-xs text-muted-foreground">
                Themes available for the {resolvedTheme} mode.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {availableThemes.map((item) => {
                const selected = theme === item.value

                return (
                  <button
                    key={`${item.mode}-${item.value}`}
                    type="button"
                    onClick={() => setTheme(item.value)}
                    className={cn(
                      "relative flex flex-col",
                      "justify-between rounded-lg border p-3",
                      "text-left transition-colors",
                      "hover:bg-accent",
                      selected ? "border-foreground bg-accent" : "border-border"
                    )}
                  >
                    <span className="text-xs font-medium">{item.label}</span>

                    {selected && (
                      <span className="absolute top-2 right-2">
                        <CheckIcon className="size-3.5" weight="bold" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </section>

          <Separator />

          <section className="space-y-3">
            <div>
              <h3 className="text-sm font-medium">Font family</h3>

              <p className="text-xs text-muted-foreground">
                Choose the font used for code.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {FONT_FAMILIES.map((item) => {
                const selected = font === item.value

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFont(item.value)}
                    className={cn(
                      "flex items-center justify-between",
                      "rounded-lg border px-3 py-2.5",
                      "transition-colors hover:bg-accent",
                      selected ? "border-foreground bg-accent" : "border-border"
                    )}
                  >
                    <span className="text-sm">{item.label}</span>

                    {selected && <CheckIcon className="size-4" weight="bold" />}
                  </button>
                )
              })}
            </div>
          </section>

          <Separator />

          <section className="space-y-3">
            <div>
              <h3 className="text-sm font-medium">Font size</h3>

              <p className="text-xs text-muted-foreground">
                Adjust the size of code text.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {FONT_SIZES.map((size) => {
                const selected = fontSize === size

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFontSize(size)}
                    className={cn(
                      "rounded-md border px-3 py-2",
                      "font-mono text-xs",
                      "transition-colors hover:bg-accent",
                      selected ? "border-foreground bg-accent" : "border-border"
                    )}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
