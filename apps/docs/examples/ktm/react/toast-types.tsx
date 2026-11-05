"use client"

import { Button } from "@/registry/react/button"
import { toast } from "@/registry/react/toast"

export default function ToastTypes() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Event created",
            description: "Sunday, December 3 at 9:00 AM",
          })
        }
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "success",
            title: "Event created",
            description: "Sunday, December 3 at 9:00 AM",
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
            title: "Be at the area 10 minutes before",
            description: "The venue opens at 8:50 AM.",
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
            title: "Event starts in 10 minutes",
            description: "Sunday, December 3 at 9:00 AM",
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
            title: "Event failed to create",
            description: "Please try again.",
          })
        }
      >
        Error
      </Button>
    </div>
  )
}
