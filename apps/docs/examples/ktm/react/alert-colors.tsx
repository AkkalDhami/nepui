"use client"

import type { CSSProperties } from "react"
import { WarningIcon } from "@phosphor-icons/react"

import { Alert, AlertDescription, AlertTitle } from "@/registry/react/alert"

export default function AlertColors() {
  return (
    <Alert
      style={
        {
          width: "100%",
          maxWidth: "28rem",
          "--np-alert-bg":
            "color-mix(in oklch, var(--np-warning) 8%, var(--np-background))",
          "--np-alert-border":
            "color-mix(in oklch, var(--np-warning) 30%, var(--np-border))",
          "--np-alert-color":
            "color-mix(in oklch, var(--np-warning), var(--np-foreground) 40%)",
          "--np-alert-description-color":
            "color-mix(in oklch, var(--np-warning), var(--np-foreground) 40%)",
        } as CSSProperties
      }
    >
      <WarningIcon />
      <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
      <AlertDescription>
        Renew now to avoid service interruption or upgrade to a paid plan to
        continue using the service.
      </AlertDescription>
    </Alert>
  )
}
