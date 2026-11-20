"use client"

import {
  NumberInput,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputInput,
} from "@/registry/react/number-input"

export default function NumberInputRange() {
  return (
    <NumberInput
      defaultValue={5}
      min={0}
      max={10}
      style={{ width: "100%", maxWidth: "10rem" }}
    >
      <NumberInputGroup>
        <NumberInputDecrement />
        <NumberInputInput aria-label="Rating from 0 to 10" />
        <NumberInputIncrement />
      </NumberInputGroup>
    </NumberInput>
  )
}
