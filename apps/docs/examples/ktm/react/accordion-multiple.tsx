"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/react/accordion"

export default function AccordionMultiple() {
  return (
    <Accordion
      multiple
      defaultValue={["notifications"]}
      style={{ width: "100%", maxWidth: "32rem" }}
    >
      <AccordionItem value="notifications">
        <AccordionTrigger>Notification Settings</AccordionTrigger>
        <AccordionContent>
          Manage how you receive notifications. You can enable email alerts for
          updates or push notifications for mobile devices.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="privacy">
        <AccordionTrigger>Privacy &amp; Security</AccordionTrigger>
        <AccordionContent>
          Control your privacy settings and security preferences. Enable
          two-factor authentication and manage connected devices.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="billing">
        <AccordionTrigger>Billing &amp; Subscription</AccordionTrigger>
        <AccordionContent>
          View your current plan, update payment methods, and download past
          invoices.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
