"use client"

import {
  NumberInput,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputInput,
  NumberInputScrubArea,
} from "@/registry/react/number-input"

export default function NumberInputScrub() {
  return (
    <NumberInput defaultValue={0} style={{ width: "100%", maxWidth: "10rem" }}>
      <NumberInputScrubArea label="Quantity" />
      <NumberInputGroup>
        <NumberInputDecrement />
        <NumberInputInput />
        <NumberInputIncrement />
      </NumberInputGroup>
    </NumberInput>
  )
}
