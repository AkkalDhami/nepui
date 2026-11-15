import {
  Timeline,
  TimelineConnector,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@/registry/react/timeline"

const milestones = [
  {
    title: "Kickoff",
    time: "Week 1",
    description: "Scope and resource planning.",
  },
  {
    title: "Design review",
    time: "Week 2",
    description: "UI and UX prototypes.",
  },
  { title: "Beta", time: "Week 4", description: "Core features for testers." },
  { title: "Launch", time: "Week 6", description: "Public release." },
]

export default function TimelineHorizontalDemo() {
  return (
    <Timeline
      aria-label="Roadmap"
      orientation="horizontal"
      value={2}
      style={{ width: "100%", maxWidth: "40rem" }}
    >
      {milestones.map((milestone, index) => (
        <TimelineItem key={milestone.title} step={index + 1}>
          <TimelineMarker />
          <TimelineConnector />
          <TimelineTitle>{milestone.title}</TimelineTitle>
          <TimelineTime>{milestone.time}</TimelineTime>
          <TimelineDescription>{milestone.description}</TimelineDescription>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
