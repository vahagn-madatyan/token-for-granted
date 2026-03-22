import { getEvent } from 'vinxi/http'
import type { AIValuationResponse } from '~/core/types'

function getEnv() {
  const event = getEvent()
  return (event as any).context.cloudflare.env as {
    KV: KVNamespace
  }
}

/**
 * Compute a deterministic cache key from description and category.
 * Format: valuation:${sha256hex}
 */
export async function computeCacheKey(
  description: string,
  category: string
): Promise<string> {
  const input = `${description}|${category}`
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return `valuation:${hashHex}`
}

/**
 * Retrieve a cached AI valuation response from KV.
 * Returns null if not found or expired.
 */
export async function getCachedValuation(
  key: string
): Promise<AIValuationResponse | null> {
  const cached = await getEnv().KV.get<AIValuationResponse>(key, 'json')
  return cached ?? null
}

/**
 * Store an AI valuation response in KV with 1-hour TTL.
 */
export async function setCachedValuation(
  key: string,
  data: AIValuationResponse
): Promise<void> {
  await getEnv().KV.put(key, JSON.stringify(data), { expirationTtl: 3600 })
}
