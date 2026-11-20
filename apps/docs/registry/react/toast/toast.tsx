"use client"

import type { ReactNode, SVGProps } from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import { cn } from "cn"

import { Button } from "@/registry/react/button"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./toast.css"

const toast = ToastPrimitive.createToastManager()

type ToastSide =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

function CheckCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34m-1.293 5.953a1 1 0 0 0-1.32-.083l-.094.083L11 12.585l-1.293-1.292l-.094-.083a1 1 0 0 0-1.403 1.403l.083.094l2 2l.094.083a1 1 0 0 0 1.226 0l.094-.083l4-4l.083-.094a1 1 0 0 0-.083-1.32"
      />
    </svg>
  )
}

function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m9-3h.01" />
        <path d="M11 12h1v4h1" />
      </g>
    </svg>
  )
}

function WarningIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m9-3v4m0 3v.01"
      />
    </svg>
  )
}

function SpinnerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient
          id="SVGw6R8JeYL"
          x1="50%"
          x2="50%"
          y1="5.271%"
          y2="91.793%"
        >
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity=".55" />
        </linearGradient>
        <linearGradient
          id="SVG2dzaCchj"
          x1="50%"
          x2="50%"
          y1="8.877%"
          y2="90.415%"
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="100%" stopColor="currentColor" stopOpacity=".55" />
        </linearGradient>
      </defs>
      <g fill="none">
        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <path
          fill="url(#SVGw6R8JeYL)"
          d="M8.886.006a1 1 0 0 1 .22 1.988A8.001 8.001 0 0 0 10 17.944v2c-5.523 0-10-4.476-10-10C0 4.838 3.848.566 8.886.007Z"
          transform="translate(2 2.055)"
        />
        <path
          fill="url(#SVG2dzaCchj)"
          d="M14.322 1.985a1 1 0 0 1 1.392-.248A9.99 9.99 0 0 1 20 9.945c0 5.523-4.477 10-10 10v-2a8 8 0 0 0 4.57-14.567a1 1 0 0 1-.248-1.393"
          transform="translate(2 2.055)"
        />
      </g>
    </svg>
  )
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18 6L6 18M6 6l12 12"
      />
    </svg>
  )
}

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />
}

function ToastViewport({
  side = "top-center",
  className,
  ...props
}: ToastPrimitive.Viewport.Props & { side?: ToastSide }) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      data-side={side}
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
  render = <Button variant="ghost" size="icon-sm" />,
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
      <ToastContent
        data-has-description={toastItem.description != null ? "" : undefined}
      >
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
  side = "top-center",
  ...props
}: ToastPrimitive.Provider.Props & { side?: ToastSide }) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport side={side}>
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
  type ToastSide,
  Toaster,
  createToastManager,
  toast,
  useToastManager,
}
