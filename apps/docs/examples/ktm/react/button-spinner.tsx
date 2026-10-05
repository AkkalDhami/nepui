"use client"

import { Button } from "@/registry/react/button"
import { Spinner } from "@/registry/react/spinner"

export default function ButtonSpinner() {
  return (
    <>
      <Button variant="secondary" disabled>
        <Spinner /> Processing...
      </Button>

      <Button variant="secondary" disabled>
        Downloading...
        <Spinner />
      </Button>
    </>
  )
}
