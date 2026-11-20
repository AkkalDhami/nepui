import { Highlight } from "@/registry/react/highlight-text"

export default function HighlightVariantsDemo() {
  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        fontSize: "1.5rem",
        fontWeight: 600,
      }}
    >
      <span>
        <Highlight>Marker</Highlight> is the default
      </span>
      <span>
        <Highlight variant="mark" gradient="peach">
          Mark
        </Highlight>{" "}
        fills the whole line
      </span>
      <span>
        <Highlight variant="underline" gradient="ocean">
          Underline
        </Highlight>{" "}
        sits under the text
      </span>
      <span>
        <Highlight variant="strike" gradient="fire">
          Strike
        </Highlight>{" "}
        crosses it out
      </span>
    </div>
  )
}
