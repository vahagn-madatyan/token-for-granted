export type AssetCategory = 'electronics' | 'collectibles' | 'fashion' | 'entertainment' | 'food' | 'other'
export type Tier = 'S' | 'A' | 'B' | 'C'

export interface TokenConversion {
  provider: string
  model: string
  price_per_million_input: number
  price_per_million_output: number
  tokens_you_get_input: number
  tokens_you_get_output: number
}

export interface WhatYouCouldDo {
  action: string
  description: string
  icon_hint: string
}

export interface AITokenAnalysisResponse {
  item_name: string
  item_price: number
  price_confidence: number
  tier: Tier
  what_you_could_do: WhatYouCouldDo[]
  analysis: string
}

export interface TokenAnalysisResult extends AITokenAnalysisResponse {
  token_conversions: TokenConversion[]
}

export interface Valuation {
  id: string
  description: string
  category: AssetCategory
  item_name: string | null
  item_price: number | null
  price_confidence: number | null
  tier: Tier | null
  token_conversions: string | null // JSON string in DB
  what_you_could_do: string | null // JSON string in DB
  analysis: string | null
  ai_raw_response: string | null
  created_at: string
  updated_at: string
}

export interface ValuationResult extends Omit<Valuation, 'token_conversions' | 'what_you_could_do'> {
  token_conversions: TokenConversion[] | null
  what_you_could_do: WhatYouCouldDo[] | null
}
