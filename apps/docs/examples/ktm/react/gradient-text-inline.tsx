import { GradientText } from "@/registry/react/gradient-text"

export default function GradientTextInlineDemo() {
  return (
    <p
      style={{
        margin: 0,
        maxWidth: "28rem",
        fontSize: "1.125rem",
        lineHeight: 1.6,
      }}
    >
      Style any word in a sentence. This one is{" "}
      <GradientText gradient="sunset" style={{ fontWeight: 600 }}>
        animated with plain CSS
      </GradientText>
      , so there is nothing to load and nothing to run.
    </p>
  )
}
