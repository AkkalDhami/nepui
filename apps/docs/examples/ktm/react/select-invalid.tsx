"use client"

import { Field, FieldError, FieldLabel } from "@/registry/react/field"
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

export default function SelectInvalid() {
  return (
    <Field
      data-invalid
      style={{
        width: "12rem",
      }}
    >
      <FieldLabel>Fruit</FieldLabel>
      <Select items={items}>
        <SelectTrigger
          aria-label="Fruit"
          aria-invalid="true"
          aria-describedby="select-invalid-message"
          style={{ width: "100%" }}
        >
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError>Please select a fruit.</FieldError>
    </Field>
  )
}
