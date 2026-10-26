"use client"

import { ArrowElbowDownLeftIcon } from "@phosphor-icons/react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/react/input-group"

export default function InputGroupTextareaDemo() {
  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <InputGroup>
        <InputGroupTextarea
          placeholder="console.log('Hello, world!');"
          aria-label="Code editor"
          style={{
            minHeight: "8rem",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        />
        <InputGroupAddon
          align="block-start"
          style={{
            paddingBottom: "0.5rem",
            borderBottom: "1px solid var(--np-border)",
          }}
        >
          <InputGroupText
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            script.js
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon
          align="block-end"
          style={{
            paddingTop: "0.5rem",
            borderTop: "1px solid var(--np-border)",
          }}
        >
          <InputGroupText>Line 1, Column 1</InputGroupText>
          <InputGroupButton
            variant="default"
            size="sm"
            style={{ marginLeft: "auto" }}
          >
            Run
            <ArrowElbowDownLeftIcon size={32} weight="bold" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
