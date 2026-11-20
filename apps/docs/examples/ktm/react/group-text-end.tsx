import { Input } from "@/registry/react/input"
import { Group, GroupText } from "@/registry/react/group"

export default function GroupTextEndDemo() {
  return (
    <Group aria-label="Website">
      <Input placeholder="example" aria-label="Domain" />
      <GroupText>.com</GroupText>
    </Group>
  )
}
