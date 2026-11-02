"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/react/accordion"

export default function AccordionBorders() {
  return (
    <Accordion
      variant="bordered"
      defaultValue={["billing"]}
      style={{ width: "100%", maxWidth: "32rem" }}
    >
      <AccordionItem value="billing">
        <AccordionTrigger>How does billing work?</AccordionTrigger>
        <AccordionContent>
          We offer monthly and annual subscription plans. Billing is charged at
          the beginning of each cycle, and you can cancel anytime. All plans
          include automatic backups, 24/7 support, and unlimited team members.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="security">
        <AccordionTrigger>Is my data secure?</AccordionTrigger>
        <AccordionContent>
          Your data is encrypted in transit and at rest, and we run regular
          third-party security audits.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="integrations">
        <AccordionTrigger>What integrations do you support?</AccordionTrigger>
        <AccordionContent>
          We integrate with popular tools including Slack, GitHub, Google
          Workspace, and Zapier.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
