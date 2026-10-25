"use client"

import { Button } from "@/registry/react/button"
import { Checkbox } from "@/registry/react/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/registry/react/field"
import { Input } from "@/registry/react/input"
import { Textarea } from "@/registry/react/textarea"

export default function FieldDemo() {
  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="card-name">Name on Card</FieldLabel>
                <Input id="card-name" placeholder="Evil Rabbit" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="card-number">Card Number</FieldLabel>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <FieldDescription>
                  Enter your 16-digit card number
                </FieldDescription>
              </Field>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                }}
              >
                <Field>
                  <FieldLabel htmlFor="exp-month">Month</FieldLabel>
                  <Input id="exp-month" placeholder="MM" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="exp-year">Year</FieldLabel>
                  <Input id="exp-year" placeholder="YYYY" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="cvv">CVV</FieldLabel>
                  <Input id="cvv" placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          <FieldSet>
            <FieldLegend>Billing Address</FieldLegend>
            <FieldDescription>
              The billing address associated with your payment method
            </FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox id="same-as-shipping" defaultChecked />
                <FieldLabel
                  htmlFor="same-as-shipping"
                  style={{ fontWeight: 400 }}
                >
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="comments">Comments</FieldLabel>
              <Textarea
                id="comments"
                placeholder="Add any additional comments"
                style={{
                  resize: "none",
                }}
              />
            </Field>
          </FieldGroup>

          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
