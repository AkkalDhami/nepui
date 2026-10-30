"use client"

import {
  CheckCircleIcon,
  InfoIcon,
  TerminalIcon,
  WarningCircleIcon,
  WarningIcon,
} from "@phosphor-icons/react"

import { Alert, AlertDescription, AlertTitle } from "@/registry/react/alert"

export default function AlertVariants() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        width: "100%",
        maxWidth: "28rem",
      }}
    >
      <Alert>
        <TerminalIcon />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components using the CLI.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <CheckCircleIcon />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>Your payment has been processed.</AlertDescription>
      </Alert>

      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>Dark mode is now in your settings.</AlertDescription>
      </Alert>

      <Alert variant="warning">
        <WarningIcon />
        <AlertTitle>Subscription expiring</AlertTitle>
        <AlertDescription>Your plan ends in 3 days.</AlertDescription>
      </Alert>

      <Alert variant="error">
        <WarningCircleIcon />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Please check your payment method.</AlertDescription>
      </Alert>
    </div>
  )
}
