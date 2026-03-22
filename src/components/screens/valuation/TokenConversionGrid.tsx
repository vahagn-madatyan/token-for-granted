import { HexCard } from '~/components/ui/HexCard'
import type { TokenConversion } from '~/core/types'
import { formatTokenCount, getBestValueProvider } from '~/core/token-pricing'

interface TokenConversionGridProps {
  conversions: TokenConversion[]
}

export function TokenConversionGrid({ conversions }: TokenConversionGridProps) {
  const bestProvider = getBestValueProvider(conversions)

  return (
    <section className="space-y-8">
      {/* Section header */}
      <div className="flex items-center gap-4">
        <h2 className="font-headline text-xs font-bold tracking-[0.4em] uppercase text-outline">
          Token Conversion Grid // ALL_PROVIDERS
        </h2>
        <div className="h-[1px] bg-secondary/20 flex-1" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {conversions.map((conversion) => {
          const isBest =
            conversion.provider === bestProvider.provider &&
            conversion.model === bestProvider.model

          return (
            <HexCard
              key={`${conversion.provider}-${conversion.model}`}
              elevation={isBest ? 'highest' : 'low'}
              clip="tr"
              glow={isBest ? 'cyan' : 'none'}
              borderAccent={isBest ? 'secondary' : 'primary'}
              className="relative group"
            >
              {/* Best value badge */}
              {isBest && (
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-secondary/20 border border-secondary/40 font-label text-[9px] text-secondary uppercase tracking-widest">
                  BEST VALUE
                </div>
              )}

              {/* Provider name */}
              <div className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">
                {conversion.provider}
              </div>

              {/* Model name */}
              <div className="font-headline font-bold text-sm text-accent uppercase mb-4">
                {conversion.model}
              </div>

              {/* Token count - the big number */}
              <div className="text-3xl font-headline font-black text-secondary mb-1">
                {formatTokenCount(conversion.tokens_you_get_input)}
              </div>
              <div className="font-label text-[10px] text-outline uppercase tracking-widest mb-3">
                INPUT TOKENS
              </div>

              {/* Price per million */}
              <div className="flex justify-between items-center pt-3 border-t border-outline-variant/20">
                <span className="font-label text-[10px] text-outline uppercase">
                  $/M Input
                </span>
                <span className="font-headline font-bold text-xs text-on-surface-variant">
                  ${conversion.price_per_million_input.toFixed(2)}
                </span>
              </div>
            </HexCard>
          )
        })}
      </div>
    </section>
  )
}
