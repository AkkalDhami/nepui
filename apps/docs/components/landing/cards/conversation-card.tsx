import { Avatar, AvatarFallback, AvatarImage } from "@/registry/react/avatar"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/registry/react/bubble"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/react/card"
import { Marker, MarkerContent } from "@/registry/react/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from "@/registry/react/message"

export function ConversationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
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
              <BubbleContent>Deploying to prod real quick.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/pratapchaulagain.png"
                alt="@pratapchaulagain"
                style={{
                  filter: "grayscale(100%)",
                }}
              />
              <AvatarFallback>PC</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>It&apos;s 4:55 PM. On a Friday.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/akkaldhami.png"
                alt="@akkaldhami"
                style={{
                  filter: "grayscale(100%)",
                }}
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble>
              <BubbleContent>It&apos;s a one-line change.</BubbleContent>
            </Bubble>
            <MessageFooter>Delivered</MessageFooter>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/pratapchaulagain.png"
                alt="@pratapchaulagain"
                style={{
                  filter: "grayscale(100%)",
                }}
              />
              <AvatarFallback>PC</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <BubbleGroup>
              <Bubble variant="muted">
                <BubbleContent>
                  It&apos;s always a one-line change 😭.
                </BubbleContent>
              </Bubble>
              <Bubble variant="muted">
                <BubbleContent>Alright, let me take a look.</BubbleContent>
                <BubbleReactions aria-label="Reactions: thumbs up">
                  <span>👍</span>
                </BubbleReactions>
              </Bubble>
            </BubbleGroup>
          </MessageContent>
        </Message>
        <Marker role="status">
          <MarkerContent shimmer>
            <span
              style={{
                fontWeight: "500",
              }}
            >
              Pratap
            </span>{" "}
            is typing...
          </MarkerContent>
        </Marker>
      </CardContent>
    </Card>
  )
}
