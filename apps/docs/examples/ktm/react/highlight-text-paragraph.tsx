import { Highlight } from "@/registry/react/highlight-text"

export default function HighlightParagraphDemo() {
  return (
    <p
      style={{
        margin: 0,
        maxWidth: "30rem",
        fontSize: "1.125rem",
        lineHeight: 1.9,
      }}
    >
      A highlight wraps across lines without breaking.{" "}
      <Highlight gradient="sunrise" variant="mark">
        This long phrase runs over more than one line and every line gets its
        own highlight
      </Highlight>
      , and the text on top stays easy to read. Use{" "}
      <Highlight variant="underline" gradient="forest">
        a quiet underline
      </Highlight>{" "}
      when a fill is too loud.
    </p>
  )
}
