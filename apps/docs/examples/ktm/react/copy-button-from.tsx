"use client"

import * as React from "react"

import { CopyButton } from "@/registry/react/copy-button"
import { Input } from "@/registry/react/input"

export default function CopyButtonFromDemo() {
  const [value, setValue] = React.useState("npx nepui@latest add copy-button")

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label="Command"
        style={{ width: "18rem" }}
      />
      <CopyButton text={() => value} />
    </div>
  )
}
