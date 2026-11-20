"use client"

import { Button } from "@/registry/react/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/card"
import { toast } from "@/registry/react/toast"

export function ToastsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Toasts</CardTitle>
        <CardDescription>
          Four types, an action, and a promise that updates itself.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              type: "success",
              title: "Payout approved",
              description: "$1,211.29 is on its way to your bank.",
            })
          }
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              type: "info",
              title: "New statement",
              description: "Your November statement is ready.",
            })
          }
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              type: "warning",
              title: "Low balance",
              description: "Your balance is below $50.",
            })
          }
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              type: "error",
              title: "Transfer failed",
              description: "Check your bank details and retry.",
            })
          }
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              title: "Goal deleted",
              actionProps: {
                children: "Undo",
                onClick: () =>
                  toast.add({ type: "success", title: "Goal restored" }),
              },
            })
          }
        >
          With action
        </Button>
        <Button
          onClick={() =>
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1800)), {
              loading: "Sending payout…",
              success: "Payout sent",
              error: "Payout failed",
            })
          }
        >
          Promise
        </Button>
      </CardContent>
    </Card>
  )
}
