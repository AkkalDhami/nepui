"use client"

import { Checkbox } from "@/registry/react/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/registry/react/field"

export default function FieldChoiceCard() {
  return (
    <div style={{ width: "100%", maxWidth: "24rem" }}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">Compute Environment</FieldLegend>
          <FieldDescription>
            Select the compute environment for your cluster.
          </FieldDescription>
          <FieldGroup style={{ gap: "0.75rem" }}>
            <FieldLabel htmlFor="kubernetes">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Kubernetes</FieldTitle>
                  <FieldDescription>
                    Run GPU workloads on a K8s cluster.
                  </FieldDescription>
                </FieldContent>
                <Checkbox id="kubernetes" defaultChecked />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="vm">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Virtual Machine</FieldTitle>
                  <FieldDescription>
                    Access a cluster to run GPU workloads.
                  </FieldDescription>
                </FieldContent>
                <Checkbox id="vm" />
              </Field>
            </FieldLabel>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  )
}
