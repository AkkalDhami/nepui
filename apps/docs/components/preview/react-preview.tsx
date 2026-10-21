import { cn } from "cn"

interface ReactPreviewProps {
  children: React.ReactNode
  className?: string
}

export function ReactPreview({ children, className }: ReactPreviewProps) {
  return (
    <div
      className={cn(
        `not-typeset mt-4 flex max-h-100 min-h-80 scrollbar-none flex-wrap items-center justify-center gap-4 overflow-y-auto rounded-lg border p-6 [&_div]:flex-wrap`,
        className
      )}
    >
      {children}
    </div>
  )
}
