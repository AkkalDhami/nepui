import { Button } from "@/registry/react/button"
import { Group, GroupSeparator } from "@/registry/react/group"

export default function GroupDefaultButtonsDemo() {
  return (
    <Group
      aria-label="File actions"
      style={
        {
          "--np-group-separator-color":
            "color-mix(in oklab, var(--np-primary-foreground) 30%, transparent)",
        } as React.CSSProperties
      }
    >
      <Button>Files</Button>
      <GroupSeparator />
      <Button>Media</Button>
      <GroupSeparator />
      <Button size="icon" aria-label="More">
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
