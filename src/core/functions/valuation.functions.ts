import { createServerFn } from '@tanstack/react-start'
import { createValuationSchema, getValuationSchema } from '~/core/schemas'
import type { ValuationResult } from '~/core/types'
import {
  insertValuation,
  getValuationById,
  updateValuationWithAI,
  listValuations as listValuationsDb,
} from '~/core/server/db.server'
import { generateValuation as generateAIValuation } from '~/core/server/ai.server'

/**
 * Create a new valuation: store in D1, generate AI analysis, update with results.
 * Returns { id } for redirect to the reveal page.
 */
export const createValuation = createServerFn({ method: 'POST' })
  .inputValidator(createValuationSchema)
  .handler(async ({ data }) => {
    const { description, category } = data

    // 1. Insert initial valuation into D1
    const id = await insertValuation(description, category)

    // 2. Generate AI valuation (with cache check + fallback)
    const aiResult = await generateAIValuation(description, category)

    // 3. Update valuation row with AI results
    await updateValuationWithAI(id, {
      current_value: aiResult.current_value,
      projected_value: aiResult.projected_value,
      confidence: aiResult.confidence,
      growth_rate: aiResult.growth_rate,
      tier: aiResult.tier,
      density_score: aiResult.density_score,
      asset_code: aiResult.asset_code,
      asset_name: aiResult.asset_name,
      art_edition: aiResult.art_edition,
      analysis: aiResult.analysis,
      multiplier_categories: JSON.stringify(aiResult.multiplier_categories),
      ai_raw_response: JSON.stringify(aiResult),
    })

    return { id }
  })

/**
 * Get a single valuation by ID with parsed multiplier_categories.
 * Returns a ValuationResult with category_image path.
 */
export const getValuation = createServerFn({ method: 'GET' })
  .inputValidator(getValuationSchema)
  .handler(async ({ data }): Promise<ValuationResult> => {
    const valuation = await getValuationById(data.id)

    if (!valuation) {
      throw new Error(`Valuation not found: ${data.id}`)
    }

    // Parse multiplier_categories from JSON string
    let parsedCategories = null
    if (valuation.multiplier_categories) {
      try {
        parsedCategories = JSON.parse(valuation.multiplier_categories)
      } catch {
        parsedCategories = null
      }
    }

    return {
      ...valuation,
      multiplier_categories: parsedCategories,
      category_image: `/images/${valuation.category}.svg`,
    }
  })

/**
 * List all valuations ordered by created_at DESC, limited to 50.
 * Used by the ranking screen.
 */
export const listValuations = createServerFn({ method: 'GET' })
  .handler(async (): Promise<ValuationResult[]> => {
    const valuations = await listValuationsDb()

    return valuations.map((v) => {
      let parsedCategories = null
      if (v.multiplier_categories) {
        try {
          parsedCategories = JSON.parse(v.multiplier_categories)
        } catch {
          parsedCategories = null
        }
      }

      return {
        ...v,
        multiplier_categories: parsedCategories,
        category_image: `/images/${v.category}.svg`,
      }
    })
  })
