"use client"

import {
  ArrowClockwiseIcon,
  CopyIcon,
  ThumbsUpIcon,
} from "@phosphor-icons/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/registry/react/avatar"
import { Bubble, BubbleContent } from "@/registry/react/bubble"
import { Button } from "@/registry/react/button"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from "@/registry/react/message"

export default function MessageActions() {
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
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/pratapchaulagain.png"
              alt="@pratapchaulagain"
            />
            <AvatarFallback>PC</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>
              The install failure is coming from the workspace package.
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <Button variant="ghost" size="icon-sm" aria-label="Copy">
              <CopyIcon />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Retry">
              <ArrowClockwiseIcon />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Good response">
              <ThumbsUpIcon />
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
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
          <Bubble>
            <BubbleContent>Okay drop me a link. Taking a look...</BubbleContent>
          </Bubble>
          <MessageFooter style={{ color: "var(--np-destructive)" }}>
            Failed to send
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  )
}
