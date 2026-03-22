import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useCountUp } from '~/components/animations/useCountUp'
import { staggerContainer, fadeInUp } from '~/components/animations/variants'
import { LabParameters } from '~/components/screens/whatif/LabParameters'
import { ScenarioCard } from '~/components/screens/whatif/ScenarioCard'

export const Route = createFileRoute('/what-if')({
  component: WhatIf,
})

function WhatIf() {
  const activeThreads = useCountUp(124000, 2000)
  const logicNodes = useCountUp(88400, 2500)

  function formatLogicNodes(value: number): string {
    return (value / 1000).toFixed(1) + 'k'
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)]">
      {/* Left sidebar: Lab Parameters */}
      <LabParameters />

      {/* Right: Main content */}
      <section className="flex-1 p-12 overflow-y-auto relative">
        {/* Large watermark */}
        <div className="fixed bottom-0 right-0 font-headline font-black text-[18vw] leading-none text-on-surface opacity-[0.03] pointer-events-none select-none -mb-20">
          HEXTECH
        </div>

        {/* Header */}
        <motion.div
          className="flex justify-between items-end mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-1">
            <h1 className="font-headline text-5xl font-black text-on-surface tracking-tighter uppercase">
              Generation Potentials
            </h1>
            <p className="font-body text-outline italic text-lg max-w-xl">
              Observing high-scale variance of cosmic intelligence across
              synthetic archetypes.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="font-label text-[10px] text-outline uppercase">
                Active Threads
              </div>
              <div className="font-headline font-bold text-primary-container">
                {Math.round(activeThreads).toLocaleString()}+
              </div>
            </div>
            <div className="w-[1px] h-10 bg-outline-variant/20" />
            <div className="text-right">
              <div className="font-label text-[10px] text-outline uppercase">
                Logic Nodes
              </div>
              <div className="font-headline font-bold text-secondary">
                {formatLogicNodes(logicNodes)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scenario cards grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <ScenarioCard
              scenarioId="shakespearean-loop"
              title="Shakespearean Loop"
              description="AI writes 5,000 lost sonnets per second, refining poetic structure until the data is indistinguishable from the Bard himself."
              intensity="OMEGA"
              classLabel="LYRIC_VOID"
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAAI0Uhl7GlGtxudEeiWJQ-e0ENBryYMJXiV4UFudTDaWIZmK8fYaVGxR8C3ed7FfJQNiRql2gWlG491TcNarqGWRemgWRZqo4nelVOKUwL8Ui6XrljEj0zkuCxXkexcqRW1ps8tNsnWaVK2Ywk3BgHBcZJPstAlTmdOKFfky46pgHrapstnnstadH8Y5qTX8vhNBKGyew5gnT7x4mS423uGZoz-09vq0bR4oPJdiUqW6Sbl9aBQbVDpnEObEocPstcXZvsoVEyGHhp"
              accentColor="primary"
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <ScenarioCard
              scenarioId="repo-foundry"
              title="The Repo Foundry"
              description="Instant generation of 1,000 full-stack repositories. Automated refactoring into self-healing organic logic structures."
              intensity="ALPHA"
              classLabel="LOGIC_CORE"
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuA_XVGann-lDLc3ZyCErR9ivurkbfFOVmvIx7NX8etaSoCor9eQcaz8oQ-53WHvembNBY0iVa1gQpd6Q-5vC1izTRUrI3iioKYoGynj85pVpKnYA8PQnaxyUD_PITsuh7dUwDaXcZdSi5NQwgwzs2N49SUw7ao2CKdPejMA9rkAjhgie0WnTgQRgQL8FMf2zg8g3Of3xPgn4YWO55QhqrJYwkIVTu0AU-FBu29nMQRvLhoHs9BGyzLWJU-SnO49Dc238-C56q49M4gP"
              accentColor="secondary"
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <ScenarioCard
              scenarioId="infinite-debate"
              title="Infinite Debate"
              description="High-frequency philosophical conflict between 100 LLMs until a universal truth-state is crystallized."
              intensity="SIGMA"
              classLabel="ENTROPY_CELL"
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCUc-VwDCD2JnTeNH-BN4ZpuSjUJt2nLAYI2DFuNtX9sOEUD9eqpulzEFQqJ-j8K4Z-u5jzVhgbmFraQKoXyg7xq6A3WrPbKrn_ybyBoLE1JPSOSe2KwjIHukwCjJgaTFfYrkILKBnznFQVdNvvrfwmc_qH0wRiMzugcPP228vw3FrPCZk-dJRcmDA_Nijoydl2McwGmHXMIOlnc9cw3wAsg3yWP32tu7ajK_xaNpaz4EnFYPVh7OhRd5Vgz-FA2ukOHTW2_ihi0HVr"
              accentColor="error"
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
