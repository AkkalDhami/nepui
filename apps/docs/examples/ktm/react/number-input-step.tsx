"use client"

import {
  NumberInput,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputInput,
  NumberInputScrubArea,
} from "@/registry/react/number-input"

export default function NumberInputStep() {
  return (
    <div
      style={{
        display: "grid",
        gap: "1.25rem",
        width: "100%",
        maxWidth: "10rem",
      }}
    >
      <NumberInput defaultValue={0} step={10}>
        <NumberInputScrubArea label="Step 10" />
        <NumberInputGroup>
          <NumberInputDecrement />
          <NumberInputInput />
          <NumberInputIncrement />
        </NumberInputGroup>
      </NumberInput>
      <NumberInput defaultValue={0} step={0.1}>
        <NumberInputScrubArea label="Step 0.1" />
        <NumberInputGroup>
          <NumberInputDecrement />
          <NumberInputInput />
          <NumberInputIncrement />
        </NumberInputGroup>
      </NumberInput>
    </div>
  )
}
