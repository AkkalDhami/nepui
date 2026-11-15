import { CopyButton } from "@/registry/react/copy-button"

export default function CopyButtonSizesDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <CopyButton size="icon-xs" text="Text" />
      <CopyButton size="icon-sm" text="Text" />
      <CopyButton size="icon" text="Text" />
      <CopyButton size="icon-lg" text="Text" />
    </div>
  )
}
