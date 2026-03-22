import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import { createValuation } from '~/core/functions/valuation.functions'
import type { AssetCategory } from '~/core/types'
import { TokenInput } from '~/components/ui/TokenInput'
import { NeonButton } from '~/components/ui/NeonButton'
import { HexCard } from '~/components/ui/HexCard'
import { SystemMetrics } from '~/components/screens/entry/SystemMetrics'
import { AIPulse } from '~/components/screens/entry/AIPulse'
import { SystemAssets } from '~/components/screens/entry/SystemAssets'
import { CategorySelect } from '~/components/screens/entry/CategorySelect'
import {
  staggerContainer,
  fadeInUp,
  pulseGlow,
} from '~/components/animations/variants'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<AssetCategory>('other')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit() {
    if (!description.trim() || isSubmitting) return
    setIsSubmitting(true)
    try {
      const result = await createValuation({ data: { description, category } })
      // Store last search for What If Lab context
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('lastSearch', JSON.stringify({ itemName: description, itemPrice: 0 }))
      }
      navigate({ to: '/valuation/$assetId', params: { assetId: result.id } })
    } catch (error) {
      console.error('Valuation failed:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <motion.div
        className="container mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col lg:flex-row gap-8 md:gap-12 items-center justify-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Left column: System Metrics */}
        <motion.div
          className="w-full lg:w-1/4 order-2 lg:order-1"
          variants={fadeInUp}
        >
          <SystemMetrics />
        </motion.div>

        {/* Center column: Hero */}
        <motion.div
          className="w-full lg:w-2/4 flex flex-col items-center order-1 lg:order-2"
          variants={fadeInUp}
        >
          {/* Title block */}
          <div className="text-center mb-8">
            <h1 className="font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-2 text-on-surface text-glitch-hover cursor-default">
              TOKEN{' '}
              <span className="text-primary-container">CONVERSION</span>{' '}
              PROTOCOL
            </h1>
            <p className="font-body italic text-lg text-outline max-w-md mx-auto">
              Every dollar spent is AI tokens lost. Find out what you're
              really giving up.
            </p>
          </div>

          {/* Input group */}
          <div className="w-full relative group">
            {/* Ambient glow behind input */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-container/5 via-accent/5 to-primary-container/5 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />

            <TokenInput
              label="SUBJECT_IDENTIFIER"
              icon={
                <span className="animate-pulse text-xl">&#x25C6;</span>
              }
              placeholder="What do you want to buy?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit()
              }}
            />
          </div>

          {/* Category selector */}
          <div className="mt-4 w-full">
            <CategorySelect value={category} onChange={setCategory} />
          </div>

          {/* Submit button */}
          <div className="mt-8 flex justify-center">
            <NeonButton
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'PROCESSING...' : 'CONVERT TO TOKENS'}
              <span className="text-2xl">&#x26A1;</span>
            </NeonButton>
          </div>
        </motion.div>

        {/* Right column: AI Pulse + System Assets */}
        <motion.div
          className="w-full lg:w-1/4 flex flex-col gap-6 order-3"
          variants={fadeInUp}
        >
          <AIPulse />
          <SystemAssets />
        </motion.div>
      </motion.div>

      {/* Loading overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-surface/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div animate={pulseGlow.animate}>
              <HexCard elevation="medium" glow="cyan" className="text-center space-y-3">
                <div className="font-label text-xs text-primary-container animate-pulse uppercase tracking-widest">
                  PROCESSING...
                </div>
                <div className="font-label text-[10px] text-outline uppercase tracking-widest">
                  CALCULATING TOKEN POTENTIAL...
                </div>
              </HexCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background watermark */}
      <div className="fixed bottom-0 left-0 p-12 pointer-events-none select-none z-0">
        <h2 className="font-headline font-black text-[12vw] leading-none text-on-surface/[0.05] uppercase tracking-tighter mix-blend-overlay">
          TOKEN_CONV
        </h2>
      </div>
    </>
  )
}
