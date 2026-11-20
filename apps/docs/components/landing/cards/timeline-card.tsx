import { Card, CardContent, CardHeader, CardTitle } from "@/registry/react/card"
import {
  Timeline,
  TimelineConnector,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@/registry/react/timeline"

export function TimelineCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <Timeline value={2} aria-label="Payout progress">
          <TimelineItem step={1}>
            <TimelineMarker />
            <TimelineConnector />
            <TimelineTitle>Requested</TimelineTitle>
            <TimelineTime dateTime="2026-11-12">Nov 12</TimelineTime>
            <TimelineDescription>
              You asked for a payout of $1,211.29.
            </TimelineDescription>
          </TimelineItem>
          <TimelineItem step={2}>
            <TimelineMarker />
            <TimelineConnector />
            <TimelineTitle>Approved</TimelineTitle>
            <TimelineTime dateTime="2026-11-13">Nov 13</TimelineTime>
            <TimelineDescription>
              Reviewed and approved by finance.
            </TimelineDescription>
          </TimelineItem>
          <TimelineItem step={3}>
            <TimelineMarker />
            <TimelineConnector />
            <TimelineTitle>Sent to bank</TimelineTitle>
            <TimelineTime dateTime="2026-11-15">Today</TimelineTime>
            <TimelineDescription>
              Arrives within two business days.
            </TimelineDescription>
          </TimelineItem>
          <TimelineItem step={4}>
            <TimelineMarker />
            <TimelineTitle>Received</TimelineTitle>
            <TimelineTime dateTime="2026-11-17">Nov 17</TimelineTime>
            <TimelineDescription>
              Funds land in your account.
            </TimelineDescription>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  )
}
