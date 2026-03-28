import { env } from 'cloudflare:workers'
import OpenAI from 'openai'
import type { AITokenAnalysisResponse, AssetCategory, Tier } from '~/core/types'
import { computeCacheKey, getCachedValuation, setCachedValuation } from './cache.server'

const TOKEN_ANALYSIS_SYSTEM_PROMPT = `You are the Token For Granted engine — an AI opportunity cost calculator. Given an item someone wants to buy, estimate its real-world USD price and generate concrete things they could do with AI tokens instead.

You MUST respond with valid JSON only, no markdown or explanation outside the JSON.

Return a JSON object with these exact fields:
{
  "item_name": string (cleaned-up item name, title case, e.g. "Pokemon Charizard Holo 1st Edition"),
  "item_price": number (estimated real USD price — be accurate based on real market data),
  "price_confidence": number (0-100, how confident you are in the price estimate),
  "tier": "S" | "A" | "B" | "C" (S = over $5000, A = over $1000, B = over $200, C = $200 or less),
  "what_you_could_do": [
    { "action": string (short title, e.g. "Build 10 full-stack apps"), "description": string (1-2 sentences explaining what this means concretely), "icon_hint": string (one of: code, chat, image, music, data, robot, book, game) }
  ] (exactly 3-4 items — concrete things someone could BUILD or DO if they spent that money on AI tokens instead),
  "analysis": string (1-2 sentence punchy comparison, e.g. "That Pokemon card sits in a sleeve. Those tokens could build your next startup.")
}

CRITICAL pricing guidelines:
- Use REAL market prices. Research-quality estimates, not guesses.
- High-value collectibles: MTG Black Lotus = $100,000-$500,000+. Pokemon Base Set Charizard 1st Ed = $10,000-$400,000. Rare items can be worth enormous sums.
- Electronics: iPhone 16 Pro = ~$1,100, PS5 = ~$500, MacBook Pro = ~$2,500, Gaming PC = ~$1,500-$3,000.
- Fashion: Rolex Submariner = ~$10,000, Hermes Birkin = ~$10,000-$50,000, designer sneakers = $200-$500.
- Entertainment: Concert tickets = $50-$500, streaming subscriptions = $10-$20/mo.
- Food: Restaurant meal = $20-$100, grocery haul = $100-$300.
- When in doubt, estimate HIGH — the opportunity cost message is more impactful with real prices.
- NEVER underestimate rare collectibles, luxury goods, or vintage items.
- The what_you_could_do items should be CONCRETE and COMPELLING — make the person feel the opportunity cost.

The item category is: {category}.`

/**
 * Create an OpenAI client pointing at the AI Gateway compat endpoint.
 * This enables dynamic routing, budget caps, and unified billing.
 */
function getGatewayClient() {
  return new OpenAI({
    apiKey: env.AI_GATEWAY_TOKEN,
    baseURL: `https://gateway.ai.cloudflare.com/v1/${env.CLOUDFLARE_ACCOUNT_ID}/${env.AI_GATEWAY_ID}/compat`,
  })
}

/**
 * Generate a token analysis for a given item description and category.
 * Uses AI Gateway dynamic route "token-analysis" which handles:
 * - $10/month budget cap
 * - Model fallback: Llama 3.1 8B → Mistral 7B
 * Falls back to deterministic data if gateway/budget fails.
 * Results are cached in KV with 1-hour TTL.
 */
export async function generateTokenAnalysis(
  description: string,
  category: AssetCategory
): Promise<AITokenAnalysisResponse> {
  // 1. Check KV cache
  const cacheKey = await computeCacheKey(description, category)
  const cached = await getCachedValuation(cacheKey)
  if (cached) {
    return cached
  }

  const systemPrompt = TOKEN_ANALYSIS_SYSTEM_PROMPT.replace('{category}', category)

  let result: AITokenAnalysisResponse | null = null

  // 2. Call AI Gateway via OpenAI-compat endpoint with dynamic route
  //    Route handles: budget cap ($10/mo) → Llama 8B → (fallback) → Mistral 7B
  try {
    const client = getGatewayClient()
    const completion = await client.chat.completions.create({
      model: 'dynamic/token-analysis',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `I want to buy: ${description}` },
      ],
      max_tokens: 512,
    })

    const text = completion.choices?.[0]?.message?.content ?? ''
    result = parseAIResponse(text)
  } catch (e) {
    console.error('AI Gateway dynamic route failed:', e)
  }

  // 3. Deterministic fallback if gateway failed (budget exceeded, models down, etc.)
  if (!result) {
    result = generateDeterministicFallback(description, category)
  }

  // 4. Cache the result
  await setCachedValuation(cacheKey, result)

  return result
}

/**
 * Attempt to parse an AI text response as a valid AITokenAnalysisResponse JSON object.
 * Returns null if parsing fails.
 */
function parseAIResponse(text: string): AITokenAnalysisResponse | null {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return null

    const parsed = JSON.parse(jsonMatch[0])

    if (
      typeof parsed.item_name !== 'string' ||
      typeof parsed.item_price !== 'number' ||
      typeof parsed.price_confidence !== 'number' ||
      typeof parsed.tier !== 'string' ||
      !['S', 'A', 'B', 'C'].includes(parsed.tier) ||
      !Array.isArray(parsed.what_you_could_do)
    ) {
      return null
    }

    return {
      item_name: parsed.item_name,
      item_price: parsed.item_price,
      price_confidence: Math.min(100, Math.max(0, parsed.price_confidence)),
      tier: parsed.tier as Tier,
      what_you_could_do: parsed.what_you_could_do.slice(0, 4).map((item: Record<string, unknown>) => ({
        action: String(item.action ?? 'Use AI tokens'),
        description: String(item.description ?? 'Spend tokens on AI services instead.'),
        icon_hint: String(item.icon_hint ?? 'robot'),
      })),
      analysis: parsed.analysis ?? 'That money could go a lot further as AI tokens.',
    }
  } catch {
    return null
  }
}

/**
 * Generate deterministic but plausible token analysis from input hash.
 * Used as last-resort fallback when AI Gateway fails (budget exceeded, models down).
 */
export function generateDeterministicFallback(
  description: string,
  category: AssetCategory
): AITokenAnalysisResponse {
  let hash = 0
  const input = description + category
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = ((hash << 5) - hash + char) | 0
  }
  hash = Math.abs(hash)

  const priceRanges: Record<AssetCategory, [number, number]> = {
    electronics: [300, 3000],
    collectibles: [500, 50000],
    fashion: [100, 10000],
    entertainment: [20, 500],
    food: [10, 200],
    other: [50, 2000],
  }

  const [minPrice, maxPrice] = priceRanges[category]
  const itemPrice = minPrice + (hash % (maxPrice - minPrice))
  const priceConfidence = 55 + (hash % 35)

  let tier: Tier
  if (itemPrice > 5000) tier = 'S'
  else if (itemPrice > 1000) tier = 'A'
  else if (itemPrice > 200) tier = 'B'
  else tier = 'C'

  const itemName = description
    .split(/\s+/)
    .slice(0, 5)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')

  const categoryActions: Record<AssetCategory, AITokenAnalysisResponse['what_you_could_do']> = {
    electronics: [
      { action: 'Build a personal AI assistant', description: 'Enough tokens to create a custom chatbot that knows your workflow, answers questions, and automates daily tasks for months.', icon_hint: 'robot' },
      { action: 'Generate an entire app codebase', description: 'Use AI to architect, write, and debug a full-stack web application from scratch — frontend, backend, and database.', icon_hint: 'code' },
      { action: 'Analyze thousands of documents', description: 'Process and summarize your entire document library, extracting key insights and building a searchable knowledge base.', icon_hint: 'data' },
    ],
    collectibles: [
      { action: 'Create an AI-powered game', description: 'Design, build, and iterate on a game with AI-generated art, dialogue, and procedural content — more fun than any card in a sleeve.', icon_hint: 'game' },
      { action: 'Write and illustrate a book', description: 'Generate a complete novel with AI-assisted writing and create illustrations for every chapter.', icon_hint: 'book' },
      { action: 'Launch a side business', description: 'Use AI to research markets, generate business plans, create marketing copy, and build a landing page for your startup idea.', icon_hint: 'robot' },
    ],
    fashion: [
      { action: 'Build a personal style AI', description: 'Train a model on your wardrobe and get daily outfit recommendations, trend analysis, and sustainable fashion suggestions.', icon_hint: 'image' },
      { action: 'Generate a clothing line', description: 'Design an entire fashion collection with AI — patterns, colorways, marketing materials, and product descriptions.', icon_hint: 'image' },
      { action: 'Create a fashion blog empire', description: 'Generate months of high-quality fashion content, social media posts, and SEO-optimized articles with AI assistance.', icon_hint: 'book' },
    ],
    entertainment: [
      { action: 'Compose an album of music', description: 'Use AI to help write lyrics, generate melodies, arrange songs, and produce an entire album of original music.', icon_hint: 'music' },
      { action: 'Script a short film series', description: 'Write, storyboard, and plan a multi-episode series with AI-generated dialogue, scene descriptions, and shot lists.', icon_hint: 'chat' },
      { action: 'Build an interactive story app', description: 'Create a choose-your-own-adventure app with AI-generated narratives that adapt to player choices in real time.', icon_hint: 'game' },
    ],
    food: [
      { action: 'Create a personal recipe AI', description: 'Build a custom chef assistant that generates recipes based on your dietary needs, available ingredients, and taste preferences.', icon_hint: 'chat' },
      { action: 'Plan a year of meal preps', description: 'Generate 365 days of nutritionally balanced meal plans with shopping lists, prep instructions, and cost breakdowns.', icon_hint: 'data' },
      { action: 'Write a cookbook', description: 'Use AI to develop, test, and write an entire cookbook with original recipes, food photography descriptions, and nutritional analysis.', icon_hint: 'book' },
    ],
    other: [
      { action: 'Build a research assistant', description: 'Create an AI-powered tool that reads papers, summarizes findings, and helps you stay on top of any field of knowledge.', icon_hint: 'data' },
      { action: 'Automate your workflows', description: 'Use AI tokens to build custom automation scripts, process emails, generate reports, and handle repetitive tasks.', icon_hint: 'robot' },
      { action: 'Learn a new skill with AI tutoring', description: 'Get thousands of personalized tutoring sessions on any topic — programming, languages, math, music, or anything else.', icon_hint: 'book' },
    ],
  }

  const descriptionExcerpt = description.length > 40
    ? description.slice(0, 40) + '...'
    : description

  return {
    item_name: itemName,
    item_price: itemPrice,
    price_confidence: priceConfidence,
    tier,
    what_you_could_do: categoryActions[category],
    analysis: `That ${descriptionExcerpt} costs ~$${itemPrice}. Instead, you could mass-produce AI-powered projects that actually grow in value over time.`,
  }
}
