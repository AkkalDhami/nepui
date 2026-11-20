"use client"

import { useState } from "react"

import { Button } from "@/registry/react/button"
import {
  createToastManager,
  Toaster,
  type ToastSide,
} from "@/registry/react/toast"

const sides: ToastSide[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
]

export default function ToastPosition() {
  const [side, setSide] = useState<ToastSide>("top-center")
  const [toastManager] = useState(createToastManager)

  return (
    <>
      <Toaster side={side} toastManager={toastManager} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {sides.map((toastSide) => (
          <Button
            key={toastSide}
            style={{
              textTransform: "capitalize",
            }}
            variant={"outline"}
            onClick={() => {
              setSide(toastSide)
              toastManager.add({
                title: "Message received",
              })
            }}
          >
            {toastSide.replace("-", " ")}
          </Button>
        ))}
      </div>
    </>
  )
}
