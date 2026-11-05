"use client"

import { Button } from "@/registry/react/button"
import { toast } from "@/registry/react/toast"

export default function ToastAction() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        const id = toast.add({
          title: "Event created",
          description: "Sunday, December 3 at 9:00 AM",
          actionProps: {
            children: "Undo",
            onClick() {
              toast.close(id)
            },
          },
        })
      }}
    >
      Show Toast
    </Button>
  )
}
