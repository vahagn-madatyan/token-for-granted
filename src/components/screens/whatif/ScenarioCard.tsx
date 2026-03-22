import { cn } from '~/lib/cn'
import { useTypewriter } from '~/components/animations/useTypewriter'

interface ScenarioCardProps {
  title: string
  scenario: string
  keyInsight: string
  itemName: string
  itemPrice: number
  accentColor: 'primary' | 'secondary' | 'error'
}

const accentMap = {
  primary: {
    border: 'border-primary-container/30',
    title: 'text-primary-container',
    insight: 'text-primary-container',
    bg: 'bg-primary-container/5',
  },
  secondary: {
    border: 'border-secondary/30',
    title: 'text-secondary',
    insight: 'text-secondary',
    bg: 'bg-secondary/5',
  },
  error: {
    border: 'border-error/30',
    title: 'text-error',
    insight: 'text-error',
    bg: 'bg-error/5',
  },
}

const ACCENT_CYCLE: Array<'primary' | 'secondary' | 'error'> = ['primary', 'secondary', 'error']

export function getAccentForIndex(index: number): 'primary' | 'secondary' | 'error' {
  return ACCENT_CYCLE[index % ACCENT_CYCLE.length]
}

export function ScenarioCard({
  title,
  scenario,
  keyInsight,
  itemName,
  itemPrice,
  accentColor,
}: ScenarioCardProps) {
  const { displayText, isComplete } = useTypewriter(scenario, 20)
  const accent = accentMap[accentColor]

  return (
    <article
      className={cn(
        'relative bg-surface-container-high/60 backdrop-blur-md border p-6 transition-all',
        accent.border
      )}
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)' }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">
            WHAT IF SCENARIO
          </div>
          <h3
            className={cn(
              'font-headline text-xl font-black uppercase tracking-tighter',
              accent.title
            )}
          >
            {title}
          </h3>
        </div>
        <div className="text-right">
          <div className="font-label text-[9px] text-outline/50 uppercase">
            {itemName}
          </div>
          <div className="font-headline text-sm font-bold text-on-surface">
            ${itemPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Scenario text with typewriter */}
      <div className="mb-6 min-h-[100px]">
        <p className="font-body text-on-surface-variant text-sm leading-relaxed">
          {displayText}
          {!isComplete && (
            <span className="inline-block w-[2px] h-3 bg-primary-container/60 ml-0.5 animate-pulse" />
          )}
        </p>
      </div>

      {/* Key insight */}
      {isComplete && keyInsight && (
        <div className={cn('p-4 border-l-2', accent.border, accent.bg)}>
          <div className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">
            KEY INSIGHT
          </div>
          <p className={cn('font-body text-sm font-medium italic', accent.insight)}>
            {keyInsight}
          </p>
        </div>
      )}
    </article>
  )
}
