"use client"

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from "react"
import type { ComponentProps, Key, ReactElement } from "react"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./icon-swap.css"

type ItemElement = ReactElement<ComponentProps<"span">>

type Entry = {
  id: number
  key: Key | null
  element: ItemElement
  exiting: boolean
  entering: boolean
}

let nextId = 0

function makeEntry(element: ItemElement, entering: boolean): Entry {
  return {
    id: nextId++,
    key: element.key,
    element,
    exiting: false,
    entering,
  }
}

function IconSwap({ className, children, ...props }: ComponentProps<"span">) {
  const incoming = Children.toArray(children).filter(
    isValidElement
  ) as ItemElement[]
  const [entries, setEntries] = useState<Entry[]>(() =>
    incoming.map((element) => makeEntry(element, false))
  )

  const activeKeys = entries.filter((e) => !e.exiting).map((e) => e.key)
  const nextKeys = incoming.map((element) => element.key)
  if (
    activeKeys.length !== nextKeys.length ||
    activeKeys.some((key, i) => key !== nextKeys[i])
  ) {
    setEntries([
      ...entries
        .filter((e) => e.exiting || !nextKeys.includes(e.key as string))
        .map((e) => ({ ...e, exiting: true, entering: false })),
      ...incoming.map(
        (element) =>
          entries.find((e) => !e.exiting && e.key === element.key) ??
          makeEntry(element, true)
      ),
    ])
  }

  useEffect(() => {
    if (!entries.some((e) => e.exiting)) return
    const timer = setTimeout(
      () => setEntries((current) => current.filter((e) => !e.exiting)),
      1000
    )
    return () => clearTimeout(timer)
  }, [entries])

  const latest = new Map(incoming.map((element) => [element.key, element]))

  return (
    <span
      data-slot="icon-swap"
      className={cn("np-icon-swap", className)}
      {...props}
    >
      {entries.map((entry) => {
        const element = entry.exiting
          ? entry.element
          : (latest.get(entry.key as string) ?? entry.element)

        return cloneElement(element, {
          key: entry.id,
          "data-state": entry.exiting
            ? "exit"
            : entry.entering
              ? "enter"
              : "idle",
          "data-active": entry.exiting ? undefined : "",
          "aria-hidden": entry.exiting ? true : element.props["aria-hidden"],
          onTransitionEnd: (event) => {
            element.props.onTransitionEnd?.(event)
            if (
              entry.exiting &&
              event.target === event.currentTarget &&
              event.propertyName === "opacity"
            ) {
              setEntries((current) => current.filter((e) => e.id !== entry.id))
            }
          },
        } as Partial<ComponentProps<"span">>)
      })}
    </span>
  )
}

function IconSwapItem({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="icon-swap-item"
      className={cn("np-icon-swap-item", className)}
      {...props}
    />
  )
}

export { IconSwap, IconSwapItem }
