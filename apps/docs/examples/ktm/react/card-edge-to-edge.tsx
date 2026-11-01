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

export default function CardEdgeToEdge() {
  return (
    <Card style={{ width: "100%", maxWidth: "24rem" }}>
      <CardHeader>
        <CardTitle>Terms of Service</CardTitle>
        <CardDescription>
          Review the terms before accepting the agreement.
        </CardDescription>
      </CardHeader>
      <CardContent
        style={{ marginBlockEnd: "calc(var(--np-card-spacing) * -1)" }}
      >
        <div
          role="region"
          aria-label="Terms of Service text"
          tabIndex={0}
          style={{
            display: "grid",
            gap: "0.75rem",
            maxHeight: "10rem",
            overflowY: "auto",
            marginInline: "calc(var(--np-card-spacing) * -1)",
            padding: "var(--np-card-spacing)",
            borderBlockStart: "1px solid var(--np-border)",
          }}
        >
          <p style={{ margin: 0 }}>
            These terms govern your use of the workspace, including access to
            shared documents, project files, and collaboration tools.
          </p>
          <p style={{ margin: 0 }}>
            You are responsible for the content you upload and for ensuring that
            your team has the appropriate permissions to view or edit it.
          </p>
          <p style={{ margin: 0 }}>
            We may update features or limits as the service evolves. When those
            changes materially affect your workflow, we will notify your
            workspace administrators.
          </p>
        </div>
      </CardContent>
      <CardFooter style={{ justifyContent: "flex-end", gap: "0.5rem" }}>
        <Button variant="outline">Decline</Button>
        <Button>Accept</Button>
      </CardFooter>
    </Card>
  )
}
