"use client"

import { Button } from "@/registry/react/button"

export default function ButtonLink() {
  return (
    <Button
      as="link"
      href="https://github.com/akkaldhami/nepui"
      target="_blank"
    >
      Link
    </Button>
  )
}
