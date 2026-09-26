import { DEFAULT_PRODUCTION_REGISTRY_URL } from "@/constants"

export function getRegistryBaseUrl(): string {
  const base = DEFAULT_PRODUCTION_REGISTRY_URL
  return base.replace(/\/+$/, "")
}
