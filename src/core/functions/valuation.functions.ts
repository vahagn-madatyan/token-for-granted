import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { createValuationSchema, getValuationSchema } from '~/core/schemas'
import type { Valuation, ValuationResult } from '~/core/types'
import {
  insertValuation,
  getValuationById,
  updateValuationWithAI,
  listValuations as listValuationsDb,
  getRecentValuations as getRecentValuationsDb,
} from '~/core/server/db.server'
import { generateTokenAnalysis } from '~/core/server/ai.server'
import { calculateTokenConversions } from '~/core/token-pricing'

/**
 * Create a new valuation: store in D1, generate AI token analysis,
 * calculate token conversions deterministically, update with results.
 * Returns { id } for redirect to the reveal page.
 */
export const createValuation = createServerFn({ method: 'POST' })
  .inputValidator(createValuationSchema)
  .handler(async ({ data }) => {
    const { description, category } = data

    // 1. Insert initial valuation into D1
    const id = await insertValuation(description, category)

    // 2. Generate AI token analysis (with cache check + fallback)
    const aiResult = await generateTokenAnalysis(description, category)

    // 3. Calculate token conversions deterministically from the price
    const tokenConversions = calculateTokenConversions(aiResult.item_price)

    // 4. Update valuation row with AI results + token conversions + image
    await updateValuationWithAI(id, {
      item_name: aiResult.item_name,
      item_price: aiResult.item_price,
      price_confidence: aiResult.price_confidence,
      tier: aiResult.tier,
      token_conversions: JSON.stringify(tokenConversions),
      what_you_could_do: JSON.stringify(aiResult.what_you_could_do),
      analysis: aiResult.analysis,
      ai_raw_response: JSON.stringify(aiResult),
      image_url: aiResult.image_url,
    })

    return { id }
  })

/**
 * Parse JSON fields from a raw Valuation DB row into a typed ValuationResult.
 */
function parseValuationResult(valuation: Valuation): ValuationResult {
  let parsedTokenConversions = null
  if (valuation.token_conversions) {
    try {
      parsedTokenConversions = JSON.parse(valuation.token_conversions)
    } catch {
      parsedTokenConversions = null
    }
  }

  let parsedWhatYouCouldDo = null
  if (valuation.what_you_could_do) {
    try {
      parsedWhatYouCouldDo = JSON.parse(valuation.what_you_could_do)
    } catch {
      parsedWhatYouCouldDo = null
    }
  }

  return {
    ...valuation,
    token_conversions: parsedTokenConversions,
    what_you_could_do: parsedWhatYouCouldDo,
  }
}

/**
 * Get a single valuation by ID with parsed JSON fields.
 */
export const getValuation = createServerFn({ method: 'GET' })
  .inputValidator(getValuationSchema)
  .handler(async ({ data }): Promise<ValuationResult> => {
    const valuation = await getValuationById(data.id)

    if (!valuation) {
      throw new Error(`Valuation not found: ${data.id}`)
    }

    return parseValuationResult(valuation)
  })

const listValuationsInputSchema = z.object({
  sortBy: z.enum(['price', 'date']).optional().default('date'),
}).optional()

/**
 * List valuations with optional sorting.
 * Used by the leaderboard/ranking screen.
 */
export const listValuations = createServerFn({ method: 'GET' })
  .inputValidator(listValuationsInputSchema)
  .handler(async ({ data }): Promise<ValuationResult[]> => {
    const sortBy = data?.sortBy ?? 'date'
    const valuations = await listValuationsDb(sortBy)

    return valuations.map(parseValuationResult)
  })

/**
 * Get recent valuations for the terminal live feed.
 */
export const getRecentValuations = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ limit: z.number().min(1).max(100).optional().default(20) }).optional())
  .handler(async ({ data }): Promise<ValuationResult[]> => {
    const limit = data?.limit ?? 20
    const valuations = await getRecentValuationsDb(limit)

    return valuations.map(parseValuationResult)
  })
