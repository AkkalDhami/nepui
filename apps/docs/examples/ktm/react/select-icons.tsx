"use client"

import { MonitorIcon, MoonIcon, SunIcon } from "@phosphor-icons/react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/react/select"

const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
]

export default function SelectIcons() {
  return (
    <Select items={items} defaultValue="system">
      <SelectTrigger aria-label="Theme" style={{ width: "12rem" }}>
        <SelectValue>
          {(value: string | null) => (
            <>
              {value === "light" && <SunIcon />}
              {value === "dark" && <MoonIcon />}
              {value === "system" && <MonitorIcon />}
              {items.find((item) => item.value === value)?.label}
            </>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">
          <SunIcon />
          Light
        </SelectItem>
        <SelectItem value="dark">
          <MoonIcon />
          Dark
        </SelectItem>
        <SelectItem value="system">
          <MonitorIcon />
          System
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
