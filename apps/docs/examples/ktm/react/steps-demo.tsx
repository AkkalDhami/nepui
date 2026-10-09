"use client"

import { Step, Steps } from "@/registry/react/steps"

export default function StepsDemo() {
  return (
    <Steps>
      <Step>Create your component structure.</Step>
      <Step>Add the required HTML and CSS.</Step>
      <Step>Import nepui&apos;s design tokens.</Step>
      <Step>Add the component behavior.</Step>
      <Step>Customize the component with CSS variables.</Step>
    </Steps>
  )
}
