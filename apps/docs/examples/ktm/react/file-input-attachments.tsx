"use client"

import { useRef } from "react"
import { PaperclipIcon } from "@phosphor-icons/react"

import {
  Attachment,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/registry/react/attachment"
import { Button } from "@/registry/react/button"
import {
  FileInput,
  FileInputDropzone,
  FileInputItem,
  FileInputItemName,
  FileInputItemPreview,
  FileInputItemRemove,
  FileInputItemSize,
  FileInputList,
  FileInputTrigger,
} from "@/registry/react/file-input"

export default function FileInputAttachments() {
  const message = useRef<HTMLTextAreaElement>(null)

  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <FileInput multiple>
        <FileInputDropzone
          data-variant="inline"
          pasteTarget={() => message.current}
        >
          <FileInputList aria-label="Attachments">
            <FileInputItem
              style={{ padding: 0, border: 0, background: "transparent" }}
            >
              <Attachment state="idle" size="sm" style={{ width: "100%" }}>
                <AttachmentMedia>
                  <FileInputItemPreview
                    style={{ width: "100%", height: "100%" }}
                  />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>
                    <FileInputItemName />
                  </AttachmentTitle>
                  <AttachmentDescription>
                    <FileInputItemSize />
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <FileInputItemRemove />
                </AttachmentActions>
              </Attachment>
            </FileInputItem>
          </FileInputList>
          <textarea
            ref={message}
            aria-label="Message"
            placeholder="Write a message, drop files here, or paste a screenshot."
            rows={3}
            style={{
              width: "100%",
              minHeight: "4rem",
              padding: "0.25rem 0.5rem",
              border: 0,
              outline: 0,
              resize: "none",
              background: "transparent",
              color: "inherit",
              font: "inherit",
              fontSize: "0.875rem",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FileInputTrigger
              variant="ghost"
              size="icon-sm"
              aria-label="Attach files"
            >
              <PaperclipIcon aria-hidden="true" />
            </FileInputTrigger>
            <Button type="button" size="sm">
              Send
            </Button>
          </div>
        </FileInputDropzone>
      </FileInput>
    </div>
  )
}
