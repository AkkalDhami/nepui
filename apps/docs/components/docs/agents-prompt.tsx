import { CopyButton } from "./copy-button"

export function AgentsPrompt({ prompt }: { prompt: string }) {
  return (
    <div className="relative space-y-4">
      <CopyButton
        value={prompt}
        className="absolute top-2.5 right-3 z-10 bg-code text-xs"
      />

      <pre className="mt-0 max-h-80 scrollbar-none overflow-auto bg-code p-4 text-sm whitespace-pre-wrap">
        {prompt}
      </pre>
    </div>
  )
}
