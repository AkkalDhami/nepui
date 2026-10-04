"use client"

import * as React from "react"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  getColorInfo,
  type ColorInfo,
  type FormatId,
} from "@/lib/colors/convert"
import {
  COLOR_NAMES,
  PALETTE,
  SHADES,
  SPECIALS,
  type ColorName,
  type Shade,
  type SpecialName,
} from "@/lib/colors/palette"
import { toast } from "@/components/ui/toast"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react"

const FORMAT_OPTIONS: { id: FormatId; label: string }[] = [
  { id: "hex", label: "HEX" },
  { id: "rgb", label: "RGB" },
  { id: "hsl", label: "HSL" },
  { id: "oklch", label: "OKLCH" },
  { id: "oklab", label: "OKLab" },
  { id: "var", label: "CSS var" },
  { id: "class", label: "Class" },
  { id: "hwb", label: "HWB" },
  { id: "lch", label: "LCH" },
  { id: "lab", label: "Lab" },
  { id: "p3", label: "Display P3" },
]

/** Build every color once. The palette is static, so this is cheap. */
function buildIndex(): Record<string, ColorInfo> {
  const index: Record<string, ColorInfo> = {}
  for (const name of COLOR_NAMES) {
    for (const shade of SHADES) {
      const token = `${name}-${shade}`
      index[token] = getColorInfo(token, PALETTE[name][shade])
    }
  }
  for (const name of Object.keys(SPECIALS) as SpecialName[]) {
    index[name] = getColorInfo(name, SPECIALS[name])
  }
  return index
}

interface SwatchProps {
  token: string
  selected: boolean
  copied: boolean
  info: ColorInfo
  onPick: (token: string) => void
  className?: string
}

const Swatch = React.memo(function Swatch({
  token,
  selected,
  copied,
  info,
  onPick,
  className,
}: SwatchProps) {
  return (
    <button
      type="button"
      aria-label={token}
      aria-pressed={selected}
      title={`${token}  ${info.formats[0].value}`}
      onClick={() => onPick(token)}
      style={{ backgroundColor: `var(--np-${token})` }}
      className={cn(
        "relative aspect-square w-full rounded-lg border transition-transform",
        "hover:ring-2 hover:ring-ring/70",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        selected && "outline-2 outline-offset-2 outline-foreground",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 grid place-items-center text-sm font-bold opacity-0 transition-opacity",
          info.isLight ? "text-black" : "text-white",
          copied && "opacity-100"
        )}
      >
        ✓
      </span>
    </button>
  )
})

export function ColorPalette() {
  const index = React.useMemo(() => buildIndex(), [])
  const { copied, copy } = useCopyToClipboard(1200)

  const [format, setFormat] = React.useState<FormatId>("hex")
  const [selected, setSelected] = React.useState("red-500")
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null)

  const copyAndMark = React.useCallback(
    async (key: string, value: string) => {
      if (!(await copy(value))) return

      setCopiedKey(key)
      toast.add({ title: `Copied! ${value}`, type: "success" })
    },
    [copy]
  )

  const pickSwatch = React.useCallback(
    async (token: string) => {
      setSelected(token)
      const value = index[token].formats.find((f) => f.id === format)?.value
      if (value) await copyAndMark(token, value)
    },
    [copyAndMark, format, index]
  )

  const current = index[selected]
  const rows = [
    ...current.formats.filter((f) => f.id !== "class"),
    { id: "bg", label: "bg", value: `bg-${selected}` },
    { id: "text", label: "text", value: `text-${selected}` },
    { id: "border", label: "border", value: `border-${selected}` },
    { id: "np", label: "np- prefix", value: `np-bg-${selected}` },
  ]

  return (
    <div className="not-prose my-8 space-y-6">
      <div className="sticky top-10 z-40 -mx-1 border-b bg-background/95 px-1 py-4 backdrop-blur">
        <p className="my-3 text-sm text-muted-foreground">Copy as</p>
        <div
          role="group"
          aria-label="Copy format"
          className="flex flex-wrap gap-1.5"
        >
          {FORMAT_OPTIONS.map((opt) => (
            <Button
              key={opt.id}
              type="button"
              size="sm"
              variant={format === opt.id ? "default" : "outline"}
              aria-pressed={format === opt.id}
              className="rounded-full"
              onClick={() => {
                setFormat(opt.id)
                toast.add({
                  title: `Swatches now copy as ${opt.label}`,
                  type: "info",
                })
              }}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      <section
        aria-live="polite"
        className="grid gap-4 sm:grid-cols-[180px_1fr]"
      >
        <div
          className={cn(
            "flex h-full min-h-18 items-end rounded-lg border border-black/10 p-2.5 font-medium sm:min-h-25",
            current.isLight ? "text-black" : "text-white"
          )}
          style={{ backgroundColor: `var(--np-${selected})` }}
        ></div>

        <div className="min-w-0">
          <h3 className="mb-2.5 text-lg font-medium">{selected}</h3>
          <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-x-3">
            {rows.map((row) => {
              const key = `${selected}:${row.id}`
              const done = copied && copiedKey === key
              return (
                <button
                  key={key}
                  type="button"
                  title={row.value}
                  onClick={async () => {
                    await copyAndMark(key, row.value)
                  }}
                  className="flex min-w-0 items-center justify-between gap-2 rounded-md border bg-background py-1.5 pr-2 pl-2.5 text-left hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="w-16 shrink-0 text-xs text-muted-foreground">
                    {row.label}
                  </span>
                  <span className="flex-1 truncate font-mono text-xs">
                    {row.value}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 text-xs text-muted-foreground",
                      copied &&
                        copiedKey === key &&
                        "font-semibold text-foreground"
                    )}
                  >
                    {done ? (
                      <CheckIcon
                        size={14}
                        className="text-green-500"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    ) : (
                      <CopyIcon size={14} strokeWidth={2} aria-hidden="true" />
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <div className="overflow-x-auto px-2 pb-1.5">
        <div className="grid min-w-150 grid-cols-[5.5rem_repeat(11,minmax(0,1fr))] items-center gap-x-2 gap-y-2.5">
          <div />
          {SHADES.map((shade) => (
            <div
              key={shade}
              className="text-center text-sm text-muted-foreground"
            >
              {shade}
            </div>
          ))}

          {COLOR_NAMES.map((name: ColorName) => (
            <React.Fragment key={name}>
              <div className="text-sm font-medium capitalize">{name}</div>
              {SHADES.map((shade: Shade) => {
                const token = `${name}-${shade}`
                return (
                  <Swatch
                    key={token}
                    token={token}
                    info={index[token]}
                    selected={selected === token}
                    copied={copied && copiedKey === token}
                    onPick={pickSwatch}
                  />
                )
              })}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-5 flex min-w-180 gap-2 pl-25">
          {(Object.keys(SPECIALS) as SpecialName[]).map((name) => (
            <Swatch
              key={name}
              token={name}
              info={index[name]}
              selected={selected === name}
              copied={copied && copiedKey === name}
              onPick={pickSwatch}
              className="w-13"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
