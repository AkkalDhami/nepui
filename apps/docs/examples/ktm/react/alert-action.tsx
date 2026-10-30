"use client"

import { InfoIcon } from "@phosphor-icons/react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/registry/react/alert"
import { Button } from "@/registry/react/button"

export default function AlertActionDemo() {
  return (
    <Alert style={{ width: "100%", maxWidth: "28rem" }}>
      <InfoIcon />
      <AlertTitle>Dark mode is now available</AlertTitle>
      <AlertDescription>
        Enable it under your profile settings to get started.
      </AlertDescription>
      <AlertAction>
        <Button size="xs">Enable</Button>
      </AlertAction>
    </Alert>
  )
}
