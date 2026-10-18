"use client"

import { cn } from "cn"
import React from "react"

export function Container({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("container mx-auto max-w-7xl", className)} {...props}>
      {children}
    </div>
  )
}
