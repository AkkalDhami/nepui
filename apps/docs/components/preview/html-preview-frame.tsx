"use client"

import { useEffect, useMemo, useRef } from "react"

import { cn } from "@/lib/utils"

interface HtmlPreviewFrameProps {
  html: string
  css: string
  js: string | null
  tokens?: string
  className?: string
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

function buildPreviewDocument(html: string, css: string, js?: string | null) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="color-scheme" content="light dark" />
    <style id="nepui-component">${css}</style>
    <style id="nepui-docs-layout">
      html, body {
        margin: 0;
        padding: 0;
      }
      body {
        box-sizing: border-box;
        min-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2.5rem 1.5rem;
        font-family:
          ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
      }
      *, *::before, *::after {
        box-sizing: border-box;
      }
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
  className,
}: HtmlPreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const document = useMemo(
    () => buildPreviewDocument(html, css, js),
    [html, css, js]
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
      style={{ height: "480px" }}
      className={cn(
        "w-full rounded-b-lg border-0 bg-background transition-[height]",
        className
      )}
    />
  )
}
