"use client"

import {
  NumberInput,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputInput,
} from "@/registry/react/number-input"

export default function NumberInputDemo() {
  return (
    <NumberInput defaultValue={0} style={{ width: "100%", maxWidth: "10rem" }}>
      <NumberInputGroup>
        <NumberInputDecrement />
        <NumberInputInput aria-label="Quantity" />
        <NumberInputIncrement />
      </NumberInputGroup>
    </NumberInput>
  )
}
