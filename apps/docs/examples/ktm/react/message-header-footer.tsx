"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/registry/react/avatar"
import { Bubble, BubbleContent } from "@/registry/react/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/registry/react/message"

export default function MessageHeaderFooter() {
  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <MessageGroup>
        <Message>
          <MessageAvatar />
          <MessageContent>
            <MessageHeader>Sabin</MessageHeader>
            <Bubble variant="secondary">
              <BubbleContent>I already checked the logs.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/sabin-gtm.png"
                alt="@sabin-gtm"
              />
              <AvatarFallback>SG</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="secondary">
              <BubbleContent>
                Send the report to the team. Ping @team if you need help.
              </BubbleContent>
            </Bubble>
            <MessageFooter>Read Yesterday</MessageFooter>
          </MessageContent>
        </Message>
      </MessageGroup>
    </div>
  )
}
