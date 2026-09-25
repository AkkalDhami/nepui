interface ReactPreviewProps {
  children: React.ReactNode
}

export function ReactPreview({ children }: ReactPreviewProps) {
  return (
    <div className="flex min-h-32 items-center justify-center p-6">
      {children}
    </div>
  )
}
