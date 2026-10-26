"use client"

import { CheckIcon, CopyIcon, InfoIcon } from "@phosphor-icons/react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/registry/react/input-group"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

export default function InputGroupButtonDemo() {
  const { copied, copy } = useCopyToClipboard()

  return (
    <div
      style={{
        display: "grid",
        gap: "1.5rem",
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <InputGroup>
        <InputGroupInput
          defaultValue="npx nepui@latest add input-group --target react"
          readOnly
          aria-label="Share link"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label="Copy"
            onClick={() => {
              copy("npx nepui@latest add input-group --target react")
            }}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <InputGroupButton variant="outline" size="icon-xs" aria-label="Info">
            <InfoIcon />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupInput placeholder="Enter search query" aria-label="Search" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Searching...</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
