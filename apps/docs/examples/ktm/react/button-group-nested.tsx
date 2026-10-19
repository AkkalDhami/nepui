"use client"

import { Button } from "@/registry/react/button"
import { ButtonGroup } from "@/registry/react/button-group"

export default function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="outline">Previous</Button>
        <Button variant="outline">Next</Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
