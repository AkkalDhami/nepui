"use client"

import {
  CheckCircleIcon,
  EnvelopeIcon,
  InfoIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/react/input-group"

export default function InputGroupIcon() {
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
        <InputGroupInput placeholder="Search..." aria-label="Search" />
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput
          type="email"
          placeholder="Enter your email"
          aria-label="Email"
        />
        <InputGroupAddon>
          <EnvelopeIcon />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput
          defaultValue="hello@nepui.dev"
          type="email"
          aria-label="Verified email"
        />
        <InputGroupAddon align="inline-end">
          <CheckCircleIcon />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Card number" aria-label="Card number" />
        <InputGroupAddon align="inline-end">
          <InfoIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
