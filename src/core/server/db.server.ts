import { env } from 'cloudflare:workers'
import type { Valuation } from '~/core/types'

/**
 * Insert a new valuation record with description and category.
 * Returns the generated UUID.
 */
export async function insertValuation(
  description: string,
  category: string
): Promise<string> {
  const id = crypto.randomUUID()
  await env.DB.prepare(
    `INSERT INTO valuations (id, description, category, auth_status) VALUES (?, ?, ?, 'PENDING')`
  )
    .bind(id, description, category)
    .run()
  return id
}

/**
 * Fetch a single valuation by ID. Returns null if not found.
 */
export async function getValuationById(
  id: string
): Promise<Valuation | null> {
  const result = await env.DB.prepare(
    `SELECT * FROM valuations WHERE id = ?`
  )
    .bind(id)
    .first<Valuation>()
  return result ?? null
}

/**
 * Update a valuation row with token analysis results.
 * Sets auth_status to 'VERIFIED' and updates updated_at.
 */
export async function updateValuationWithAI(
  id: string,
  aiData: {
    item_name: string
    item_price: number
    price_confidence: number
    tier: string
    token_conversions: string
    what_you_could_do: string
    analysis: string
    ai_raw_response: string
    image_url: string | null
  }
): Promise<void> {
  await env.DB.prepare(
    `UPDATE valuations SET
      item_name = ?,
      item_price = ?,
      price_confidence = ?,
      tier = ?,
      token_conversions = ?,
      what_you_could_do = ?,
      analysis = ?,
      ai_raw_response = ?,
      image_url = ?,
      auth_status = 'VERIFIED',
      updated_at = datetime('now')
    WHERE id = ?`
  )
    .bind(
      aiData.item_name,
      aiData.item_price,
      aiData.price_confidence,
      aiData.tier,
      aiData.token_conversions,
      aiData.what_you_could_do,
      aiData.analysis,
      aiData.ai_raw_response,
      aiData.image_url,
      id
    )
    .run()
}

/**
 * List valuations with optional sorting.
 * sortBy: 'price' = ORDER BY item_price DESC, 'date' (default) = ORDER BY created_at DESC
 */
export async function listValuations(
  sortBy: 'price' | 'date' = 'date',
  limit: number = 50
): Promise<Valuation[]> {
  const orderClause = sortBy === 'price'
    ? 'ORDER BY item_price DESC NULLS LAST'
    : 'ORDER BY created_at DESC'

  const result = await env.DB.prepare(
    `SELECT * FROM valuations WHERE auth_status = 'VERIFIED' ${orderClause} LIMIT ?`
  )
    .bind(limit)
    .all<Valuation>()
  return result.results
}

/**
 * Get recent valuations for the terminal live feed.
 * Returns the most recent verified valuations.
 */
export async function getRecentValuations(
  limit: number = 20
): Promise<Valuation[]> {
  const result = await env.DB.prepare(
    `SELECT * FROM valuations WHERE auth_status = 'VERIFIED' ORDER BY created_at DESC LIMIT ?`
  )
    .bind(limit)
    .all<Valuation>()
  return result.results
}
