import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { TierCard } from '~/components/screens/ranking/TierCard'
import { TransformationLogic } from '~/components/screens/ranking/TransformationLogic'
import { staggerContainer, fadeInUp } from '~/components/animations/variants'

const SEEDED_ITEMS = [
  {
    tier: 'S' as const,
    name: 'Premium Coffee',
    description:
      'High-velocity catalyst. Instant conversion to neural compute power. The ultimate bridge.',
    densityScore: 98.4,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCxMwokGUsXi_0T5Tba11h8MLI6UOs_i_8fBzgd40FdR6ye2u_mped0a0s0zA2cg5Kg66f7iAtVH3VHf5VZ9nkvinwznRnlZKX4Yz-dGpuCxeV2-e-gIZJT47362Qmc_Nq3rBCk_RJ0DUYFChf_Ah2WC9imjQjcKop7kUwWUG7fL8s-nizLa1I2zaLEd6wWBX-5SwZuhkmhaabfSMnSiJS9iPBBL3VuWjyzgTNLrpnSCrq_Ifnfn9C-RePj6FEVXG2omtc_YN0NxGe8',
    imageAlt: 'Premium espresso with gold-rimmed cup',
    tierLabel: 'RADIANT_CORE',
    tierCategory: 'Physical High-Value',
  },
  {
    tier: 'A' as const,
    name: 'Netflix',
    description:
      'Ubiquitous narrative data-set. High cultural resonance but slightly diluted by mass distribution.',
    densityScore: 82.1,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBXTr3XQcsUrpXLSeOvSaWlvJI9yNxhWbzQk2mhe4v0_VZUICjtf1eQk94cM03_J6eILUikymxTKJjmtTOBnrxYGbzxzfjwvmU9RkODGYC3UsY9ur43Bn2Q0SVpIGZPVuMRR12rRA5MqVBQm8fGtoMUvaxxUTSKcFirQ8Txy2ADW9k7DmFml4td1DO01xedpHY2LsqFAb6gP2FbhLkdwa6GevIfWO2Zj6WHZjtQsYFxwxqWiHHXnjb-KyuTU2azSEiAOMilC5V-nlZA',
    imageAlt: 'Digital streaming interface on high-end display',
    tierLabel: 'LATENT_STREAM',
    tierCategory: 'Digital High-Value',
  },
  {
    tier: 'B' as const,
    name: 'Designer Bag',
    description:
      'Status signaling logic. High secondary market liquid potential but low algorithmic utility.',
    densityScore: 64.5,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA5lIuBS-gYC3xIlu_SLJqz3XGQeQs836VPquWocrMeoCmnS5wPA40acjYG4PWyLzTKbqzPR4nY3-MscsHZpdWoRolTvFgOHFPTyQLEy7nyMWli3epbXn5LcTeQQdeT3oburi0WOx3KGVflwijscn4kMgl4lvkpPO8wZLQ6HQnajZixMrbUpmCucRs3jagMMMn4E-Bj0T1N8Mh2GgP_nabyusA6vnH_XGoQ6qq69Wf43_tMW-AfgUp5oa16b_NqDHHou0PU_1JRoHXh',
    imageAlt: 'Luxury designer handbag on dark minimalist background',
    tierLabel: 'STATIC_ASSET',
    tierCategory: 'Physical Status',
  },
  {
    tier: 'C' as const,
    name: 'Swiss Watch',
    description:
      'Beautiful prison for mechanical time. High aesthetic value, negligible data density.',
    densityScore: 42.8,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8MOrk8bqWEHfTvfEPU9KZoI0y3xB7-pZlwOfEA4t0OngxJTo8zDA6JMWDnTiUXi96yYjKbUwX5XqWVquu-jstLn89Y2SAqsf15k9LAdd2ME5H_GakJ4_D0GTWmnXnJV_14kj_2cg0pK8wvkAk5ajI_kDZr3bR-Uqa-GLEKgDoI6Vejr9H8LEdpiLDTMUiZFOPoxjz-T41tpgwx_zBpA6UXgzf6_PVuPf-9CM0dgaRzrX0JdsIBggTv31EjhrsGjh3wg2E3STC2Zt7',
    imageAlt: 'Swiss watch movement gears and mechanisms',
    tierLabel: 'ANALOG_RELIC',
    tierCategory: 'Physical Obsolescence',
  },
]

export const Route = createFileRoute('/ranking')({
  component: Ranking,
})

function Ranking() {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Title Section */}
      <div className="mb-20 relative">
        {/* Giant watermark */}
        <h2 className="font-headline text-8xl md:text-[12rem] font-black uppercase opacity-[0.03] absolute -top-20 -left-10 pointer-events-none select-none tracking-tighter text-primary-container">
          MATRIX
        </h2>

        <div className="relative z-10 border-l-4 border-[#ff4655] pl-8">
          <p className="font-label text-secondary text-sm tracking-[0.5em] mb-3 uppercase">
            AUTHENTICATING // TOKEN_VALUE_DENSITY
          </p>
          <h1 className="font-headline text-5xl md:text-8xl font-extrabold uppercase tracking-tighter leading-none mb-6">
            Value <span className="text-primary-container">Matrix</span>
          </h1>
          <p className="font-body text-on-surface-variant max-w-3xl text-xl italic leading-relaxed">
            Quantifying the conversion potential of physical artifacts into
            tactical energy units. Analysis of current market volatility vs.
            latent algorithmic power in the Hextech ecosystem.
          </p>
        </div>
      </div>

      {/* Ranked Tier Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {SEEDED_ITEMS.map((item) => (
          <motion.div key={item.tier} variants={fadeInUp}>
            <TierCard {...item} />
          </motion.div>
        ))}
      </motion.div>

      {/* Transformation Logic Section */}
      <TransformationLogic />
    </div>
  )
}
