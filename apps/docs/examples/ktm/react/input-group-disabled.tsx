"use client"

import { EnvelopeIcon } from "@phosphor-icons/react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/react/input-group"

export default function InputGroupDisabled() {
  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <InputGroup data-disabled="true">
        <InputGroupInput
          type="email"
          placeholder="Enter your email"
          aria-label="Email"
          disabled
        />
        <InputGroupAddon>
          <EnvelopeIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
