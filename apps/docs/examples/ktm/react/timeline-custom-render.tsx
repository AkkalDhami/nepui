import {
  Timeline,
  TimelineConnector,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTitle,
} from "@/registry/react/timeline"

export default function TimelineCustomRenderDemo() {
  return (
    <Timeline
      aria-label="Milestones"
      style={{ width: "100%", maxWidth: "24rem" }}
    >
      <TimelineItem>
        <TimelineMarker />
        <TimelineConnector />
        <TimelineTitle render={<h3 />}>Founded</TimelineTitle>
        <TimelineDescription>The first commit.</TimelineDescription>
      </TimelineItem>
      <TimelineItem>
        <TimelineMarker />
        <TimelineConnector />
        <TimelineTitle render={<h3 />}>First release</TimelineTitle>
        <TimelineDescription>Version 1.0 for everyone.</TimelineDescription>
      </TimelineItem>
    </Timeline>
  )
}
