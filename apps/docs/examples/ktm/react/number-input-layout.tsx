"use client"

import {
  NumberInput,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputInput,
} from "@/registry/react/number-input"

export default function NumberInputLayout() {
  return (
    <NumberInput
      defaultValue={12}
      layout="stacked"
      style={{ width: "100%", maxWidth: "8rem" }}
    >
      <NumberInputGroup>
        <NumberInputDecrement />
        <NumberInputInput aria-label="Seats" />
        <NumberInputIncrement />
      </NumberInputGroup>
    </NumberInput>
  )
}
