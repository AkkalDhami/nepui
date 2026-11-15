import {
  Timeline,
  TimelineConnector,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@/registry/react/timeline"

const events = [
  {
    title: "Deployed to production",
    time: "10:42",
    dateTime: "2026-11-14T10:42",
    description: "Version 2.4.0 is live in all regions.",
  },
  {
    title: "Checks passed",
    time: "10:30",
    dateTime: "2026-11-14T10:30",
    description: "142 tests ran without a failure.",
  },
  {
    title: "Pull request merged",
    time: "09:58",
    dateTime: "2026-11-14T09:58",
    description: "Add export to the reports page.",
  },
  {
    title: "Review requested",
    time: "09:12",
    dateTime: "2026-11-14T09:12",
    description: "Two reviewers were assigned.",
  },
]

export default function TimelineDemo() {
  return (
    <Timeline
      aria-label="Activity"
      style={{ width: "100%", maxWidth: "24rem" }}
    >
      {events.map((event) => (
        <TimelineItem key={event.title}>
          <TimelineMarker />
          <TimelineConnector />
          <TimelineTitle>{event.title}</TimelineTitle>
          <TimelineTime dateTime={event.dateTime}>{event.time}</TimelineTime>
          <TimelineDescription>{event.description}</TimelineDescription>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
