import { Bubble, BubbleContent } from "@/registry/react/bubble"

export default function BubbleLinkDemo() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "28rem",
        display: "grid",
        gap: "0.5rem",
      }}
    >
      <Bubble variant="muted">
        <BubbleContent render={<button type="button" />}>
          Click here
        </BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent render={<a href="#" />}>
          Open the release notes
        </BubbleContent>
      </Bubble>
      <Bubble variant="muted" align="end">
        <BubbleContent render={<button type="button" disabled />}>
          Disabled
        </BubbleContent>
      </Bubble>
    </div>
  )
}
