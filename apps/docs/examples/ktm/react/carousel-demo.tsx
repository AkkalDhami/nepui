"use client"

import * as React from "react"

import { Card, CardContent } from "@/registry/react/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/react/carousel"

export default function CarouselDemo() {
  return (
    <Carousel
      style={{
        maxWidth: "26rem",
        width: "100%",
      }}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "2.25rem",
                      fontWeight: "600",
                    }}
                  >
                    {index + 1}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
