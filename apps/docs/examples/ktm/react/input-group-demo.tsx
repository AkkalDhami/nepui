"use client"

import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/react/input-group"

export default function InputGroupDemo() {
  return (
    <InputGroup
      style={{
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <InputGroupInput placeholder="Search..." aria-label="Search" />
      <InputGroupAddon>
        <MagnifyingGlassIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  )
}
