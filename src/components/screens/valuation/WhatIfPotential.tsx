interface WhatIfPotentialProps {
  projectedValue: number
  confidence: number
  analysis: string
}

export function WhatIfPotential({
  projectedValue,
  confidence,
  analysis,
}: WhatIfPotentialProps) {
  return (
    <div className="p-6 bg-surface-container-highest border-l-4 border-secondary shadow-[0_0_30px_rgba(0,245,255,0.05)] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="text-secondary"
          style={{
            display: 'inline-block',
            fontSize: '18px',
            animation: 'spin 3s linear infinite',
          }}
        >
          &#9883;
        </span>
        <span className="font-headline font-bold text-xs tracking-widest text-secondary uppercase">
          WHAT IF: POTENTIAL SCALE
        </span>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Top row - values */}
        <div className="flex justify-between items-end">
          <div>
            <div className="text-[10px] font-label text-outline uppercase">
              Bullish Terminal Value (2026)
            </div>
            <div className="text-2xl font-headline font-black text-on-surface">
              $
              {projectedValue.toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-label text-outline uppercase">
              Confidence
            </div>
            <div className="text-sm font-headline font-bold text-secondary">
              {confidence}%
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-surface-container-lowest w-full relative overflow-hidden">
          <div
            className="h-full bg-secondary shadow-[0_0_10px_#00f5ff] origin-left"
            style={{
              width: `${confidence}%`,
              animation:
                'progressLoad 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            }}
          />
        </div>

        {/* Analysis text */}
        <p className="text-xs text-on-surface/50 font-body leading-relaxed">
          {analysis}
        </p>
      </div>
    </div>
  )
}
