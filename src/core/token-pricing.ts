import type { TokenConversion } from './types'

export interface ProviderPricing {
  provider: string
  model: string
  price_per_million_input: number
  price_per_million_output: number
}

export const AI_PROVIDERS: ProviderPricing[] = [
  // OpenAI
  { provider: 'OpenAI', model: 'GPT-4o', price_per_million_input: 2.50, price_per_million_output: 10.00 },
  { provider: 'OpenAI', model: 'GPT-4o-mini', price_per_million_input: 0.15, price_per_million_output: 0.60 },
  { provider: 'OpenAI', model: 'GPT-4.1', price_per_million_input: 2.00, price_per_million_output: 8.00 },
  { provider: 'OpenAI', model: 'GPT-4.1-mini', price_per_million_input: 0.40, price_per_million_output: 1.60 },
  { provider: 'OpenAI', model: 'GPT-4.1-nano', price_per_million_input: 0.10, price_per_million_output: 0.40 },
  // Anthropic
  { provider: 'Anthropic', model: 'Claude Opus 4', price_per_million_input: 15.00, price_per_million_output: 75.00 },
  { provider: 'Anthropic', model: 'Claude Sonnet 4', price_per_million_input: 3.00, price_per_million_output: 15.00 },
  { provider: 'Anthropic', model: 'Claude Haiku 3.5', price_per_million_input: 0.80, price_per_million_output: 4.00 },
  // Google
  { provider: 'Google', model: 'Gemini 2.5 Pro', price_per_million_input: 1.25, price_per_million_output: 10.00 },
  { provider: 'Google', model: 'Gemini 2.5 Flash', price_per_million_input: 0.15, price_per_million_output: 0.60 },
  { provider: 'Google', model: 'Gemini 2.0 Flash', price_per_million_input: 0.10, price_per_million_output: 0.40 },
  // xAI
  { provider: 'xAI', model: 'Grok 3', price_per_million_input: 3.00, price_per_million_output: 15.00 },
  { provider: 'xAI', model: 'Grok 3 Mini', price_per_million_input: 0.30, price_per_million_output: 0.50 },
  // DeepSeek
  { provider: 'DeepSeek', model: 'DeepSeek V3', price_per_million_input: 0.27, price_per_million_output: 1.10 },
  { provider: 'DeepSeek', model: 'DeepSeek R1', price_per_million_input: 0.55, price_per_million_output: 2.19 },
  // Meta (via Cloudflare Workers AI)
  { provider: 'Meta', model: 'Llama 3.1 8B', price_per_million_input: 0.05, price_per_million_output: 0.05 },
  // Mistral
  { provider: 'Mistral', model: 'Mistral Large', price_per_million_input: 2.00, price_per_million_output: 6.00 },
  { provider: 'Mistral', model: 'Mistral Small', price_per_million_input: 0.10, price_per_million_output: 0.30 },
  // Cohere
  { provider: 'Cohere', model: 'Command R+', price_per_million_input: 2.50, price_per_million_output: 10.00 },
  { provider: 'Cohere', model: 'Command R', price_per_million_input: 0.15, price_per_million_output: 0.60 },
]

export const PRICING_LAST_UPDATED = '2026-03-22'

/**
 * Convert a USD amount into token counts across all AI providers.
 */
export function calculateTokenConversions(priceUSD: number): TokenConversion[] {
  return AI_PROVIDERS.map((p) => ({
    provider: p.provider,
    model: p.model,
    price_per_million_input: p.price_per_million_input,
    price_per_million_output: p.price_per_million_output,
    tokens_you_get_input: Math.round((priceUSD / p.price_per_million_input) * 1_000_000),
    tokens_you_get_output: Math.round((priceUSD / p.price_per_million_output) * 1_000_000),
  }))
}

/**
 * Format a large token number into a human-readable string.
 * e.g., 3333333 → "3.3M", 500000 → "500K", 1200000000 → "1.2B"
 */
export function formatTokenCount(count: number): string {
  if (count >= 1_000_000_000_000) return `${(count / 1_000_000_000_000).toFixed(1)}T`
  if (count >= 1_000_000_000) return `${(count / 1_000_000_000).toFixed(1)}B`
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K`
  return count.toString()
}

/**
 * Get the provider with the most tokens for a given price (best value).
 */
export function getBestValueProvider(conversions: TokenConversion[]): TokenConversion {
  return conversions.reduce((best, current) =>
    current.tokens_you_get_input > best.tokens_you_get_input ? current : best
  )
}
