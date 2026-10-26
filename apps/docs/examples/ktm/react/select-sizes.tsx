"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/react/select"

const items = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
]

export default function SelectSizes() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.75rem",
      }}
    >
      <Select items={items}>
        <SelectTrigger
          size="xs"
          aria-label="Extra small"
          style={{ width: "12rem" }}
        >
          <SelectValue placeholder="Extra small" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select items={items}>
        <SelectTrigger size="sm" aria-label="Small" style={{ width: "12rem" }}>
          <SelectValue placeholder="Small" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select items={items}>
        <SelectTrigger aria-label="Default" style={{ width: "12rem" }}>
          <SelectValue placeholder="Default" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select items={items}>
        <SelectTrigger size="lg" aria-label="Large" style={{ width: "12rem" }}>
          <SelectValue placeholder="Large" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
