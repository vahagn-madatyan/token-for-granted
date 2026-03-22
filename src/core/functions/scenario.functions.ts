import { createServerFn } from '@tanstack/react-start'
import { env } from 'cloudflare:workers'
import { runScenarioSchema } from '~/core/schemas'
import { calculateTokenConversions, formatTokenCount, getBestValueProvider } from '~/core/token-pricing'

const SCENARIO_SYSTEM_PROMPT = `You are the Token For Granted "What If" engine. Given an item name and its price, generate a vivid, compelling scenario describing what someone could accomplish if they spent that money on AI tokens instead.

You MUST respond with valid JSON only, no markdown or explanation outside the JSON.

Return a JSON object with these exact fields:
{
  "title": string (catchy short title, e.g. "The App Factory"),
  "scenario": string (3-5 sentences painting a vivid picture of what they could build/create/accomplish with AI tokens worth this much money. Be specific — mention token counts, concrete outputs, and tangible results. Make the reader feel the opportunity cost viscerally.),
  "key_insight": string (1 punchy sentence that drives the point home, e.g. "That sneaker collection gathers dust. Those tokens build empires.")
}

Be creative and unique each time. Mix technical precision with emotional impact.`

/**
 * Generate deterministic fallback scenarios based on price tier.
 */
function generateFallbackScenario(itemName: string, itemPrice: number): {
  title: string
  scenario: string
  key_insight: string
} {
  const conversions = calculateTokenConversions(itemPrice)
  const bestValue = getBestValueProvider(conversions)
  const tokenStr = formatTokenCount(bestValue.tokens_you_get_input)

  if (itemPrice > 5000) {
    return {
      title: 'The AI Startup Incubator',
      scenario: `Instead of dropping $${itemPrice.toLocaleString()} on "${itemName}", you could mass-produce AI applications at scale. With ${tokenStr} tokens on ${bestValue.model}, you could prototype 50+ app concepts, build production-ready MVPs for the best ones, generate all marketing copy, and still have tokens left for months of customer support automation. That's not a purchase — that's seed funding for an AI-native business.`,
      key_insight: `"${itemName}" depreciates the moment you buy it. AI tokens compound into products that generate revenue.`,
    }
  }

  if (itemPrice > 1000) {
    return {
      title: 'The Knowledge Multiplier',
      scenario: `$${itemPrice.toLocaleString()} on "${itemName}" gives you one thing. The same money buys ${tokenStr} tokens on ${bestValue.model} — enough to process thousands of research papers, write a technical book, build a custom AI tutor that teaches you any skill, and generate a portfolio of 20+ projects. Each token is a tiny worker building your future.`,
      key_insight: `"${itemName}" sits on a shelf. Those tokens build skills that pay for themselves a hundred times over.`,
    }
  }

  if (itemPrice > 200) {
    return {
      title: 'The Creative Engine',
      scenario: `Skip the $${itemPrice.toLocaleString()} "${itemName}" and unlock ${tokenStr} tokens on ${bestValue.model}. That's enough to write an entire novel with AI collaboration, generate hundreds of images for a design portfolio, build three full-stack web apps, or create a month-long automated content pipeline. Real output, not just another possession.`,
      key_insight: `"${itemName}" is a momentary want. Those tokens are a permanent capability upgrade.`,
    }
  }

  return {
    title: 'The Token Starter Pack',
    scenario: `Even $${itemPrice.toLocaleString()} for "${itemName}" could be redirected into ${tokenStr} tokens on ${bestValue.model}. That's enough for a weekend hackathon building a personal AI assistant, generating a week of social media content, or prototyping your app idea. Small money, real output.`,
    key_insight: `You won't miss "${itemName}" in a week. But what you build with those tokens could change your trajectory.`,
  }
}

/**
 * Run a What-If Lab scenario: given an item name and price,
 * generate a "what if you spent this on AI instead?" scenario.
 * Uses 3-tier fallback: Llama -> Mistral -> deterministic.
 */
export const runScenario = createServerFn({ method: 'POST' })
  .inputValidator(runScenarioSchema)
  .handler(async ({ data }) => {
    const { itemName, itemPrice } = data

    const conversions = calculateTokenConversions(itemPrice)
    const bestValue = getBestValueProvider(conversions)
    const tokenStr = formatTokenCount(bestValue.tokens_you_get_input)

    const messages = [
      { role: 'system' as const, content: SCENARIO_SYSTEM_PROMPT },
      {
        role: 'user' as const,
        content: `Item: "${itemName}" — Price: $${itemPrice.toLocaleString()}. Best token value: ${tokenStr} tokens on ${bestValue.provider} ${bestValue.model}. Generate a "what if" scenario.`,
      },
    ]

    // 1. Try primary model (Llama)
    try {
      const response = await env.AI.run(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        '@cf/meta/llama-3.1-8b-instruct-fast' as any,
        { messages, max_tokens: 512 },
        { gateway: { id: env.AI_GATEWAY_ID, skipCache: false, authorization: `Bearer ${env.AI_GATEWAY_TOKEN}` } }
      )

      const text = typeof response === 'string'
        ? response
        : 'response' in response
          ? (response.response ?? '')
          : ''

      const parsed = parseScenarioResponse(text)
      if (parsed) {
        return { ...parsed, itemName, itemPrice }
      }
    } catch {
      // Primary model failed, try fallback
    }

    // 2. Try fallback model (Mistral)
    try {
      const response = await env.AI.run(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        '@cf/mistral/mistral-7b-instruct-v0.2' as any,
        { messages, max_tokens: 512 },
        { gateway: { id: env.AI_GATEWAY_ID, skipCache: false, authorization: `Bearer ${env.AI_GATEWAY_TOKEN}` } }
      )

      const text = typeof response === 'string'
        ? response
        : 'response' in response
          ? (response.response ?? '')
          : ''

      const parsed = parseScenarioResponse(text)
      if (parsed) {
        return { ...parsed, itemName, itemPrice }
      }
    } catch {
      // Fallback model also failed
    }

    // 3. Deterministic fallback
    const fallback = generateFallbackScenario(itemName, itemPrice)
    return { ...fallback, itemName, itemPrice }
  })

/**
 * Parse AI scenario response JSON. Returns null if invalid.
 */
function parseScenarioResponse(text: string): {
  title: string
  scenario: string
  key_insight: string
} | null {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return null

    const parsed = JSON.parse(jsonMatch[0])

    if (
      typeof parsed.title !== 'string' ||
      typeof parsed.scenario !== 'string' ||
      typeof parsed.key_insight !== 'string'
    ) {
      return null
    }

    return {
      title: parsed.title,
      scenario: parsed.scenario,
      key_insight: parsed.key_insight,
    }
  } catch {
    return null
  }
}
