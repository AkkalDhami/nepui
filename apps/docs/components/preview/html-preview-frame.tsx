"use client"

import { useEffect, useMemo, useRef } from "react"

import { cn } from "@/lib/utils"
import { getPreviewCss } from "@/lib/preview"

interface HtmlPreviewFrameProps {
  html: string
  css: string
  js: string | null
  tokens: string | null
  className?: string
  height?: string
}

const RESIZE_SCRIPT = `
  (function () {
    function postHeight() {
      var height = document.documentElement.scrollHeight;
      window.parent.postMessage({ source: "nepui-preview", height: height }, "*");
    }
    var target = document.body;
    if ("ResizeObserver" in window) {
      new ResizeObserver(postHeight).observe(target);
    }
    window.addEventListener("load", postHeight);
    postHeight();
  })();
`

function buildPreviewDocument(
  html: string,
  css: string,
  js?: string | null,
  tokens?: string | null
) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="color-scheme" content="light dark" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
    <style id="nepui-component">${css}</style>
        <style id="nepui-component-tokens">${tokens}</style>

    <style id="nepui-docs-layout">
    ${getPreviewCss("docs")}
    </style>
  </head>
  <body>
    ${html}
    <script>${RESIZE_SCRIPT}</script>
    ${js ? `<script>${js}</script>` : ""}
  </body>
</html>`
}

export function HtmlPreviewFrame({
  html,
  css,
  js,
  tokens,
  height = "410px",
  className,
}: HtmlPreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const document = useMemo(
    () => buildPreviewDocument(html, css, js, tokens),
    [html, css, js, tokens]
  )

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.source !== iframeRef.current?.contentWindow) return
      if (event.data?.source !== "nepui-preview") return
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (
    <iframe
      ref={iframeRef}
      title="Component preview"
      sandbox="allow-scripts"
      srcDoc={document}
      style={{ height }}
      className={cn(
        "flex w-full items-center justify-center rounded-b-lg border-0 bg-background transition-[height]",
        className
      )}
    />
  )
}
