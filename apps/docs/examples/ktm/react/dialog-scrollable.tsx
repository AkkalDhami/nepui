"use client"

import { Button } from "@/registry/react/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/react/dialog"

export default function DialogScrollableDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Scrollable Content
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Privacy policy</DialogTitle>
          <DialogDescription>
            The header stays in view while the content scrolls.
          </DialogDescription>
        </DialogHeader>
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            margin: "0 -1rem",
            padding: "0 1rem",
            maxHeight: "12rem",
            overflowY: "auto",
          }}
        >
          <p style={{ margin: 0 }}>
            We collect only the information we need to run the service, such as
            your name, your email and how you use the app.
          </p>
          <p style={{ margin: 0 }}>
            We never sell your personal data. We share it only with partners who
            help us run the service, and only when we have to.
          </p>
          <p style={{ margin: 0 }}>
            You can ask for a copy of your data, or ask us to delete it, at any
            time from your account settings.
          </p>
          <p style={{ margin: 0 }}>
            We keep your data for as long as your account is open, and for a
            short time after it is closed.
          </p>
          <p style={{ margin: 0 }}>
            If this policy changes in a way that matters, we will tell you
            before the change takes effect.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
