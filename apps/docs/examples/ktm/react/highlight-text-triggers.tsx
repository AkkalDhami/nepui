import { Highlight } from "@/registry/react/highlight-text"

export default function HighlightTriggersDemo() {
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
        Draws <Highlight>on load</Highlight>
      </span>
      <span>
        Draws{" "}
        <Highlight trigger="hover" gradient="mint">
          when you point at it
        </Highlight>
      </span>
      <span>
        Draws{" "}
        <Highlight trigger="view" gradient="candy">
          as it scrolls into view
        </Highlight>
      </span>
      <span>
        Draws in turn: <Highlight gradient="ocean">one</Highlight>,{" "}
        <Highlight delay={1} gradient="ocean">
          two
        </Highlight>
        ,{" "}
        <Highlight delay={2} gradient="ocean">
          three
        </Highlight>
      </span>
    </div>
  )
}
