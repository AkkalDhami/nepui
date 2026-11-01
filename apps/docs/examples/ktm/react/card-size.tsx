"use client"

import { Button } from "@/registry/react/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/react/card"

export default function CardSize() {
  return (
    <Card size="sm" style={{ width: "100%", maxWidth: "24rem" }}>
      <CardHeader>
        <CardTitle>Scheduled reports</CardTitle>
        <CardDescription>
          Weekly snapshots. No more manual exports.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul
          style={{
            display: "grid",
            gap: "0.5rem",
            margin: 0,
            paddingInlineStart: "1.25rem",
          }}
        >
          <li>Choose a schedule (daily, or weekly).</li>
          <li>Send to channels or specific teammates.</li>
          <li>Include charts, tables, and key metrics.</li>
        </ul>
      </CardContent>
      <CardFooter
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Button size="sm" style={{ width: "100%" }}>
          Set up scheduled reports
        </Button>
        <Button size="sm" variant="outline" style={{ width: "100%" }}>
          See what&apos;s new
        </Button>
      </CardFooter>
    </Card>
  )
}
