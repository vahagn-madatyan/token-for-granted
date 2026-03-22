import { getEvent } from 'vinxi/http'
import type { AIValuationResponse, AssetCategory } from '~/core/types'

function getEnv() {
  const event = getEvent()
  return (event as any).context.cloudflare.env as {
    AI: any
    AI_GATEWAY_ID: string
  }
}
import { computeCacheKey, getCachedValuation, setCachedValuation } from './cache.server'

const VALUATION_SYSTEM_PROMPT = `You are the ARCANA Tactical Valuation Engine, a sophisticated AI system that analyzes assets and provides tactical market intelligence. You MUST respond with valid JSON only, no markdown or explanation outside the JSON.

Analyze the submitted asset and return a JSON object with these exact fields:
{
  "current_value": number (estimated current USD value, be reasonable based on the asset type),
  "projected_value": number (estimated value in 12 months, slightly higher than current),
  "confidence": number (0-100, your confidence percentage in this valuation),
  "growth_rate": number (percentage growth rate, e.g. 12.4 for 12.4%),
  "tier": "S" | "A" | "B" | "C" (S=exceptional, A=high value, B=moderate, C=standard),
  "density_score": number (0-100, a tactical density metric),
  "analysis": string (2-3 sentence tactical analysis of the asset),
  "multiplier_categories": [
    { "name": string, "relevance": number (0-100), "description": string }
  ] (exactly 3 categories relevant to this asset),
  "asset_name": string (short tactical codename for the asset, UPPERCASE),
  "asset_code": string (format: XXX-99-YYY, tactical identifier),
  "art_edition": string (e.g. "1ST EDITION // HOLO_GEN_01")
}

Base your valuation on reasonable real-world logic. The asset category is: {category}.`

/**
 * Generate a valuation for a given asset description and category.
 * Uses 3-tier fallback: primary AI model -> fallback model -> deterministic mock.
 * Results are cached in KV with 1-hour TTL.
 */
export async function generateValuation(
  description: string,
  category: AssetCategory
): Promise<AIValuationResponse> {
  // 1. Check KV cache
  const cacheKey = await computeCacheKey(description, category)
  const cached = await getCachedValuation(cacheKey)
  if (cached) {
    return cached
  }

  const systemPrompt = VALUATION_SYSTEM_PROMPT.replace('{category}', category)
  const messages = [
    { role: 'system' as const, content: systemPrompt },
    { role: 'user' as const, content: `Analyze this ${category} asset: ${description}` },
  ]

  let result: AIValuationResponse | null = null

  // 2. Try primary model
  try {
    const response = await getEnv().AI.run(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      '@cf/meta/llama-3.1-8b-instruct-fast' as any,
      { messages, max_tokens: 512 },
      { gateway: { id: getEnv().AI_GATEWAY_ID, skipCache: false } }
    )

    const text = typeof response === 'string'
      ? response
      : 'response' in response
        ? response.response ?? ''
        : ''

    result = parseAIResponse(text)
  } catch {
    // Primary model failed, try fallback
  }

  // 3. Try fallback model if primary failed
  if (!result) {
    try {
      const response = await getEnv().AI.run(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        '@cf/mistral/mistral-7b-instruct-v0.2' as any,
        { messages, max_tokens: 512 },
        { gateway: { id: getEnv().AI_GATEWAY_ID, skipCache: false } }
      )

      const text = typeof response === 'string'
        ? response
        : 'response' in response
          ? response.response ?? ''
          : ''

      result = parseAIResponse(text)
    } catch {
      // Fallback model also failed
    }
  }

  // 4. Deterministic fallback if both models failed
  if (!result) {
    result = generateDeterministicFallback(description, category)
  }

  // 5. Cache the result
  await setCachedValuation(cacheKey, result)

  return result
}

/**
 * Attempt to parse an AI text response as a valid AIValuationResponse JSON object.
 * Returns null if parsing fails.
 */
function parseAIResponse(text: string): AIValuationResponse | null {
  try {
    // Try to extract JSON from the response (may be wrapped in markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return null

    const parsed = JSON.parse(jsonMatch[0])

    // Validate required fields exist
    if (
      typeof parsed.current_value !== 'number' ||
      typeof parsed.projected_value !== 'number' ||
      typeof parsed.confidence !== 'number' ||
      typeof parsed.tier !== 'string' ||
      !['S', 'A', 'B', 'C'].includes(parsed.tier)
    ) {
      return null
    }

    return {
      current_value: parsed.current_value,
      projected_value: parsed.projected_value,
      confidence: parsed.confidence,
      growth_rate: parsed.growth_rate ?? 0,
      tier: parsed.tier,
      density_score: parsed.density_score ?? 50,
      analysis: parsed.analysis ?? 'Tactical analysis pending.',
      multiplier_categories: Array.isArray(parsed.multiplier_categories)
        ? parsed.multiplier_categories.slice(0, 3)
        : [],
      asset_name: parsed.asset_name ?? 'UNKNOWN',
      asset_code: parsed.asset_code ?? 'UNK-00-XXX',
      art_edition: parsed.art_edition ?? '1ST EDITION // GEN_01',
    }
  } catch {
    return null
  }
}

/**
 * Generate deterministic but plausible valuation data from input hash.
 * Used as last-resort fallback when both AI models fail to produce valid JSON.
 */
export function generateDeterministicFallback(
  description: string,
  category: AssetCategory
): AIValuationResponse {
  // Simple string hash
  let hash = 0
  const input = description + category
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = ((hash << 5) - hash + char) | 0
  }
  hash = Math.abs(hash)

  const currentValue = 500 + (hash % 9500)
  const projectedValue = Math.round(currentValue * (1.05 + (hash % 30) / 100))
  const confidence = 60 + (hash % 35)
  const densityScore = 40 + (hash % 55)
  const growthRate = 5 + (hash % 20)

  let tier: 'S' | 'A' | 'B' | 'C'
  if (currentValue > 7000) tier = 'S'
  else if (currentValue > 4000) tier = 'A'
  else if (currentValue > 2000) tier = 'B'
  else tier = 'C'

  const firstWord = description.split(/\s+/)[0]?.toUpperCase() ?? 'ASSET'
  const assetName = firstWord.slice(0, 12)
  const codeDigits = String(hash % 10000).padStart(4, '0')
  const assetCode = `${category.slice(0, 3).toUpperCase()}-${codeDigits.slice(0, 2)}-${codeDigits.slice(2, 4)}X`

  const categoryMultipliers: Record<AssetCategory, AIValuationResponse['multiplier_categories']> = {
    collectible: [
      { name: 'Rarity Factor', relevance: 70 + (hash % 25), description: 'Scarcity-driven demand amplifier for limited editions' },
      { name: 'Cultural Impact', relevance: 50 + (hash % 40), description: 'Historical and cultural significance multiplier' },
      { name: 'Condition Index', relevance: 60 + (hash % 30), description: 'Preservation state relative to mint condition' },
    ],
    art: [
      { name: 'Provenance Chain', relevance: 65 + (hash % 30), description: 'Verified ownership history and authenticity trail' },
      { name: 'Artist Momentum', relevance: 55 + (hash % 35), description: 'Creator market trajectory and gallery presence' },
      { name: 'Medium Scarcity', relevance: 45 + (hash % 40), description: 'Material and technique rarity assessment' },
    ],
    tech: [
      { name: 'Innovation Index', relevance: 70 + (hash % 25), description: 'Technological advancement and disruption potential' },
      { name: 'Adoption Curve', relevance: 60 + (hash % 30), description: 'Market penetration and user growth trajectory' },
      { name: 'Ecosystem Lock-in', relevance: 50 + (hash % 35), description: 'Platform dependency and switching cost factor' },
    ],
    luxury: [
      { name: 'Brand Prestige', relevance: 75 + (hash % 20), description: 'Heritage brand recognition and exclusivity tier' },
      { name: 'Craftsmanship Score', relevance: 65 + (hash % 25), description: 'Artisanal quality and manufacturing precision' },
      { name: 'Resale Velocity', relevance: 55 + (hash % 30), description: 'Secondary market liquidity and demand persistence' },
    ],
    other: [
      { name: 'Market Demand', relevance: 60 + (hash % 30), description: 'Current buyer interest and acquisition activity' },
      { name: 'Uniqueness Factor', relevance: 50 + (hash % 35), description: 'Distinctive attributes relative to comparable assets' },
      { name: 'Utility Score', relevance: 45 + (hash % 40), description: 'Functional value and practical application potential' },
    ],
  }

  const artEditions: Record<AssetCategory, string> = {
    collectible: '1ST EDITION // MINT_SEALED',
    art: '1ST EDITION // GALLERY_PROOF',
    tech: '1ST EDITION // PROTO_GEN_01',
    luxury: '1ST EDITION // ATELIER_PRIME',
    other: '1ST EDITION // HOLO_GEN_01',
  }

  const descriptionExcerpt = description.length > 50
    ? description.slice(0, 50) + '...'
    : description

  return {
    current_value: currentValue,
    projected_value: projectedValue,
    confidence,
    growth_rate: growthRate,
    tier,
    density_score: densityScore,
    analysis: `Tactical analysis of ${category} asset "${descriptionExcerpt}" indicates ${tier}-tier classification with ${confidence}% confidence. Growth trajectory projected at ${growthRate}% over the next 12-month cycle.`,
    multiplier_categories: categoryMultipliers[category],
    asset_name: assetName,
    asset_code: assetCode,
    art_edition: artEditions[category],
  }
}
