"use client"

import {
  NumberInput,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputInput,
} from "@/registry/react/number-input"

export default function NumberInputStates() {
  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        width: "100%",
        maxWidth: "10rem",
      }}
    >
      <NumberInput defaultValue={42} disabled>
        <NumberInputGroup>
          <NumberInputDecrement />
          <NumberInputInput aria-label="Disabled quantity" />
          <NumberInputIncrement />
        </NumberInputGroup>
      </NumberInput>
      <NumberInput defaultValue={10} readOnly>
        <NumberInputGroup>
          <NumberInputDecrement />
          <NumberInputInput aria-label="Read-only quantity" />
          <NumberInputIncrement />
        </NumberInputGroup>
      </NumberInput>
      <NumberInput defaultValue={-3} min={0}>
        <NumberInputGroup>
          <NumberInputDecrement />
          <NumberInputInput aria-label="Invalid quantity" aria-invalid="true" />
          <NumberInputIncrement />
        </NumberInputGroup>
      </NumberInput>
    </div>
  )
}
