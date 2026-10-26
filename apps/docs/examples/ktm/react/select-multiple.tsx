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
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

export default function SelectMultiple() {
  return (
    <Select multiple items={items} defaultValue={["apple", "banana"]}>
      <SelectTrigger aria-label="Fruits" style={{ width: "12rem" }}>
        <SelectValue>
          {(value: string[]) => {
            if (value.length === 0) return "Select fruits"
            if (value.length === 1) {
              return items.find((item) => item.value === value[0])?.label
            }
            return `${value.length} fruits selected`
          }}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
