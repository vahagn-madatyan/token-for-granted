import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { getValuation } from '~/core/functions/valuation.functions'
import { fadeInUp, staggerContainer } from '~/components/animations/variants'
import { AssetCard } from '~/components/screens/valuation/AssetCard'
import { WhatIfPotential } from '~/components/screens/valuation/WhatIfPotential'
import { AIEngineMetrics } from '~/components/screens/valuation/AIEngineMetrics'
import { MultiplierEffect } from '~/components/screens/valuation/MultiplierEffect'

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
          DECRYPTING...
        </div>
        <div className="font-label text-xs text-outline uppercase tracking-widest">
          CONTAINMENT UNIT LOADING
        </div>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <div className="text-error text-4xl font-headline font-black">
          ASSET NOT FOUND
        </div>
        <div className="font-label text-xs text-outline uppercase tracking-widest">
          CONTAINMENT BREACH // INVALID_ASSET_ID
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
    'Transmutation confirmed. Raw digital compute has been solidified into physical rarity.'

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-16">
      {/* SECTION 1: ASSET CONTAINMENT (THE BIG REVEAL) */}
      <motion.section
        className="grid lg:grid-cols-2 gap-12 items-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Left column */}
        <motion.div className="space-y-8" variants={fadeInUp}>
          {/* Breadcrumb trail */}
          <div>
            <div className="font-label text-[10px] text-outline/40 uppercase tracking-widest mb-2">
              PROTOCOL_TRACE {'>'} SECTOR_01 {'>'} CONTAINMENT_UNIT
            </div>
            <div className="inline-block px-3 py-1 bg-secondary/10 border-l-2 border-secondary text-secondary font-headline text-[10px] tracking-widest uppercase">
              Protocol Priority: Delta-01 // CONTAINMENT_VIEW
            </div>
          </div>

          {/* Title with glitch hover effect */}
          <div className="text-glitch-hover group cursor-default relative inline-block">
            <h1 className="text-6xl md:text-8xl font-headline font-black text-accent leading-tight uppercase tracking-tighter">
              ASSET <span className="text-secondary">CONTAINMENT</span> UNIT.
            </h1>
          </div>

          {/* Analysis text */}
          <p className="text-lg md:text-xl text-on-surface/70 max-w-xl leading-relaxed italic font-body">
            &ldquo;{analysisText}&rdquo;
          </p>

          {/* Value cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Current Base Value */}
            <div className="p-6 bg-surface-container-low border border-secondary/20 relative group overflow-hidden">
              <div className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">
                Current Base Value
              </div>
              <div className="text-4xl font-headline font-bold text-secondary">
                $
                {(valuation.current_value ?? 0).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </div>
              <div className="absolute -right-2 -bottom-2 text-4xl font-black text-secondary/5">
                USD
              </div>
            </div>

            {/* Growth Matrix */}
            <div className="p-6 bg-surface-container-low border border-accent/20 relative group overflow-hidden">
              <div className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">
                Growth Matrix
              </div>
              <div className="text-4xl font-headline font-bold text-accent">
                +{(valuation.growth_rate ?? 0).toFixed(1)}%
              </div>
              <div className="absolute -right-2 -bottom-2 text-4xl font-black text-accent/5">
                ROI
              </div>
            </div>
          </div>

          {/* What If Potential */}
          <WhatIfPotential
            projectedValue={valuation.projected_value ?? 0}
            confidence={valuation.confidence ?? 75}
            analysis={
              valuation.analysis ||
              'Simulation suggests significant potential for value appreciation across multiple market vectors.'
            }
          />
        </motion.div>

        {/* Right column */}
        <motion.div variants={fadeInUp}>
          <AssetCard
            imageSrc={valuation.category_image}
            assetName={valuation.asset_name || 'UNKNOWN'}
            artEdition={valuation.art_edition || 'GEN_01'}
            assetCode={valuation.asset_code || 'UNK-00-000'}
            authStatus={valuation.auth_status}
          />
        </motion.div>
      </motion.section>

      {/* SECTION 2: AI ENGINE METRICS */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <AIEngineMetrics confidence={valuation.confidence ?? 75} />
      </motion.div>

      {/* SECTION 3: MULTIPLIER EFFECT */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <MultiplierEffect categories={valuation.multiplier_categories} />
      </motion.div>
    </div>
  )
}
