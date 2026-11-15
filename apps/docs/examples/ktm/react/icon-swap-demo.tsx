"use client"

import { useState } from "react"
import { MonitorIcon, MoonIcon, SunIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/react/button"
import { IconSwap, IconSwapItem } from "@/registry/react/icon-swap"

export default function IconSwapDemo() {
  const [icon, setIcon] = useState<"sun" | "moon" | "monitor">("sun")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Button variant="outline" size="icon-sm" aria-label={icon}>
        <IconSwap>
          <IconSwapItem key={icon}>
            {icon === "sun" ? (
              <SunIcon />
            ) : icon === "moon" ? (
              <MoonIcon />
            ) : (
              <MonitorIcon />
            )}
          </IconSwapItem>
        </IconSwap>
      </Button>

      <div
        role="group"
        aria-label="Icon"
        style={{
          display: "flex",
          gap: "2px",
          padding: "2px",
          borderRadius: "var(--np-radius-lg)",
          boxShadow: "0 0 0 1px var(--np-border)",
        }}
      >
        <Button
          size="xs"
          variant={icon === "sun" ? "secondary" : "ghost"}
          onClick={() => setIcon("sun")}
        >
          Sun
        </Button>
        <Button
          size="xs"
          variant={icon === "moon" ? "secondary" : "ghost"}
          onClick={() => setIcon("moon")}
        >
          Moon
        </Button>
        <Button
          size="xs"
          variant={icon === "monitor" ? "secondary" : "ghost"}
          onClick={() => setIcon("monitor")}
        >
          Monitor
        </Button>
      </div>
    </div>
  )
}
