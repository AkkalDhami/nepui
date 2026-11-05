import { Bubble, BubbleContent, BubbleReactions } from "@/registry/react/bubble"

export default function BubbleReactionsDemo() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "28rem",
        display: "grid",
        gap: "1.5rem",
      }}
    >
      <Bubble variant="secondary">
        <BubbleContent>Bottom, end (the default).</BubbleContent>
        <BubbleReactions role="img" aria-label="Reactions: thumbs up and fire">
          <span>👍</span>
          <span>🔥</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>Bottom, start.</BubbleContent>
        <BubbleReactions align="start" role="img" aria-label="Reaction: heart">
          <span>❤️</span>
        </BubbleReactions>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Top, end, with a count.</BubbleContent>
        <BubbleReactions
          side="top"
          role="img"
          aria-label="Reactions: thumbs up, fire, and 8 more"
        >
          <span>👍</span>
          <span>🔥</span>
          <span>+8</span>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}
