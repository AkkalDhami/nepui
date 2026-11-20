"use client"

import {
  ArrowRightIcon,
  CaretUpIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@phosphor-icons/react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/react/alert-dialog"
import { Badge } from "@/registry/react/badge"
import { Button } from "@/registry/react/button"
import { ButtonGroup } from "@/registry/react/button-group"
import { Card, CardContent } from "@/registry/react/card"
import { Checkbox } from "@/registry/react/checkbox"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/react/input-group"
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/react/menu"
import { Switch } from "@/registry/react/switch"
import { Textarea } from "@/registry/react/textarea"
import { RadioGroup, RadioGroupItem } from "@/registry/react/radio-group"

export function ControlsCard() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <Button className={"np-button-rounded"}>
            Button
            <ArrowRightIcon />
          </Button>
          <Button variant="secondary" className={"np-button-rounded"}>
            Secondary
          </Button>
          <Button variant="outline" className={"np-button-rounded"}>
            Outline
          </Button>
        </div>

        <InputGroup>
          <InputGroupInput placeholder="Name" aria-label="Name" />
          <InputGroupAddon align="inline-start">
            <UserIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <MagnifyingGlassIcon />
          </InputGroupAddon>
        </InputGroup>

        <Textarea placeholder="Message" aria-label="Message" />

        <div className="flex items-center gap-3">
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <RadioGroup
            orientation="horizontal"
            defaultValue="default"
            aria-label="Density"
          >
            <RadioGroupItem value="default" aria-label="Default" />
            <RadioGroupItem value="compact" aria-label="Compact" />
          </RadioGroup>
          <Checkbox defaultChecked aria-label="Accept" />
          <Switch defaultChecked aria-label="Enabled" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline" />}>
              Alert Dialog
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this project?</AlertDialogTitle>
                <AlertDialogDescription>
                  This removes the project and its files. You can&lsquo;t undo
                  it.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <ButtonGroup>
            <Button variant="outline">Button Group</Button>
            <Menu>
              <MenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="More options"
                  >
                    <CaretUpIcon />
                  </Button>
                }
              />
              <MenuContent align="end">
                <MenuItem>Mark as read</MenuItem>
                <MenuItem>Archive</MenuItem>
                <MenuSeparator />
                <MenuItem variant="destructive">Delete</MenuItem>
              </MenuContent>
            </Menu>
          </ButtonGroup>
        </div>
      </CardContent>
    </Card>
  )
}
