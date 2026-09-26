import { getRegistryBaseUrl } from "@/config/index.js"
import { ComponentNotFoundError, RegistryError } from "@/utils/errors.js"
import type { RegistryIndex, RegistryItem, Target } from "@/types"
import {
  validateRegistryIndex,
  validateRegistryItem,
} from "@/registry/validate"
import { DEFAULT_DEVELOPMENT_REGISTRY_URL } from "@/constants"

/** Build the URL for a single component: `<base>/r/<target>/<name>.json`. */
export function buildComponentUrl(
  target: Target,
  name: string,
  local?: boolean
): string {
  const base = local ? DEFAULT_DEVELOPMENT_REGISTRY_URL : getRegistryBaseUrl()
  const encodedName = encodeURIComponent(name)
  return `${base}/r/${target}/${encodedName}.json`
}

/** Build the URL for a component index: `<base>/r/<target>/index.json`. */
export function buildIndexUrl(target: Target, local?: boolean): string {
  const base = local ? DEFAULT_DEVELOPMENT_REGISTRY_URL : getRegistryBaseUrl()
  return `${base}/r/${target}/registry.json`
}

/**
 * Fetch a single component's JSON from the registry and validate it.
 * Throws `ComponentNotFoundError` on 404, `RegistryError` on other
 * network/HTTP failures, and `RegistryValidationError` on malformed JSON.
 */
export async function fetchComponent(
  target: Target,
  name: string,
  local?: boolean
): Promise<RegistryItem> {
  const url = buildComponentUrl(target, name, local)
  const response = await performFetch(url)

  if (response.status === 404) {
    throw new ComponentNotFoundError(name)
  }

  if (!response.ok) {
    throw new RegistryError(
      `Could not fetch:\n${url}\n\nThe registry responded with status ${response.status}.`,
      url
    )
  }

  const json = await parseJson(response, url)
  return validateRegistryItem(json, url)
}

/**
 * Fetch a component index (list) for a target and validate it.
 * Throws the same error types as `fetchComponent`.
 */
export async function fetchIndex(
  target: Target,
  local?: boolean
): Promise<RegistryIndex> {
  const url = buildIndexUrl(target, local)
  const response = await performFetch(url)

  if (response.status === 404) {
    throw new RegistryError(
      `Could not fetch component list:\n${url}\n\nThe registry has no index for target "${target}".`,
      url
    )
  }

  if (!response.ok) {
    throw new RegistryError(
      `Could not fetch component list:\n${url}\n\nThe registry responded with status ${response.status}.`,
      url
    )
  }

  const json = await parseJson(response, url)
  return validateRegistryIndex(json, url)
}

async function performFetch(url: string): Promise<Response> {
  try {
    return await fetch(url)
  } catch {
    throw new RegistryError(
      `Could not fetch:\n${url}\n\nA network error occurred. Check your connection and the registry URL.`,
      url
    )
  }
}

async function parseJson(response: Response, url: string): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    throw new RegistryError(`Invalid JSON received from:\n${url}`, url)
  }
}
