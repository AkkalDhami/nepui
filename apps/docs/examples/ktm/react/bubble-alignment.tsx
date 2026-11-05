import { Bubble, BubbleContent } from "@/registry/react/bubble"

export default function BubbleAlignmentDemo() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "28rem",
        display: "grid",
        gap: "1.5rem",
      }}
    >
      <Bubble variant="muted">
        <BubbleContent>
          This bubble is aligned to the start. This is the default alignment.
        </BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>
          This bubble is aligned to the end. Use this for user messages.
        </BubbleContent>
      </Bubble>
    </div>
  )
}
