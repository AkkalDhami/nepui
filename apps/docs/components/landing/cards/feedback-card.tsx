"use client"

import { useState } from "react"
import { BellIcon, BookmarkSimpleIcon, HeartIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/react/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/react/card"
import { Field, FieldGroup, FieldLabel } from "@/registry/react/field"
import {
  NumberInput,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputInput,
  NumberInputScrubArea,
} from "@/registry/react/number-input"
import { Rating } from "@/registry/react/rating"
import { Toggle } from "@/registry/react/toggle"

export function FeedbackCard() {
  const [rating, setRating] = useState<number | null>(4)
  const [favorite, setFavorite] = useState(true)
  const [saved, setSaved] = useState(false)
  const [notify, setNotify] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rate your order</CardTitle>
        <CardDescription>
          {rating
            ? `You rated it ${rating} out of 5.`
            : "Tap a star to rate. Half stars work too."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel>Your rating</FieldLabel>
            <Rating
              value={rating}
              onValueChange={setRating}
              step={0.5}
              size="lg"
              deselectable
            />
          </Field>

          <div className="flex items-center gap-2 text-sm">
            <Rating
              value={4.6}
              readOnly
              size="sm"
              style={{
                filter: "grayscale(100%)",
              }}
            />
            <span style={{ color: "var(--np-muted-foreground)" }}>
              4.6 from 1,284 reviews
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel>Quantity</FieldLabel>
              <NumberInput defaultValue={2} min={1} max={10}>
                <NumberInputGroup>
                  <NumberInputDecrement />
                  <NumberInputInput aria-label="Quantity" />
                  <NumberInputIncrement />
                </NumberInputGroup>
              </NumberInput>
            </Field>
            <Field>
              <FieldLabel>Hours</FieldLabel>
              <NumberInput defaultValue={8} min={0} max={24} layout="stacked">
                <NumberInputGroup>
                  <NumberInputInput aria-label="Hours" />
                  <NumberInputIncrement />
                  <NumberInputDecrement />
                </NumberInputGroup>
              </NumberInput>
            </Field>
          </div>

          <NumberInput defaultValue={50} min={0} max={100} step={5}>
            <NumberInputScrubArea label="Drag the label to set the volume" />
            <NumberInputGroup>
              <NumberInputDecrement />
              <NumberInputInput aria-label="Volume" />
              <NumberInputIncrement />
            </NumberInputGroup>
          </NumberInput>

          <div className="flex items-center gap-2">
            <Toggle
              variant="outline"
              aria-label="Favorite"
              pressed={favorite}
              onPressedChange={setFavorite}
              fillIcon
            >
              <HeartIcon weight={favorite ? "fill" : "regular"} />
            </Toggle>
            <Toggle
              variant="outline"
              aria-label="Save for later"
              pressed={saved}
              onPressedChange={setSaved}
              fillIcon
            >
              <BookmarkSimpleIcon weight={saved ? "fill" : "regular"} />
            </Toggle>
            <Toggle
              size="sm"
              aria-label="Notify me"
              pressed={notify}
              onPressedChange={setNotify}
            >
              <BellIcon weight={notify ? "fill" : "regular"} />
              Notify me
            </Toggle>
          </div>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Submit review</Button>
      </CardFooter>
    </Card>
  )
}
