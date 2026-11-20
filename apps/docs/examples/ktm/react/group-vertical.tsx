import { Button } from "@/registry/react/button"
import { Group, GroupSeparator } from "@/registry/react/group"

export default function GroupVerticalDemo() {
  return (
    <Group orientation="vertical" aria-label="Zoom">
      <Button variant="outline" size="icon" aria-label="Zoom in">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </Button>
      <GroupSeparator orientation="horizontal" />
      <Button variant="outline" size="icon" aria-label="Zoom out">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
        </svg>
      </Button>
    </Group>
  )
}
