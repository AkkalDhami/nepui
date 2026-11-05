"use client"

import { Button } from "@/registry/react/button"
import { toast } from "@/registry/react/toast"

export default function ToastDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.add({
          title: "Event created",
          description: "Sunday, December 3 at 9:00 AM",
        })
      }
    >
      Show Toast
    </Button>
  )
}
