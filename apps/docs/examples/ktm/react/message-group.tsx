"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/registry/react/avatar"
import { Bubble, BubbleContent } from "@/registry/react/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
} from "@/registry/react/message"

export default function MessageGroupDemo() {
  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <MessageGroup>
        <Message>
          <MessageAvatar />
          <MessageContent>
            <Bubble variant="secondary">
              <BubbleContent>I checked the registry addresses.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar />
          <MessageContent>
            <Bubble variant="secondary">
              <BubbleContent>
                The component and example JSON now live under the UI registry.
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
              <BubbleContent>Want me to open a pull request?</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </MessageGroup>
    </div>
  )
}
