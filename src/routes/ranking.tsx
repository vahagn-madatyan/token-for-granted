import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { TierCard } from '~/components/screens/ranking/TierCard'
import { TransformationLogic } from '~/components/screens/ranking/TransformationLogic'
import { staggerContainer, fadeInUp } from '~/components/animations/variants'
import { listValuations } from '~/core/functions/valuation.functions'
import type { ValuationResult } from '~/core/types'

export const Route = createFileRoute('/ranking')({
  loader: async () => {
    try {
      const valuations = await listValuations({ data: { sortBy: 'price' } })
      return { valuations }
    } catch {
      // D1 table may not exist yet (first deploy) — return empty
      return { valuations: [] as ValuationResult[] }
    }
  },
  component: Ranking,
})

function Ranking() {
  const { valuations } = Route.useLoaderData()

  // Filter to only items that have been fully processed (have a price)
  const completedValuations = valuations.filter(
    (v: ValuationResult) => v.item_name && v.item_price != null
  )

  return (
    <div className="pt-20 md:pt-32 pb-20 px-4 md:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Title Section */}
      <div className="mb-20 relative">
        {/* Giant watermark */}
        <h2 className="font-headline text-6xl md:text-8xl lg:text-[12rem] font-black uppercase opacity-[0.03] absolute -top-20 -left-10 pointer-events-none select-none tracking-tighter text-primary-container">
          TOKENS
        </h2>

        <div className="relative z-10 border-l-4 border-[#ff4655] pl-8">
          <p className="font-label text-secondary text-sm tracking-[0.5em] mb-3 uppercase">
            AUTHENTICATING // TOKEN_LEADERBOARD
          </p>
          <h1 className="font-headline text-3xl md:text-5xl lg:text-8xl font-extrabold uppercase tracking-tighter leading-none mb-6">
            Token <span className="text-primary-container">Leaderboard</span>
          </h1>
          <p className="font-body text-on-surface-variant max-w-3xl text-xl italic leading-relaxed">
            Every conversion logged. See what people almost bought — and how
            many AI tokens that money could have unlocked instead.
          </p>
        </div>
      </div>

      {/* Ranked Tier Grid */}
      {completedValuations.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center py-20 md:py-32 space-y-8 relative"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 bg-accent/5 rounded-full blur-[120px]" />
          </div>

          {/* Decorative grid lines */}
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 grid grid-cols-4 gap-4 opacity-[0.06]">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-24 bg-primary-container/30 border border-primary-container/10" />
              ))}
            </div>
          </div>

          <div className="font-headline text-4xl md:text-6xl font-black text-outline/15 uppercase tracking-tighter relative z-10">
            EMPTY MATRIX
          </div>
          <p className="font-body text-on-surface-variant text-lg italic max-w-md text-center relative z-10 leading-relaxed">
            No conversions yet — be the first! Head to the{' '}
            <Link to="/" className="text-primary-container font-bold not-italic hover:text-primary transition-colors">
              CONVERT
            </Link>{' '}
            page and see what your next purchase is really worth in AI tokens.
          </p>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-8 h-[1px] bg-accent/20" />
            <div className="w-2 h-2 bg-accent/30 rotate-45" />
            <div className="w-8 h-[1px] bg-accent/20" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {completedValuations.map((valuation: ValuationResult) => (
            <motion.div key={valuation.id} variants={fadeInUp}>
              <TierCard valuation={valuation} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Transformation Logic Section */}
      <TransformationLogic totalConversions={completedValuations.length} />
    </div>
  )
}
