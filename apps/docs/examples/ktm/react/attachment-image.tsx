"use client"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/registry/react/attachment"

export default function AttachmentImageDemo() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "26rem",
        display: "grid",
        gap: "0.75rem",
      }}
    >
      <Attachment>
        <AttachmentMedia variant="image">
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%2394a3b8'/%3E%3Cstop offset='1' stop-color='%23334155'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='4' height='3' fill='url(%23g)'/%3E%3C/svg%3E"
            alt=""
          />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>mountains.jpg</AttachmentTitle>
          <AttachmentDescription>JPG · 2.4 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove mountains.jpg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment orientation="vertical">
        <AttachmentMedia variant="image">
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%2394a3b8'/%3E%3Cstop offset='1' stop-color='%23334155'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='4' height='3' fill='url(%23g)'/%3E%3C/svg%3E"
            alt=""
          />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>mountains.jpg</AttachmentTitle>
          <AttachmentDescription>JPG · 2.4 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove mountains.jpg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  )
}
