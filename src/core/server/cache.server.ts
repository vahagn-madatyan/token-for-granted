import { env } from 'cloudflare:workers'
import type { AITokenAnalysisResponse } from '~/core/types'

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
 * Retrieve a cached AI token analysis response from KV.
 * Returns null if not found or expired.
 */
export async function getCachedValuation(
  key: string
): Promise<AITokenAnalysisResponse | null> {
  const cached = await env.KV.get<AITokenAnalysisResponse>(key, 'json')
  return cached ?? null
}

/**
 * Store an AI token analysis response in KV with 1-hour TTL.
 */
export async function setCachedValuation(
  key: string,
  data: AITokenAnalysisResponse
): Promise<void> {
  await env.KV.put(key, JSON.stringify(data), { expirationTtl: 3600 })
}

/**
 * Compute a cache key for product images. Format: image:${sha256hex}
 */
export async function computeImageCacheKey(itemName: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(itemName)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return `image:${hashHex}`
}

/**
 * Retrieve a cached product image from KV. Returns base64 data URL or null.
 */
export async function getCachedImage(key: string): Promise<string | null> {
  return await env.KV.get(key, 'text') ?? null
}

/**
 * Store a product image in KV with 24-hour TTL.
 */
export async function setCachedImage(key: string, dataUrl: string): Promise<void> {
  await env.KV.put(key, dataUrl, { expirationTtl: 86400 })
}
