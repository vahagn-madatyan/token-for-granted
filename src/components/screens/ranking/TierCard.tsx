import { cn } from '~/lib/cn'

interface TierCardProps {
  tier: 'S' | 'A' | 'B' | 'C'
  name: string
  description: string
  densityScore: number
  imageUrl: string
  imageAlt: string
  tierLabel: string
  tierCategory: string
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

export function TierCard({
  tier,
  name,
  description,
  densityScore,
  imageUrl,
  imageAlt,
  tierLabel,
  tierCategory,
}: TierCardProps) {
  const colors = tierColors[tier]

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
        <div className="flex justify-between items-start mb-8">
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
              {tierLabel}
            </span>
            <span className="text-[9px] font-label text-outline/50 uppercase">
              {tierCategory}
            </span>
          </div>
        </div>

        {/* Image area */}
        <div className="mb-10 h-56 relative overflow-hidden bg-surface-container-highest clipped-tr border border-transparent group-hover:border-primary-container/50 transition-all">
          <img
            className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-1000 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100"
            src={imageUrl}
            alt={imageAlt}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121c27] to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
        </div>

        {/* Title */}
        <h3
          className={cn(
            'font-headline text-3xl font-black mb-3 uppercase tracking-tighter cursor-default',
            colors.text
          )}
        >
          {name}
        </h3>

        {/* Description */}
        <p className="font-body text-on-surface-variant text-base mb-8 flex-grow leading-snug italic">
          {description}
        </p>

        {/* Bottom: Density Score */}
        <div className={cn('flex justify-between items-end border-t pt-6', colors.borderAccent)}>
          <div>
            <div className="text-[10px] font-label uppercase text-outline tracking-widest mb-1">
              Density Score
            </div>
            <div className={cn('text-3xl font-headline font-black', colors.text)}>
              {densityScore}
              {tier === 'S' && (
                <span className="text-xs ml-1 opacity-50 font-normal">MAX</span>
              )}
            </div>
          </div>
          <div className={cn('w-12 h-px mb-4', colors.lineAccent)} />
        </div>
      </div>
    </div>
  )
}
