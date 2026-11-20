"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/registry/react/avatar"
import { Marker, MarkerContent, MarkerIcon } from "@/registry/react/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/react/message"
import { Spinner } from "@/registry/react/spinner"

export default function MessageStatus() {
  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
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
          <Marker role="status">
            <MarkerIcon>
              <Spinner />
            </MarkerIcon>
            <MarkerContent>Checking the logs...</MarkerContent>
          </Marker>
        </MessageContent>
      </Message>
    </div>
  )
}
