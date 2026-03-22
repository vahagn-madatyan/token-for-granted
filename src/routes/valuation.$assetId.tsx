import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { getValuation } from '~/core/functions/valuation.functions'
import { formatTokenCount, getBestValueProvider } from '~/core/token-pricing'
import { fadeInUp, staggerContainer } from '~/components/animations/variants'
import { AssetCard } from '~/components/screens/valuation/AssetCard'
import { TokenConversionGrid } from '~/components/screens/valuation/TokenConversionGrid'
import { WhatYouCouldDo } from '~/components/screens/valuation/WhatYouCouldDo'

export const Route = createFileRoute('/valuation/$assetId')({
  loader: async ({ params }) => {
    const valuation = await getValuation({ data: { id: params.assetId } })
    if (!valuation) throw new Error('Valuation not found')
    return valuation
  },
  pendingComponent: () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <div className="text-primary-container animate-pulse text-4xl font-headline font-black">
          CONVERTING...
        </div>
        <div className="font-label text-xs text-outline uppercase tracking-widest">
          CALCULATING TOKEN POTENTIAL
        </div>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <div className="text-error text-4xl font-headline font-black">
          ANALYSIS NOT FOUND
        </div>
        <div className="font-label text-xs text-outline uppercase tracking-widest">
          CONVERSION FAILED // INVALID_ID
        </div>
        <p className="text-on-surface/40 text-sm font-body mt-4">
          {error.message}
        </p>
      </div>
    </div>
  ),
  component: ValuationReveal,
})

function ValuationReveal() {
  const valuation = Route.useLoaderData()

  const analysisText =
    valuation.analysis ||
    'Price estimated. Token conversion complete. See what your money could really do.'

  const itemPrice = valuation.item_price ?? 0
  const tokenConversions = valuation.token_conversions ?? []
  const whatYouCouldDo = valuation.what_you_could_do ?? []
  const bestProvider =
    tokenConversions.length > 0 ? getBestValueProvider(tokenConversions) : null

  // Store last search in sessionStorage for What If Lab context
  useEffect(() => {
    if (typeof window !== 'undefined' && valuation.item_name && itemPrice > 0) {
      sessionStorage.setItem(
        'lastSearch',
        JSON.stringify({ itemName: valuation.item_name, itemPrice })
      )
    }
  }, [valuation.item_name, itemPrice])

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10 space-y-10 md:space-y-16">
      {/* SECTION 1: PRICE REVEAL */}
      <motion.section
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Left column */}
        <motion.div className="space-y-8" variants={fadeInUp}>
          {/* Breadcrumb trail */}
          <div>
            <div className="font-label text-[10px] text-outline/40 uppercase tracking-widest mb-2">
              TOKEN_TRACE {'>'} ANALYSIS {'>'} CONVERSION_UNIT
            </div>
            <div className="inline-block px-3 py-1 bg-secondary/10 border-l-2 border-secondary text-secondary font-headline text-[10px] tracking-widest uppercase">
              Analysis Complete // CONVERSION_VIEW
            </div>
          </div>

          {/* Title with glitch hover effect */}
          <div className="text-glitch-hover group cursor-default relative inline-block">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-headline font-black text-accent leading-tight uppercase tracking-tighter">
              PURCHASE <span className="text-secondary">ANALYSIS</span>.
            </h1>
          </div>

          {/* Analysis text */}
          <p className="text-lg md:text-xl text-on-surface/70 max-w-xl leading-relaxed italic font-body">
            &ldquo;{analysisText}&rdquo;
          </p>

          {/* Value cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Item Price */}
            <div className="p-6 bg-surface-container-low border border-secondary/20 relative group overflow-hidden">
              <div className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">
                ITEM PRICE
              </div>
              <div className="text-4xl font-headline font-bold text-secondary">
                $
                {itemPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </div>
              <div className="absolute -right-2 -bottom-2 text-4xl font-black text-secondary/5">
                USD
              </div>
            </div>

            {/* Best Token Value */}
            <div className="p-6 bg-surface-container-low border border-accent/20 relative group overflow-hidden">
              <div className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">
                BEST TOKEN VALUE
              </div>
              <div className="text-4xl font-headline font-bold text-accent">
                {bestProvider
                  ? formatTokenCount(bestProvider.tokens_you_get_input)
                  : '---'}
              </div>
              <div className="absolute -right-2 -bottom-2 text-4xl font-black text-accent/5">
                TKN
              </div>
            </div>
          </div>

          {/* Token summary line */}
          {bestProvider && (
            <div className="p-6 bg-surface-container-highest border-l-4 border-secondary shadow-[0_0_30px_rgba(0,245,255,0.05)] relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-secondary text-lg">&#x26A1;</span>
                <span className="font-headline font-bold text-xs tracking-widest text-secondary uppercase">
                  TOKEN POTENTIAL
                </span>
              </div>
              <p className="text-lg text-on-surface/80 font-body">
                This buys you{' '}
                <span className="font-headline font-black text-secondary">
                  {formatTokenCount(bestProvider.tokens_you_get_input)}
                </span>{' '}
                tokens on{' '}
                <span className="font-headline font-bold text-accent">
                  {bestProvider.provider} {bestProvider.model}
                </span>
              </p>
              <p className="text-xs text-on-surface/40 font-body mt-2">
                Based on ${bestProvider.price_per_million_input.toFixed(2)}/M
                input tokens
              </p>
            </div>
          )}
        </motion.div>

        {/* Right column */}
        <motion.div variants={fadeInUp}>
          <AssetCard
            itemName={valuation.item_name || valuation.description}
            category={valuation.category}
            tier={valuation.tier}
          />
        </motion.div>
      </motion.section>

      {/* SECTION 2: TOKEN CONVERSION GRID */}
      {tokenConversions.length > 0 && (
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <TokenConversionGrid conversions={tokenConversions} />
        </motion.div>
      )}

      {/* SECTION 3: WHAT YOU COULD DO INSTEAD */}
      {whatYouCouldDo.length > 0 && (
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <WhatYouCouldDo items={whatYouCouldDo} />
        </motion.div>
      )}
    </div>
  )
}
