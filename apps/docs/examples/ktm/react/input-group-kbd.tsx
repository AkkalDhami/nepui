"use client"

import { Kbd } from "@/registry/react/kbd"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/ssr"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/react/input-group"

export default function InputGroupKbd() {
  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <InputGroup>
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." aria-label="Search" />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Type to search..." aria-label="Search" />
        <InputGroupAddon align="inline-end">
          <Kbd>/</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
