import { Highlight } from "@/registry/react/highlight-text"

export default function HighlightDemo() {
  return (
    <h2
      style={{
        margin: 0,
        maxWidth: "34rem",
        fontSize: "2.25rem",
        lineHeight: 1.25,
        fontWeight: 700,
        letterSpacing: "-0.02em",
      }}
    >
      Make the <Highlight>important words</Highlight> impossible to miss
    </h2>
  )
}
