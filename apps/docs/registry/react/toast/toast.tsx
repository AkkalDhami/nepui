"use client"

import type { ReactNode } from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import { cn } from "cn"

import { Button } from "@/registry/react/button"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./toast.css"

const toast = ToastPrimitive.createToastManager()

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  )
}

function InfoIcon() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </Svg>
  )
}

function WarningIcon() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </Svg>
  )
}

function SpinnerIcon() {
  return (
    <Svg>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </Svg>
  )
}

function XIcon() {
  return (
    <Svg>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </Svg>
  )
}

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />
}

function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={(state) =>
        cn(
          "np-toast-viewport",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function Toast({
  className,
  swipeDirection = ["up", "left", "right"],
  ...props
}: ToastPrimitive.Root.Props) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      swipeDirection={swipeDirection}
      className={(state) =>
        cn(
          "np-toast",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={(state) =>
        cn(
          "np-toast-content",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={(state) =>
        cn(
          "np-toast-title",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function ToastDescription({
  className,
  ...props
}: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={(state) =>
        cn(
          "np-toast-description",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function ToastAction({
  className,
  render = <Button variant="default" size="sm" />,
  ...props
}: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={render}
      className={(state) =>
        cn(
          "np-toast-action",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function ToastClose({
  className,
  children,
  render = (
    <Button variant="ghost" size="icon-sm" className={"np-button-rounded"} />
  ),
  ...props
}: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      render={render}
      className={(state) =>
        cn(
          "np-toast-close",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    >
      {children ?? (
        <span className="np-toast-close-icon">
          <XIcon />
        </span>
      )}
    </ToastPrimitive.Close>
  )
}

function ToastIcon({ type }: { type: string | undefined }) {
  let icon: ReactNode = null

  if (type === "success") icon = <CheckCircleIcon />
  if (type === "info") icon = <InfoIcon />
  if (type === "warning" || type === "error") icon = <WarningIcon />
  if (type === "loading") icon = <SpinnerIcon />

  if (!icon) return null

  return (
    <span
      key={type}
      className="np-toast-icon"
      aria-hidden="true"
      data-spin={type === "loading" ? "" : undefined}
    >
      {icon}
    </span>
  )
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager()

  return toasts.map((toastItem) => (
    <Toast key={toastItem.id} toast={toastItem}>
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div className="np-toast-body">
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
        <ToastClose />
      </ToastContent>
    </Toast>
  ))
}

function Toaster({
  children,
  toastManager = toast,
  ...props
}: ToastPrimitive.Provider.Props) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

const createToastManager = ToastPrimitive.createToastManager
const useToastManager = ToastPrimitive.useToastManager

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Toaster,
  createToastManager,
  toast,
  useToastManager,
}
