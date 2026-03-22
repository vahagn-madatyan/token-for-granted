import { cn } from '~/lib/cn'
import type { ValuationResult } from '~/core/types'
import { formatTokenCount, getBestValueProvider } from '~/core/token-pricing'

interface TierCardProps {
  valuation: ValuationResult
}

const tierColors = {
  S: {
    text: 'text-[#f0bf5c]',
    border: 'border-[#f0bf5c]',
    borderFaded: 'border-[#f0bf5c]/40',
    borderAccent: 'border-[#f0bf5c]/20',
    bg: 'bg-[#f0bf5c]',
    bgFaded: 'bg-[#f0bf5c]/10',
    bgBorderFaded: 'border-[#f0bf5c]/20',
    glow: 'bg-[#f0bf5c]',
    glowIdle: 'opacity-20',
    glowHover: 'group-hover:opacity-60',
    rankGlow: 'shadow-[0_0_20px_rgba(240,191,92,0.1)]',
    lineAccent: 'bg-[#f0bf5c]/30',
  },
  A: {
    text: 'text-[#ff4655]',
    border: 'border-[#ff4655]',
    borderFaded: 'border-[#ff4655]/40',
    borderAccent: 'border-[#ff4655]/20',
    bg: 'bg-[#ff4655]',
    bgFaded: 'bg-[#ff4655]/10',
    bgBorderFaded: 'border-[#ff4655]/20',
    glow: 'bg-[#ff4655]',
    glowIdle: 'opacity-10',
    glowHover: 'group-hover:opacity-40',
    rankGlow: 'shadow-[0_0_20px_rgba(255,70,85,0.1)]',
    lineAccent: 'bg-[#ff4655]/30',
  },
  B: {
    text: 'text-[#00f5ff]',
    border: 'border-[#00f5ff]',
    borderFaded: 'border-[#00f5ff]/40',
    borderAccent: 'border-[#00f5ff]/20',
    bg: 'bg-[#00f5ff]',
    bgFaded: 'bg-[#00f5ff]/10',
    bgBorderFaded: 'border-[#00f5ff]/20',
    glow: 'bg-[#00f5ff]',
    glowIdle: 'opacity-10',
    glowHover: 'group-hover:opacity-40',
    rankGlow: 'shadow-[0_0_20px_rgba(0,245,255,0.1)]',
    lineAccent: 'bg-[#00f5ff]/30',
  },
  C: {
    text: 'text-outline',
    border: 'border-outline/50',
    borderFaded: 'border-outline/30',
    borderAccent: 'border-outline/20',
    bg: 'bg-outline/20',
    bgFaded: 'bg-outline/5',
    bgBorderFaded: 'border-outline/10',
    glow: 'bg-outline/20',
    glowIdle: 'opacity-5',
    glowHover: 'group-hover:opacity-30',
    rankGlow: '',
    lineAccent: 'bg-outline/10',
  },
}

export function TierCard({ valuation }: TierCardProps) {
  const tier = valuation.tier ?? 'C'
  const colors = tierColors[tier]

  const itemName = valuation.item_name ?? 'Unknown Item'
  const itemPrice = valuation.item_price ?? 0
  const priceConfidence = valuation.price_confidence ?? 0

  // Get the top action from what_you_could_do
  const topAction =
    valuation.what_you_could_do && valuation.what_you_could_do.length > 0
      ? valuation.what_you_could_do[0].action
      : 'Convert to AI tokens'

  // Get best token value
  let bestTokenStr = ''
  if (valuation.token_conversions && valuation.token_conversions.length > 0) {
    const bestValue = getBestValueProvider(valuation.token_conversions)
    bestTokenStr = formatTokenCount(bestValue.tokens_you_get_input) + ' tokens'
  }

  // Tier label mapping
  const tierLabels: Record<string, string> = {
    S: 'HIGH_VALUE',
    A: 'PREMIUM',
    B: 'STANDARD',
    C: 'ENTRY_LEVEL',
  }

  return (
    <div className="relative group">
      {/* Glow behind card */}
      <div
        className={cn(
          'absolute -inset-0.5 blur transition duration-700',
          colors.glow,
          colors.glowIdle,
          colors.glowHover
        )}
      />

      {/* Card body */}
      <div
        className={cn(
          'relative bg-[#121c27] border-2 h-full p-8 clipped-both flex flex-col transition-all duration-500 group-hover:-translate-y-2',
          colors.borderFaded,
          colors.rankGlow
        )}
      >
        {/* Top row: Tier letter + label */}
        <div className="flex justify-between items-start mb-6">
          <div
            className={cn(
              'w-14 h-14 flex items-center justify-center border-4 font-headline text-4xl font-black italic',
              colors.border,
              colors.text
            )}
          >
            {tier}
          </div>
          <div className="text-right">
            <span
              className={cn(
                'font-label text-[10px] tracking-[0.2em] px-3 py-1 border block mb-1',
                colors.text,
                colors.bgFaded,
                colors.bgBorderFaded
              )}
            >
              {tierLabels[tier] ?? 'UNKNOWN'}
            </span>
            <span className="text-[9px] font-label text-outline/50 uppercase">
              {valuation.category}
            </span>
          </div>
        </div>

        {/* Price display */}
        <div className="mb-4">
          <div className={cn('text-4xl font-headline font-black', colors.text)}>
            ${itemPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          {bestTokenStr && (
            <div className="font-label text-xs text-primary-container/60 mt-1">
              = {bestTokenStr}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-headline text-2xl font-black mb-3 uppercase tracking-tighter cursor-default text-on-surface">
          {itemName}
        </h3>

        {/* Top action as subtitle */}
        <p className="font-body text-on-surface-variant text-sm mb-6 flex-grow leading-snug italic">
          Instead: {topAction}
        </p>

        {/* Bottom: Confidence score as progress */}
        <div className={cn('flex flex-col gap-2 border-t pt-4', colors.borderAccent)}>
          <div className="flex justify-between items-center">
            <div className="text-[10px] font-label uppercase text-outline tracking-widest">
              Price Confidence
            </div>
            <div className={cn('text-sm font-headline font-bold', colors.text)}>
              {Math.round(priceConfidence)}%
            </div>
          </div>
          <div className="h-1 bg-outline-variant/20 overflow-hidden">
            <div
              className={cn('h-full transition-all duration-700', colors.bg)}
              style={{ width: `${priceConfidence}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
