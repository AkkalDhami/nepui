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
    <div className={`container mx-auto max-w-7xl ${className}`} {...props}>
      {children}
    </div>
  )
}
