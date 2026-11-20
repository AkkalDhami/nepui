import { Input } from "@/registry/react/input"
import { Group, GroupText } from "@/registry/react/group"

export default function GroupTextStartDemo() {
  return (
    <Group aria-label="Website">
      <GroupText>https://</GroupText>
      <Input placeholder="example.com" aria-label="Domain" />
    </Group>
  )
}
