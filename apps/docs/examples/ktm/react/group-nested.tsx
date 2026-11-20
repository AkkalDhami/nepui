import { Button } from "@/registry/react/button"
import { Group } from "@/registry/react/group"

export default function GroupNestedDemo() {
  return (
    <Group aria-label="Pagination">
      <Group aria-label="Pages">
        {[1, 2, 3, 4, 5].map((page) => (
          <Button
            key={page}
            variant="outline"
            size="icon"
            aria-current={page === 2 ? "page" : undefined}
          >
            {page}
          </Button>
        ))}
      </Group>
      <Group aria-label="Previous and next">
        <Button variant="outline">Previous</Button>
        <Button variant="outline">Next</Button>
      </Group>
    </Group>
  )
}
