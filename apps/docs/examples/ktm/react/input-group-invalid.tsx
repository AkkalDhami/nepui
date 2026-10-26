"use client"

import { WarningCircleIcon } from "@phosphor-icons/react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/react/input-group"

export default function InputGroupInvalid() {
  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <InputGroup>
        <InputGroupInput
          type="email"
          placeholder="Invalid email"
          aria-label="Email"
          aria-invalid="true"
        />
        <InputGroupAddon align="inline-end">
          <WarningCircleIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
