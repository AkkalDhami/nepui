interface ReactPreviewProps {
  children: React.ReactNode
}

export function ReactPreview({ children }: ReactPreviewProps) {
  return (
    <div className="not-typeset mt-4 flex min-h-80 items-center justify-center gap-3 rounded-lg border p-6">
      {children}
    </div>
  )
}
