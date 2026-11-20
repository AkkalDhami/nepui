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
            title: "New notification",
            description: "You have a new notification in your inbox.",
          })
        }
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Message received",
          })
        }
      >
        Message
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "success",
            title: "Profile updated",
            description:
              "Your profile information has been updated successfully.",
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
            title: "Scheduled maintenance",
            description: "The service will be temporarily unavailable tonight.",
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
            title: "Storage almost full",
            description: "You're running out of storage space.",
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
            title: "Upload failed",
            description: "Unable to upload your file. Please try again.",
          })
        }
      >
        Error
      </Button>
    </div>
  )
}
