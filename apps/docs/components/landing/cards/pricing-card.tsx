import "@/registry/react/list/list.css"

import { Badge } from "@/registry/react/badge"
import { Button } from "@/registry/react/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/react/card"
import { List, ListItem } from "@/registry/react/list"

export function PricingCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pro</CardTitle>
          <Badge variant="success" appearance="light">
            Popular
          </Badge>
        </div>
        <CardDescription>For teams shipping every week.</CardDescription>
        <p className="m-0 text-4xl font-semibold tracking-tight">
          $12
          <span
            className="text-base font-normal"
            style={{ color: "var(--np-muted-foreground)" }}
          >
            {" "}
            / month
          </span>
        </p>
      </CardHeader>
      <CardContent>
        <List>
          <ListItem>Unlimited projects</ListItem>
          <ListItem>Instant payouts</ListItem>
          <ListItem>Priority support</ListItem>
          <ListItem>Export to CSV</ListItem>
        </List>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Upgrade to Pro</Button>
      </CardFooter>
    </Card>
  )
}
