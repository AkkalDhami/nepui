"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/react/accordion"

export default function AccordionDisabled() {
  return (
    <Accordion style={{ width: "100%", maxWidth: "32rem" }}>
      <AccordionItem value="history">
        <AccordionTrigger>Can I access my account history?</AccordionTrigger>
        <AccordionContent>
          Yes. You can view your full account history, including past orders and
          changes, from the account page.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="premium" disabled>
        <AccordionTrigger>Premium feature information</AccordionTrigger>
        <AccordionContent>
          Premium features are available on the Professional plan and above.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="email">
        <AccordionTrigger>How do I update my email address?</AccordionTrigger>
        <AccordionContent>
          Open your profile settings, choose Email, and confirm the new address
          using the link we send you.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
