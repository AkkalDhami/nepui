import { PackageManager } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type TargetType = "html" | "react"
interface ConfigState {
  packageManager: PackageManager
  target: TargetType

  setPackageManager: (packageManager: PackageManager) => void
  setTarget: (target: TargetType) => void
}

export const useConfig = create<ConfigState>()(
  persist(
    (set) => ({
      packageManager: "npm",
      target: "html",

      setPackageManager: (packageManager) => set({ packageManager }),
      setTarget: (target) => set({ target }),
    }),
    {
      name: "nepui-docs-preferences",
    }
  )
)
