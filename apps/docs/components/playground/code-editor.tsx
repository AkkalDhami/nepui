/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/refs */
"use client"

import { useEffect, useRef } from "react"

import { EditorState, type Extension } from "@codemirror/state"
import { coolGlow, tomorrow, } from "thememirror"
import { EditorView, keymap, lineNumbers } from "@codemirror/view"

import { defaultKeymap, indentWithTab } from "@codemirror/commands"

import {
  bracketMatching,
  syntaxHighlighting,
  defaultHighlightStyle,
} from "@codemirror/language"

import { html } from "@codemirror/lang-html"
import { css } from "@codemirror/lang-css"
import { javascript } from "@codemirror/lang-javascript"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes";

export type EditorLanguage =
  "html" | "css" | "javascript" | "typescript" | "text"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: EditorLanguage
  className?: string
}

function getLanguageExtension(language: EditorLanguage): Extension {
  switch (language) {
    case "html":
      return html()

    case "css":
      return css()

    case "javascript":
      return javascript()

    case "typescript":
      return javascript({
        typescript: true,
      })

    default:
      return []
  }
}


const editorFont = EditorView.theme({
  ".cm-scroller": {
    fontFamily: "var(--font-mono), monospace",
    fontSize: "16px",
  },

  ".cm-content": {
    fontFamily: "var(--font-code), monospace",
  },

  ".cm-gutters": {
    fontFamily: "var(--font-code), monospace",
    fontSize: "16px",
  },
})

export function CodeEditor({
  value,
  onChange,
  language,
  className,
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const viewRef = useRef<EditorView | null>(null)

  const valueRef = useRef(value)

  const onChangeRef = useRef(onChange)

  onChangeRef.current = onChange

  const themeExt = isDark ? coolGlow : tomorrow

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const state = EditorState.create({
      doc: value,

      extensions: [
        lineNumbers(),

        // dracula,

        // coolGlow,

        themeExt,

        getLanguageExtension(language),

        syntaxHighlighting(defaultHighlightStyle),

        bracketMatching(),

        editorFont,

        // editorTheme,

        keymap.of([indentWithTab, ...defaultKeymap]),

        EditorView.lineWrapping,

        EditorView.updateListener.of((update) => {
          if (!update.docChanged) {
            return
          }

          const nextValue = update.state.doc.toString()

          valueRef.current = nextValue

          onChangeRef.current(nextValue)
        }),
      ],
    })

    const view = new EditorView({
      state,
      parent: containerRef.current,
    })

    viewRef.current = view

    return () => {
      view.destroy()
      viewRef.current = null
    }
  }, [language, themeExt])

  useEffect(() => {
    const view = viewRef.current

    if (!view) {
      return
    }

    if (value === valueRef.current) {
      return
    }

    const currentValue = view.state.doc.toString()

    if (currentValue === value) {
      valueRef.current = value
      return
    }

    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: value,
      },
    })

    valueRef.current = value
  }, [value])

  return (
    <div
      ref={containerRef}
      className={cn("h-full min-h-75 overflow-auto scrollbar-thin", className)}
    />
  )
}