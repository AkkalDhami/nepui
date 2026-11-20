import {
  ArrowClockwiseIcon,
  FilePdfIcon,
  FileTextIcon,
  XIcon,
} from "@phosphor-icons/react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/registry/react/attachment"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/card"

export function AttachmentsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attachments</CardTitle>
        <CardDescription>Done, uploading and failed states.</CardDescription>
      </CardHeader>
      <CardContent>
        <AttachmentGroup>
          <Attachment>
            <AttachmentMedia>
              <FilePdfIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>Q3-royalty-report.pdf</AttachmentTitle>
              <AttachmentDescription>1.2 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove Q3-royalty-report.pdf">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>

          <Attachment state="uploading" progress={64}>
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>payout-notes.txt</AttachmentTitle>
              <AttachmentDescription>Uploading… 64%</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Cancel upload">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>

          <Attachment state="error">
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>statement.csv</AttachmentTitle>
              <AttachmentDescription>Upload failed</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Retry upload">
                <ArrowClockwiseIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </AttachmentGroup>
      </CardContent>
    </Card>
  )
}
