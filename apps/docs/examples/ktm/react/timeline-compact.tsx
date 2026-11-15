import {
  Timeline,
  TimelineConnector,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@/registry/react/timeline"

const items = [
  { time: "Dec 15, 2025", label: "Beta Program", color: "#10b981" },
  { time: "Nov 01, 2025", label: "Usability Testing", color: "#8b5cf6" },
  { time: "Oct 15, 2025", label: "Design Phase", color: "#d946ef" },
  { time: "Aug 01, 2024", label: "Requirements Gathering", color: "#3b82f6" },
]

export default function TimelineCompactDemo() {
  return (
    <Timeline
      aria-label="Roadmap"
      style={
        {
          width: "100%",
          maxWidth: "20rem",
          "--np-timeline-marker-size": "0.75rem",
          "--np-timeline-item-gap": "1rem",
        } as React.CSSProperties
      }
    >
      {items.map((item) => (
        <TimelineItem key={item.label}>
          <TimelineMarker
            style={{ background: item.color, borderColor: item.color }}
          />
          <TimelineConnector />
          <TimelineTitle style={{ lineHeight: "0.75rem" }}>
            {item.label}
          </TimelineTitle>
          <TimelineTime style={{ textTransform: "uppercase", fontWeight: 600 }}>
            {item.time}
          </TimelineTime>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
