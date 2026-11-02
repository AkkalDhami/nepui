"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/react/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/card"

export default function AccordionCard() {
  return (
    <Card style={{ width: "100%", maxWidth: "32rem" }}>
      <CardHeader>
        <CardTitle>Subscription &amp; Billing</CardTitle>
        <CardDescription>
          Common questions about your account, plans, payments and
          cancellations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion defaultValue={["plans"]}>
          <AccordionItem value="plans">
            <AccordionTrigger>
              What subscription plans do you offer?
            </AccordionTrigger>
            <AccordionContent>
              We offer three subscription tiers: Starter ($9/month),
              Professional ($29/month), and Enterprise ($99/month). Each plan
              includes increasing storage limits, API access, priority support,
              and team collaboration features.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="billing">
            <AccordionTrigger>How does billing work?</AccordionTrigger>
            <AccordionContent>
              Plans are billed at the start of each cycle, monthly or annually.
              You can switch plans at any time.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="cancel">
            <AccordionTrigger>
              How do I cancel my subscription?
            </AccordionTrigger>
            <AccordionContent>
              Open Billing settings and choose Cancel plan. Your access
              continues until the end of the current billing cycle.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
