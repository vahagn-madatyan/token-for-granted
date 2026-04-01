import { env } from 'cloudflare:workers'
import type { AssetCategory } from '~/core/types'

const CATEGORY_CONTEXT: Record<AssetCategory, string> = {
  electronics: 'consumer electronics device, sleek modern tech product',
  collectibles: 'rare collectible item, trading card or figurine, pristine condition',
  fashion: 'luxury fashion item, high-end designer piece, editorial style',
  entertainment: 'entertainment product, vibrant colors, exciting visual',
  food: 'gourmet food item, appetizing presentation, food photography',
  other: 'product item, clean studio shot, professional photograph',
}

/**
 * Generate a product image using Workers AI Flux-1-Schnell.
 * Returns a base64 data URL string, or null if generation fails.
 */
export async function generateProductImage(
  itemName: string,
  category: AssetCategory
): Promise<string | null> {
  try {
    const context = CATEGORY_CONTEXT[category] || CATEGORY_CONTEXT.other
    const prompt = `Professional product photograph of ${itemName}, ${context}, studio lighting, dark navy background, high detail, centered composition, no text, no watermark`

    const result = await env.AI.run('@cf/black-forest-labs/flux-1-schnell', {
      prompt,
      steps: 4,
    })

    if (!result.image) return null

    return `data:image/png;base64,${result.image}`
  } catch (e) {
    console.error(JSON.stringify({
      msg: 'Product image generation failed',
      error: e instanceof Error ? e.message : 'Unknown error',
    }))
    return null
  }
}
