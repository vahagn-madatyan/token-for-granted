export type AssetCategory = 'collectible' | 'art' | 'tech' | 'luxury' | 'other'
export type Tier = 'S' | 'A' | 'B' | 'C'

export interface AIValuationResponse {
  current_value: number
  projected_value: number
  confidence: number
  growth_rate: number
  tier: Tier
  density_score: number
  analysis: string
  multiplier_categories: {
    name: string
    relevance: number
    description: string
  }[]
  asset_name: string
  asset_code: string
  art_edition: string
}

export interface Valuation {
  id: string
  description: string
  category: AssetCategory
  current_value: number | null
  projected_value: number | null
  confidence: number | null
  growth_rate: number | null
  tier: Tier | null
  density_score: number | null
  auth_status: string
  asset_code: string | null
  asset_name: string | null
  art_edition: string | null
  analysis: string | null
  multiplier_categories: string | null // JSON string in DB
  ai_raw_response: string | null
  created_at: string
  updated_at: string
}

export interface ValuationResult extends Omit<Valuation, 'multiplier_categories'> {
  multiplier_categories: AIValuationResponse['multiplier_categories'] | null
  category_image: string
}
