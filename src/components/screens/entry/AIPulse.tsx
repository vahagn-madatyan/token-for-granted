import { HexCard } from '~/components/ui/HexCard'

/**
 * AI Pulse status widget with animated frequency bars.
 * Shows SYNCHRONIZED status with 6 pulsing vertical bars and latency readout.
 */
export function AIPulse() {
  const bars = [
    { height: '30%', opacity: 'bg-primary-container/20', delay: '0s' },
    { height: '60%', opacity: 'bg-primary-container/40', delay: '0.2s' },
    { height: '90%', opacity: 'bg-primary-container', delay: '0.4s' },
    { height: '50%', opacity: 'bg-primary-container/60', delay: '0.1s' },
    { height: '40%', opacity: 'bg-primary-container/30', delay: '0.3s' },
    { height: '20%', opacity: 'bg-primary-container/10', delay: '0.5s' },
  ]

  return (
    <HexCard elevation="low" clip="tr" borderAccent="primary">
      <div className="font-label text-[10px] text-outline mb-1 uppercase tracking-widest">
        AI Pulse
      </div>
      <div className="flex items-end gap-1 h-12 mb-2">
        {bars.map((bar, i) => (
          <div
            key={i}
            className={`w-2 ${bar.opacity} animate-pulse`}
            style={{
              height: bar.height,
              animationDelay: bar.delay,
            }}
          />
        ))}
      </div>
      <div className="text-xl font-headline font-bold">SYNCHRONIZED</div>
      <div className="font-label text-[10px] text-primary-container">
        LATENCY: 12ms
      </div>
    </HexCard>
  )
}
