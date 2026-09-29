import { siteConfig } from "@/lib/seo"
import { cn } from "cn"
import Link from "next/link"
import type { SVGProps } from "react"

export function Logo({
  className,
  variant = "default",
  ...props
}: SVGProps<SVGSVGElement> & {
  variant?: "default" | "icon"
}) {
  if (variant === "icon") {
    return (
      <Link href="/">
        <LogoIcon className={className} {...props} />
      </Link>
    )
  }
  return (
    <Link href="/" className="flex items-center">
      <LogoIcon className={className} {...props} />
      <div className="-ml-2 text-lg font-medium">{siteConfig.name}</div>
    </Link>
  )
}

function LogoIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1254 1254"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo"
      className={cn("size-12 text-accent-foreground", className)}
      fill="currentColor"
      {...props}
    >
      <g transform="translate(0,1254) scale(0.1,-0.1)" stroke="none">
        <path d="M4462 8430 c-106 -28 -187 -75 -268 -155 -51 -51 -81 -92 -107 -145 -72 -147 -67 -15 -67 -1845 0 -1884 -8 -1719 88 -1815 44 -43 70 -60 116 -74 114 -36 234 -2 314 89 78 88 72 -51 72 1752 0 887 2 1613 4 1613 2 0 93 -60 202 -134 110 -74 264 -179 344 -233 80 -53 285 -192 455 -308 171 -116 409 -278 530 -359 258 -174 312 -223 363 -325 l37 -75 5 -405 5 -406 28 -57 c33 -67 91 -121 155 -142 54 -19 145 -21 193 -5 59 20 124 75 155 131 l29 53 0 545 0 545 -27 73 c-37 101 -82 173 -153 243 -42 42 -351 253 -1050 720 -544 364 -1015 672 -1045 686 -119 54 -253 65 -378 33z M8014 8441 c-100 -26 -185 -99 -232 -199 l-27 -57 -2 -1313 c-2 -1290 -3 -1315 -23 -1388 -74 -272 -321 -534 -597 -634 -185 -66 -347 -74 -543 -24 -174 44 -324 130 -466 266 -178 171 -285 385 -339 678 -13 70 -20 174 -24 395 -7 337 -9 346 -83 422 -143 146 -398 94 -462 -95 -22 -65 -23 -590 -1 -759 81 -621 408 -1107 920 -1363 277 -139 534 -192 825 -170 148 12 166 15 295 47 516 132 937 517 1106 1012 61 179 59 118 59 1582 0 1321 0 1339 -20 1393 -44 117 -165 205 -292 212 -35 2 -77 0 -94 -5z" />
      </g>
    </svg>
  )
}
