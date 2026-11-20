"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"
import { AttachmentsCard } from "./cards/attachments-card"
import { ConversationCard } from "./cards/conversation-card"
import { TimelineCard } from "./cards/timeline-card"
import { OverlaysCard } from "./cards/overlays-card"
import { ControlsCard } from "./cards/controls-card"
import { MenuCard } from "./cards/menu-card"
import { PayoutCard } from "./cards/payout-card"
import { ColorPickerCard } from "./cards/color-picker-card"
import { SignupCard } from "./cards/signup-card"
import { LoginCard } from "./cards/login-card"
import { FeedbackCard } from "./cards/feedback-card"
import { ToastsCard } from "./cards/toasts-card"
import { PricingCard } from "./cards/pricing-card"
import { FileInputCard } from "./cards/file-input-card"

export function Reveal({
  index,
  children,
}: {
  index: number
  children: ReactNode
}) {
  return (
    <motion.div
      className="mb-4 break-inside-avoid"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.4, delay: (index % 5) * 0.05, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export function Showcase() {
  const cards = [
    <ControlsCard key="controls" />,
    <SignupCard key="signup" />,
    <PayoutCard key="payout" />,
    <ColorPickerCard key="color-picker" />,
    <ConversationCard key="conversation" />,
    <OverlaysCard key="overlays" />,
    <LoginCard key="login" />,
    <FileInputCard key="files" />,
    <MenuCard key="menu" />,
    <AttachmentsCard key="attachments" />,
    <FeedbackCard key="feedback" />,
    <TimelineCard key="timeline" />,
    <ToastsCard key="toasts" />,
    <PricingCard key="pricing" />,
  ]

  return (
    <section
      aria-label="Component showcase"
      className="mask-b-from-90% px-4 py-2"
    >
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 2xl:columns-5">
        {cards.map((card, index) => (
          <div className="mb-4 break-inside-avoid" key={index}>
            {card}
          </div>
        ))}
      </div>
    </section>
  )
}
