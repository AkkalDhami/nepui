"use client"

import { Button } from "@/registry/react/button"
import { Kbd } from "@/registry/react/kbd"

export default function KbdButton() {
  return (
    <Button variant="outline">
      Accept <Kbd data-icon="inline-end">⏎</Kbd>
    </Button>
  )
}
