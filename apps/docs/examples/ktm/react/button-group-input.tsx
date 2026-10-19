"use client"

import { Button } from "@/registry/react/button"
import { ButtonGroup } from "@/registry/react/button-group"
import { Input } from "@/registry/react/input"

export default function ButtonGroupInput() {
  return (
    <ButtonGroup style={{ width: "100%", maxWidth: "24rem" }}>
      <Input type="search" placeholder="Search…" aria-label="Search" />
      <Button variant="outline">Search</Button>
    </ButtonGroup>
  )
}
