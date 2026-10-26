"use client"

import { Select, SelectOptGroup, SelectOption } from "@/registry/react/select"

export default function SelectNative() {
  return (
    <Select
      native
      aria-label="Food"
      placeholder="Select a food"
      style={{ width: "12rem" }}
    >
      <SelectOptGroup label="Fruits">
        <SelectOption value="apple">Apple</SelectOption>
        <SelectOption value="banana">Banana</SelectOption>
        <SelectOption value="blueberry">Blueberry</SelectOption>
      </SelectOptGroup>
      <SelectOptGroup label="Vegetables">
        <SelectOption value="carrot">Carrot</SelectOption>
        <SelectOption value="broccoli">Broccoli</SelectOption>
        <SelectOption value="spinach">Spinach</SelectOption>
      </SelectOptGroup>
    </Select>
  )
}
