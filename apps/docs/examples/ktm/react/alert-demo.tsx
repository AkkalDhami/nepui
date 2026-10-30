"use client"

import { CheckCircleIcon } from "@phosphor-icons/react"

import { Alert, AlertDescription, AlertTitle } from "@/registry/react/alert"

export default function AlertDemo() {
  return (
    <Alert style={{ width: "100%", maxWidth: "28rem" }}>
      <CheckCircleIcon />
      <AlertTitle>Payment successful</AlertTitle>
      <AlertDescription>
        Your payment of $29.99 has been processed. A receipt has been sent to
        your email address.
      </AlertDescription>
    </Alert>
  )
}
