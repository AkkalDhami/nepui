"use client"

import { Button } from "@/registry/react/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/react/card"
import { Input } from "@/registry/react/input"
import { Label } from "@/registry/react/label"

export default function CardDemo() {
  return (
    <Card style={{ width: "100%", maxWidth: "24rem" }}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Label htmlFor="card-demo-email">Email</Label>
            <Input
              id="card-demo-email"
              type="email"
              placeholder="m@example.com"
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Label htmlFor="card-demo-password">Password</Label>
            <Input id="card-demo-password" type="password" placeholder="" />
          </div>
        </form>
      </CardContent>
      <CardFooter
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Button style={{ width: "100%" }}>Login</Button>
        <Button style={{ width: "100%" }} variant={"outline"}>
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
