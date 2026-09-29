"use client"

import { ArrowUpIcon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const handleOnclick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  const watchScroll = () => {
    const hiddenHeight = 200
    const winscroll =
      document.body.scrollTop || document.documentElement.scrollTop

    if (winscroll > hiddenHeight) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", watchScroll)
    return () => window.removeEventListener("scroll", watchScroll)
  }, [])
  return (
    isVisible && (
      <button
        onClick={handleOnclick}
        className="fixed right-3 bottom-5 z-40 cursor-pointer rounded-full bg-secondary p-3 text-secondary-foreground duration-300 hover:bg-secondary/80 sm:right-12"
      >
        <ArrowUpIcon className="size-4" />
      </button>
    )
  )
}
