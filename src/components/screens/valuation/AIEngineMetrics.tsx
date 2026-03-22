interface AIEngineMetricsProps {
  confidence: number
}

interface EngineCard {
  name: string
  borderColor: string
  iconColor: string
  icon: string
  bar1Label: string
  bar1Value: number
  bar1Color: string
  bar1Shadow: string
  bar2Label: string
  bar2Value: number
  bar2Color: string
  spinColor: string
}

export function AIEngineMetrics({ confidence }: AIEngineMetricsProps) {
  const engines: EngineCard[] = [
    {
      name: 'GPT-4S',
      borderColor: 'border-accent',
      iconColor: 'text-primary-container',
      icon: '\u25C9', // pulsing dot symbol
      bar1Label: 'Sync Ratio',
      bar1Value: Math.min(confidence + 8, 99.9),
      bar1Color: 'bg-accent',
      bar1Shadow: 'shadow-[0_0_10px_#ff4655]',
      bar2Label: 'Processing Load',
      bar2Value: Number((confidence * 0.45).toFixed(1)),
      bar2Color: 'bg-accent',
      spinColor: 'border-accent',
    },
    {
      name: 'CLAUDE 3.5',
      borderColor: 'border-secondary',
      iconColor: 'text-secondary',
      icon: '\u29D6', // brain-like symbol
      bar1Label: 'Nuance Index',
      bar1Value: Math.max(confidence - 2, 60),
      bar1Color: 'bg-secondary',
      bar1Shadow: 'shadow-[0_0_10px_#00f5ff]',
      bar2Label: 'Thermal Output',
      bar2Value: Number((confidence * 0.24).toFixed(1)),
      bar2Color: 'bg-secondary',
      spinColor: 'border-secondary',
    },
    {
      name: 'LLAMA 2.1',
      borderColor: 'border-outline-variant',
      iconColor: 'text-outline',
      icon: '\u2B21', // network hex symbol
      bar1Label: 'Neural Density',
      bar1Value: Math.max(confidence - 15, 50),
      bar1Color: 'bg-outline',
      bar1Shadow: '',
      bar2Label: 'Efficiency Rate',
      bar2Value: Math.min(confidence + 3, 99),
      bar2Color: 'bg-outline',
      spinColor: 'border-outline',
    },
  ]

  return (
    <section className="space-y-8">
      {/* Section header */}
      <div className="flex items-center gap-4">
        <h2 className="font-headline text-xs font-bold tracking-[0.4em] uppercase text-outline">
          Compute Engine Readouts // ACTIVE_NODES
        </h2>
        <div className="h-[1px] bg-secondary/20 flex-1" />
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {engines.map((engine, idx) => (
          <div
            key={engine.name}
            className={`p-6 bg-surface-container-low border-l-4 ${engine.borderColor} relative group overflow-hidden`}
          >
            {/* Spinning circles decoration */}
            <div
              className={`absolute -right-4 -top-4 w-16 h-16 border-2 ${engine.spinColor}/10 rounded-full pointer-events-none`}
              style={{ animation: 'spin 12s linear infinite' }}
            />
            <div
              className={`absolute -right-2 -top-2 w-8 h-8 border ${engine.spinColor}/20 rounded-full pointer-events-none`}
              style={{
                animation: 'spin 4s linear infinite reverse',
              }}
            />

            {/* Model name + icon */}
            <div className="flex justify-between items-start mb-6">
              <span className="font-headline font-bold text-xl text-accent uppercase">
                {engine.name}
              </span>
              <span
                className={`${engine.iconColor} text-xl`}
                style={{
                  animation:
                    idx === 0
                      ? 'pulse 2s ease-in-out infinite'
                      : undefined,
                }}
              >
                {engine.icon}
              </span>
            </div>

            {/* Progress bars */}
            <div className="space-y-4">
              {/* Bar 1 */}
              <div>
                <div className="flex justify-between text-[10px] font-label uppercase text-outline mb-1">
                  <span>{engine.bar1Label}</span>
                  <span>{engine.bar1Value.toFixed(1)}%</span>
                </div>
                <div className="h-1 bg-surface-container-highest w-full overflow-hidden">
                  <div
                    className={`h-full ${engine.bar1Color} ${engine.bar1Shadow} origin-left`}
                    style={{
                      width: `${engine.bar1Value}%`,
                      animation:
                        'progressLoad 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                      animationDelay: `${idx * 0.2 + 0.1}s`,
                    }}
                  />
                </div>
              </div>

              {/* Bar 2 */}
              <div>
                <div className="flex justify-between text-[10px] font-label uppercase text-outline mb-1">
                  <span>{engine.bar2Label}</span>
                  <span>{engine.bar2Value.toFixed(1)}%</span>
                </div>
                <div className="h-1 bg-surface-container-highest w-full overflow-hidden">
                  <div
                    className={`h-full ${engine.bar2Color} opacity-50 origin-left`}
                    style={{
                      width: `${engine.bar2Value}%`,
                      animation:
                        'progressLoad 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                      animationDelay: `${idx * 0.2 + 0.2}s`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
