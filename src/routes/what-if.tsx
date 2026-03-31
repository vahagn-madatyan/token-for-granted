import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useCountUp } from '~/components/animations/useCountUp'
import { staggerContainer, fadeInUp } from '~/components/animations/variants'
import { LabParameters } from '~/components/screens/whatif/LabParameters'
import { ScenarioCard, getAccentForIndex } from '~/components/screens/whatif/ScenarioCard'
import { runScenario } from '~/core/functions/scenario.functions'

export const Route = createFileRoute('/what-if')({
  component: WhatIf,
})

interface GeneratedScenario {
  title: string
  scenario: string
  key_insight: string
  itemName: string
  itemPrice: number
}

function WhatIf() {
  const [itemName, setItemName] = useState<string | null>(null)
  const [itemPrice, setItemPrice] = useState<number | null>(null)
  const [manualPrice, setManualPrice] = useState('')
  const [scenarios, setScenarios] = useState<GeneratedScenario[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const scenariosGenerated = useCountUp(scenarios.length, 500)
  const tokensAnalyzed = useCountUp(scenarios.length * 8, 800) // 8 providers per scenario

  // Check sessionStorage for last search on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = sessionStorage.getItem('lastSearch')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.itemName) setItemName(parsed.itemName)
        if (parsed.itemPrice && parsed.itemPrice > 0) setItemPrice(parsed.itemPrice)
      }
    } catch {
      // Ignore parse errors
    }
  }, [])

  async function handleRunScenario() {
    if (isLoading) return

    // Determine the price to use
    const priceToUse = itemPrice && itemPrice > 0
      ? itemPrice
      : manualPrice
        ? Number(manualPrice)
        : 0

    if (priceToUse <= 0) return

    const nameToUse = itemName || 'your purchase'

    setIsLoading(true)
    try {
      const result = await runScenario({
        data: { itemName: nameToUse, itemPrice: priceToUse },
      })
      setScenarios((prev) => [
        {
          title: result.title,
          scenario: result.scenario,
          key_insight: result.key_insight,
          itemName: result.itemName,
          itemPrice: result.itemPrice,
        },
        ...prev,
      ])
    } catch (error) {
      console.error('Scenario generation failed:', error)
      setScenarios((prev) => [
        {
          title: 'GENERATION ERROR',
          scenario: 'Scenario generation failed. The AI provider may be temporarily unavailable. Try again in a moment.',
          key_insight: 'Even failed attempts are tokens well-spent on learning.',
          itemName: nameToUse,
          itemPrice: priceToUse,
        },
        ...prev,
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Build the dynamic header based on context
  const headerText = itemPrice && itemPrice > 0 && itemName
    ? `What if you spent $${itemPrice.toLocaleString()} on AI instead of "${itemName}"?`
    : 'What could you build with AI tokens?'

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-8rem)]">
      {/* Left sidebar: Lab Parameters */}
      <LabParameters
        itemName={itemName}
        itemPrice={itemPrice}
        manualPrice={manualPrice}
        onManualPriceChange={setManualPrice}
        onRunScenario={handleRunScenario}
        isLoading={isLoading}
        scenarioCount={scenarios.length}
      />

      {/* Right: Main content */}
      <section className="flex-1 p-6 md:p-12 overflow-y-auto relative">
        {/* Large watermark */}
        <div className="fixed bottom-0 right-0 font-headline font-black text-[18vw] leading-none text-on-surface opacity-[0.03] pointer-events-none select-none -mb-20">
          WHAT_IF
        </div>

        {/* Header */}
        <motion.div
          className="flex justify-between items-end mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-1">
            <h1 className="font-headline text-3xl md:text-5xl font-black text-on-surface tracking-tighter uppercase">
              What If Lab
            </h1>
            <p className="font-body text-outline italic text-lg max-w-xl">
              {headerText}
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="font-label text-[10px] text-outline uppercase">
                Scenarios
              </div>
              <div className="font-headline font-bold text-primary-container">
                {Math.round(scenariosGenerated)}
              </div>
            </div>
            <div className="w-[1px] h-10 bg-outline-variant/20" />
            <div className="text-right">
              <div className="font-label text-[10px] text-outline uppercase">
                Providers Checked
              </div>
              <div className="font-headline font-bold text-secondary">
                {Math.round(tokensAnalyzed)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scenario cards */}
        {scenarios.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-16 md:py-24 space-y-8 relative"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            {/* Decorative ambient pulse */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 bg-primary-container/5 rounded-full blur-[100px] animate-pulse" />
            </div>

            {/* Icon cluster */}
            <div className="relative">
              <div className="w-20 h-20 border-2 border-outline-variant/20 flex items-center justify-center"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <span className="font-headline text-3xl text-primary-container/40">&#x2756;</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent/40 animate-ping rounded-full" />
            </div>

            <div className="font-headline text-3xl md:text-5xl font-black text-outline/15 uppercase tracking-tighter text-center">
              AWAITING INPUT
            </div>
            <p className="font-body text-on-surface-variant text-base md:text-lg italic max-w-lg text-center leading-relaxed">
              {itemPrice && itemPrice > 0
                ? `Click "GENERATE SCENARIO" to see what $${itemPrice.toLocaleString()} in AI tokens could unlock.`
                : 'Enter a dollar amount in the sidebar and click "GENERATE SCENARIO" to explore the opportunity cost.'}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-primary-container/20" />
              <div className="w-2 h-2 bg-primary-container/20 rotate-45" />
              <div className="w-8 h-[1px] bg-primary-container/20" />
            </div>

            {/* Hint cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mt-4">
              {[
                { label: 'OPPORTUNITY', desc: 'See what AI could build with your budget', icon: '&#x26A1;' },
                { label: 'PROVIDERS', desc: '8 AI providers compared side-by-side', icon: '&#x2756;' },
                { label: 'INSIGHT', desc: 'AI-generated analysis of token potential', icon: '&#x25C6;' },
              ].map((hint) => (
                <div key={hint.label} className="bg-surface-container/50 border border-outline-variant/10 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary-container/60 text-sm" dangerouslySetInnerHTML={{ __html: hint.icon }} />
                    <span className="font-label text-[10px] text-primary-container/60 uppercase tracking-widest">{hint.label}</span>
                  </div>
                  <p className="font-body text-xs text-on-surface-variant/60">{hint.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-8 pb-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {scenarios.map((s, i) => (
              <motion.div key={`${s.title}-${i}`} variants={fadeInUp}>
                <ScenarioCard
                  title={s.title}
                  scenario={s.scenario}
                  keyInsight={s.key_insight}
                  itemName={s.itemName}
                  itemPrice={s.itemPrice}
                  accentColor={getAccentForIndex(i)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  )
}
