"use client"

import {
  NumberInput,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputInput,
} from "@/registry/react/number-input"

export default function NumberInputSizes() {
  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        width: "100%",
        maxWidth: "10rem",
      }}
    >
      <NumberInput defaultValue={1} size="xs">
        <NumberInputGroup>
          <NumberInputDecrement />
          <NumberInputInput aria-label="Extra small quantity" />
          <NumberInputIncrement />
        </NumberInputGroup>
      </NumberInput>
      <NumberInput defaultValue={2} size="sm">
        <NumberInputGroup>
          <NumberInputDecrement />
          <NumberInputInput aria-label="Small quantity" />
          <NumberInputIncrement />
        </NumberInputGroup>
      </NumberInput>
      <NumberInput defaultValue={3}>
        <NumberInputGroup>
          <NumberInputDecrement />
          <NumberInputInput aria-label="Default quantity" />
          <NumberInputIncrement />
        </NumberInputGroup>
      </NumberInput>
      <NumberInput defaultValue={4} size="lg">
        <NumberInputGroup>
          <NumberInputDecrement />
          <NumberInputInput aria-label="Large quantity" />
          <NumberInputIncrement />
        </NumberInputGroup>
      </NumberInput>
    </div>
  )
}
