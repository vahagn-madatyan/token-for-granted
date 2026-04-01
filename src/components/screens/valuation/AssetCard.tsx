import type { AssetCategory, Tier } from '~/core/types'
import { TierBadge } from '~/components/ui/TierBadge'

interface AssetCardProps {
  itemName: string
  category: AssetCategory
  tier: Tier | null
  imageUrl?: string | null
}

const CATEGORY_ICONS: Record<AssetCategory, string> = {
  electronics: '\u{1F4F1}',
  collectibles: '\u{1F3B4}',
  fashion: '\u{1F45F}',
  entertainment: '\u{1F3AE}',
  food: '\u{1F355}',
  other: '\u{1F4E6}',
}

export function AssetCard({ itemName, category, tier, imageUrl }: AssetCardProps) {
  return (
    <div className="relative group">
      <div className="relative z-10 p-8 bg-surface-container-low clipped-tr border border-secondary/30 shadow-[0_0_50px_rgba(0,245,255,0.1)] backdrop-blur-md overflow-hidden">
        {/* Moving scanline */}
        <div
          className="absolute top-0 left-0 w-full h-[10px] bg-gradient-to-b from-transparent via-primary-container/30 to-transparent pointer-events-none z-20"
          style={{ animation: 'scanline 8s linear infinite' }}
        />

        {/* Product image or category icon fallback */}
        <div className="flex items-center justify-center aspect-square bg-surface-container-lowest border border-white/5 overflow-hidden relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={itemName}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-[120px] md:text-[160px] opacity-80 select-none">
              {CATEGORY_ICONS[category] || CATEGORY_ICONS.other}
            </span>
          )}
          {/* Corner scan markers */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-primary-container/30" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary-container/30" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-primary-container/30" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-primary-container/30" />
        </div>

        {/* Metadata below */}
        <div className="mt-8 flex justify-between items-end">
          <div>
            <h3 className="font-headline text-2xl md:text-3xl font-black text-accent tracking-tighter uppercase">
              {itemName}
            </h3>
            <div className="font-label text-xs text-secondary tracking-[0.2em] uppercase">
              {category}
            </div>
          </div>
          {tier && (
            <div className="text-right">
              <div className="font-label text-[10px] text-outline uppercase mb-2">
                Tier
              </div>
              <TierBadge tier={tier} size="lg" />
            </div>
          )}
        </div>
      </div>

      {/* Background decoration - offset border frame */}
      <div className="absolute -top-4 -left-4 w-full h-full border-2 border-secondary/10 -z-10 clipped-tr" />
    </div>
  )
}
