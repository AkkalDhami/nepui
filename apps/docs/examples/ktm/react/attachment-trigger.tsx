"use client"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/registry/react/attachment"

export default function AttachmentTriggerDemo() {
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
        <AttachmentMedia>
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
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          </svg>
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>release-notes.pdf</AttachmentTitle>
          <AttachmentDescription>PDF · 1.2 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Download release-notes.pdf">
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </AttachmentAction>
        </AttachmentActions>
        <AttachmentTrigger
          render={<a href="#" />}
          aria-label="Open release-notes.pdf"
        />
      </Attachment>
    </div>
  )
}
