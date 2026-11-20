"use client"

import { useState } from "react"
import { XIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/react/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/card"
import { Field, FieldGroup, FieldLabel } from "@/registry/react/field"
import { RadioGroup, RadioGroupItem } from "@/registry/react/radio-group"
import { Slider } from "@/registry/react/slider"
import { Textarea } from "@/registry/react/textarea"

export function PayoutCard() {
  const [amount, setAmount] = useState(2500)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Threshold</CardTitle>
        <CardDescription>
          Set the minimum balance required before a payout is triggered.
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="Close">
            <XIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <RadioGroup
            defaultValue="usd"
            aria-label="Preferred currency"
            className="gap-2"
          >
            <Field orientation="horizontal">
              <RadioGroupItem value="usd" id="currency-usd" />
              <FieldLabel htmlFor="currency-usd">
                USD — United States Dollar
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem value="eur" id="currency-eur" />
              <FieldLabel htmlFor="currency-eur">EUR — Euro</FieldLabel>
            </Field>
          </RadioGroup>

          <Field>
            <div className="flex items-baseline justify-between">
              <FieldLabel htmlFor="payout-amount">
                Minimum Payout Amount
              </FieldLabel>
              <span className="text-xl font-semibold tabular-nums">
                ${amount.toLocaleString()}.00
              </span>
            </div>
            <Slider
              id="payout-amount"
              aria-label="Minimum payout amount"
              min={50}
              max={10000}
              step={50}
              value={[amount]}
              onValueChange={(value) =>
                setAmount(Array.isArray(value) ? value[0] : value)
              }
            />
            <div
              className="flex justify-between text-sm"
              style={{ color: "var(--np-muted-foreground)" }}
            >
              <span>$50 (MIN)</span>
              <span>$10,000 (MAX)</span>
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="payout-notes">Notes</FieldLabel>
            <Textarea
              id="payout-notes"
              placeholder="Add any notes for this payout configuration…"
            />
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
