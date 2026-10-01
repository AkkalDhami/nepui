"use client"

import { Button } from "@nepui/react/button"
import { Spinner } from "@nepui/react/spinner"

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
