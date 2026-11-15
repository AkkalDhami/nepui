"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/registry/react/avatar"
import { Bubble, BubbleContent, BubbleGroup } from "@/registry/react/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/react/message"

export default function MessageAvatarDemo() {
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
          <Bubble variant="muted">
            <BubbleContent>
              The build failed during dependency installation.
            </BubbleContent>
          </Bubble>
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
            <BubbleContent>Can you share the exact error?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
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
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>Here&apos;s the error from the logs</BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>
                Something went wrong with the build. The libraries are not
                installed correctly. Try running the build again.
              </BubbleContent>
            </Bubble>
          </BubbleGroup>
        </MessageContent>
      </Message>
    </div>
  )
}
