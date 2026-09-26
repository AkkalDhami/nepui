import { PackageManager } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type TargetType = "html" | "react"

type Registry = "nepui" | "shadcn"

interface ConfigState {
  packageManager: PackageManager
  setPackageManager: (packageManager: PackageManager) => void

  target: TargetType
  setTarget: (target: TargetType) => void

  registry: Registry
  setRegistry: (registry: Registry) => void
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
    }),
    {
      name: "nepui-docs-preferences",
    }
  )
)
