"use client"

import {
  NumberInput,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputInput,
} from "@/registry/react/number-input"

export default function NumberInputFormat() {
  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        width: "100%",
        maxWidth: "12rem",
      }}
    >
      <NumberInput
        defaultValue={1200}
        format={{ style: "currency", currency: "USD" }}
      >
        <NumberInputGroup>
          <NumberInputDecrement />
          <NumberInputInput aria-label="Amount in USD" />
          <NumberInputIncrement />
        </NumberInputGroup>
      </NumberInput>
      <NumberInput
        defaultValue={0.25}
        step={0.01}
        min={0}
        max={1}
        format={{ style: "percent" }}
      >
        <NumberInputGroup>
          <NumberInputDecrement />
          <NumberInputInput aria-label="Discount" />
          <NumberInputIncrement />
        </NumberInputGroup>
      </NumberInput>
    </div>
  )
}
