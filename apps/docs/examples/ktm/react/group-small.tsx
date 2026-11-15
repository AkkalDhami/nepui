import { Button } from "@/registry/react/button"
import { Group, GroupSeparator } from "@/registry/react/group"

export default function GroupSmallDemo() {
  return (
    <Group aria-label="File actions">
      <Button variant="outline" size="sm">
        Files
      </Button>
      <GroupSeparator />
      <Button variant="outline" size="sm">
        Media
      </Button>
      <GroupSeparator />
      <Button variant="outline" size="icon-sm" aria-label="More">
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
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Button>
    </Group>
  )
}
