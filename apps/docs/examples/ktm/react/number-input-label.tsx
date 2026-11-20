"use client"

import { useId } from "react"

import { Label } from "@/registry/react/label"
import {
  NumberInput,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputInput,
} from "@/registry/react/number-input"

export default function NumberInputLabel() {
  const id = useId()

  return (
    <div
      style={{
        display: "grid",
        gap: "0.5rem",
        width: "100%",
        maxWidth: "10rem",
      }}
    >
      <Label htmlFor={id}>Quantity</Label>
      <NumberInput id={id} defaultValue={0}>
        <NumberInputGroup>
          <NumberInputDecrement />
          <NumberInputInput />
          <NumberInputIncrement />
        </NumberInputGroup>
      </NumberInput>
    </div>
  )
}
