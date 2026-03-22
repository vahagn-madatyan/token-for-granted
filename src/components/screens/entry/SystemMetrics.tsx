import { motion } from 'motion/react'
import { MetricDisplay } from '~/components/ui/MetricDisplay'
import { HexCard } from '~/components/ui/HexCard'
import { useCountUp } from '~/components/animations/useCountUp'
import { staggerContainer, fadeInUp } from '~/components/animations/variants'

/**
 * Left sidebar system metrics: Compute Power + Token Liquidity.
 * All values hardcoded per design spec.
 */
export function SystemMetrics() {
  const liquidityValue = useCountUp(1.4, 2000)

  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Compute Power - uses MetricDisplay (single progress bar) */}
      <motion.div variants={fadeInUp}>
        <MetricDisplay
          label="Compute Power"
          value={84.2}
          decimals={1}
          suffix="T-FLOPS"
          barValue={84}
        />
      </motion.div>

      {/* Token Liquidity - custom layout with segmented bars */}
      <motion.div variants={fadeInUp}>
        <HexCard elevation="low" clip="tr" borderAccent="secondary">
          <div className="font-label text-[10px] text-outline mb-1 uppercase tracking-widest">
            Token Liquidity
          </div>
          <div className="text-3xl font-headline font-black text-secondary">
            {liquidityValue.toFixed(1)}M{' '}
            <span className="text-sm font-normal text-on-surface/40">ARC</span>
          </div>
          <div className="mt-4 flex gap-1 h-3">
            <div className="flex-1 bg-secondary/40" />
            <div className="flex-1 bg-secondary/60" />
            <div className="flex-1 bg-secondary" />
            <div className="flex-1 bg-secondary/20" />
          </div>
        </HexCard>
      </motion.div>
    </motion.div>
  )
}
