"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/react/accordion"

export default function AccordionDemo() {
  return (
    <Accordion
      defaultValue={["shipping"]}
      style={{ width: "100%", maxWidth: "32rem" }}
    >
      <AccordionItem value="shipping">
        <AccordionTrigger>What are your shipping options?</AccordionTrigger>
        <AccordionContent>
          We offer standard (5-7 days), express (2-3 days), and overnight
          shipping. Free shipping on international orders.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          Returns are accepted within 30 days of delivery. Items must be unused
          and in their original packaging.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
        <AccordionContent>
          Reach us by email, live chat, or phone. We respond within 24 hours on
          business days.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
