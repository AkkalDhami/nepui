"use client"

import { Button } from "@/registry/react/button"
import { toast } from "@/registry/react/toast"

export default function ToastPromise() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        const task = new Promise<{ name: string }>((resolve) =>
          setTimeout(() => resolve({ name: "Event" }), 2000)
        )

        toast.promise(task, {
          loading: "Creating event...",
          success: (data) => `${data.name} created`,
          error: "Failed to create event",
        })
      }}
    >
      Create Event
    </Button>
  )
}
