import { CodeTheme } from "@/components/playground/code-editor"
import { PackageManager } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type TargetType = "html" | "react"
type Registry = "nepui" | "shadcn"

export type FontFamily = "fira-code" | "geist-mono" | "jetbrains-mono"

interface ConfigState {
  packageManager: PackageManager
  setPackageManager: (packageManager: PackageManager) => void

  target: TargetType
  setTarget: (target: TargetType) => void

  registry: Registry
  setRegistry: (registry: Registry) => void

  theme: CodeTheme
  setTheme: (theme: CodeTheme) => void

  font: FontFamily
  setFont: (font: FontFamily) => void

  fontSize: string
  setFontSize: (fontSize: string) => void
}

export const useConfig = create<ConfigState>()(
  persist(
    (set) => ({
      packageManager: "npm",
      setPackageManager: (packageManager) => set({ packageManager }),

      target: "html",
      setTarget: (target) => set({ target }),

      registry: "nepui",
      setRegistry: (registry) => set({ registry }),

      theme: "cobalt",
      setTheme: (theme) => set({ theme }),

      font: "jetbrains-mono",
      setFont: (font) => set({ font }),

      fontSize: "16px",
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    {
      name: "nepui-docs-preferences",
    }
  )
)
