import { GithubLogoIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/react/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/card"
import { Checkbox } from "@/registry/react/checkbox"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/registry/react/field"
import { Input } from "@/registry/react/input"
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputStrength,
  PasswordInputToggle,
} from "@/registry/react/password-input"
import { useState } from "react"

const labels = ["Enter a password", "Weak", "Fair", "Good", "Strong"]

function getScore(password: string) {
  if (!password) return 0
  const passed = [
    password.length >= 8,
    /\d/.test(password),
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length
  return Math.max(1, passed)
}

export function LoginCard() {
  const [password, setPassword] = useState("")
  const score = getScore(password)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="login-email">Email</FieldLabel>
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password-input-strength">Password</FieldLabel>
            <PasswordInput
              id="password-input-strength"
              autoComplete="new-password"
              value={password}
              onValueChange={(value) => setPassword(value)}
            >
              <PasswordInputControl />
              <PasswordInputToggle />
            </PasswordInput>
            <PasswordInputStrength score={score} label={labels[score]} />
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="login-remember" defaultChecked />
            <FieldLabel htmlFor="login-remember">Keep me signed in</FieldLabel>
          </Field>
          <Button className="w-full">Sign in</Button>
          <FieldSeparator>or</FieldSeparator>
          <Button variant="outline" className="w-full">
            <GithubLogoIcon />
            Continue with GitHub
          </Button>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
