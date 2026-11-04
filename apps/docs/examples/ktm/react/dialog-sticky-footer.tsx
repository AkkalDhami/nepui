"use client"

import { Button } from "@/registry/react/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/react/dialog"

export default function DialogStickyFooterDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Sticky Footer
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>
            Scroll to read all of it. The actions stay in view.
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
            By using this service, you agree to the terms described below.
            Please read them carefully before you continue.
          </p>
          <p style={{ margin: 0 }}>
            You are responsible for keeping your account details safe, and for
            everything that happens under your account.
          </p>
          <p style={{ margin: 0 }}>
            We may update these terms from time to time. When we do, we will let
            you know by email or inside the app.
          </p>
          <p style={{ margin: 0 }}>
            You may stop using the service at any time. We may suspend accounts
            that break these terms.
          </p>
          <p style={{ margin: 0 }}>
            If you have questions about these terms, contact our support team
            and we will be happy to help.
          </p>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Decline
          </DialogClose>
          <DialogClose render={<Button />}>Accept</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
