"use client"

import { FileTextIcon } from "@phosphor-icons/react"

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/registry/react/attachment"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/react/avatar"
import { Bubble, BubbleContent } from "@/registry/react/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/react/message"

export default function MessageAttachment() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        width: "100%",
        maxWidth: "28rem",
      }}
    >
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/akkaldhami.png"
              alt="@akkaldhami"
            />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Attachment orientation="vertical" style={{ width: "12rem" }}>
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                alt="Workspace"
              />
            </AttachmentMedia>
          </Attachment>
          <Bubble>
            <BubbleContent>
              Here&apos;s the image. Can you add it to the PDF? Use it for the
              cover page.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/manisbhusal.png"
              alt="@manisbhusal"
            />
            <AvatarFallback>MB</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>
              Done. Here&apos;s the PDF with the image added as the cover page.
            </BubbleContent>
          </Bubble>
          <Attachment>
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
              <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        </MessageContent>
      </Message>
    </div>
  )
}
