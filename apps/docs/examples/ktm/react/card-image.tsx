"use client"

import { Badge } from "@/registry/react/badge"
import { Button } from "@/registry/react/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/react/card"

export default function CardImage() {
  return (
    <Card style={{ width: "100%", maxWidth: "24rem" }}>
      <img
        src="https://images.unsplash.com/photo-1637325258040-d2f09636ecf6?q=80&amp;w=500&amp;h=400&amp;fit=crop"
        alt="Recycled paper, up close."
        width="500"
        height="400"
        style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }}
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping
          faster.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button style={{ width: "100%" }}>View Event</Button>
      </CardFooter>
    </Card>
  )
}
