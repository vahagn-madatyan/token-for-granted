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
 * Update a valuation row with AI response data.
 * Sets auth_status to 'VERIFIED' and updates updated_at.
 */
export async function updateValuationWithAI(
  id: string,
  aiData: {
    current_value: number
    projected_value: number
    confidence: number
    growth_rate: number
    tier: string
    density_score: number
    asset_code: string
    asset_name: string
    art_edition: string
    analysis: string
    multiplier_categories: string
    ai_raw_response: string
  }
): Promise<void> {
  await env.DB.prepare(
    `UPDATE valuations SET
      current_value = ?,
      projected_value = ?,
      confidence = ?,
      growth_rate = ?,
      tier = ?,
      density_score = ?,
      asset_code = ?,
      asset_name = ?,
      art_edition = ?,
      analysis = ?,
      multiplier_categories = ?,
      ai_raw_response = ?,
      auth_status = 'VERIFIED',
      updated_at = datetime('now')
    WHERE id = ?`
  )
    .bind(
      aiData.current_value,
      aiData.projected_value,
      aiData.confidence,
      aiData.growth_rate,
      aiData.tier,
      aiData.density_score,
      aiData.asset_code,
      aiData.asset_name,
      aiData.art_edition,
      aiData.analysis,
      aiData.multiplier_categories,
      aiData.ai_raw_response,
      id
    )
    .run()
}

/**
 * List all valuations ordered by created_at DESC, limited to 50.
 */
export async function listValuations(): Promise<Valuation[]> {
  const result = await env.DB.prepare(
    `SELECT * FROM valuations ORDER BY created_at DESC LIMIT 50`
  ).all<Valuation>()
  return result.results
}
