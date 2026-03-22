import { cn } from '~/lib/cn'

interface LabParametersProps {
  itemName: string | null
  itemPrice: number | null
  manualPrice: string
  onManualPriceChange: (value: string) => void
  onRunScenario: () => void
  isLoading: boolean
  scenarioCount: number
}

export function LabParameters({
  itemName,
  itemPrice,
  manualPrice,
  onManualPriceChange,
  onRunScenario,
  isLoading,
  scenarioCount,
}: LabParametersProps) {
  const hasContext = itemName && itemPrice != null && itemPrice > 0
  const displayPrice = hasContext
    ? '$' + itemPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : manualPrice
      ? '$' + Number(manualPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : '$0.00'

  return (
    <>
      {/* Condensed horizontal bar for tablet and below */}
      <div className="flex lg:hidden items-center gap-4 px-4 py-3 bg-surface-container-low/40 backdrop-blur-sm border-b border-outline-variant/10 overflow-x-auto">
        <span className="font-headline text-sm font-black text-primary-container tracking-tighter uppercase whitespace-nowrap">
          What If Lab
        </span>
        <div className="w-[1px] h-6 bg-outline-variant/20 shrink-0" />
        {hasContext ? (
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-label text-[10px] text-outline uppercase">Item:</span>
            <span className="font-headline font-bold text-primary-container text-xs uppercase">{itemName}</span>
            <span className="font-label text-[10px] text-outline uppercase">Price:</span>
            <span className="font-headline font-bold text-accent text-xs">{displayPrice}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-label text-[10px] text-outline uppercase">Amount: $</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={manualPrice}
              onChange={(e) => onManualPriceChange(e.target.value)}
              className="w-24 bg-surface-container-highest border border-outline-variant/20 px-2 py-1 font-headline text-xs text-primary-container focus:outline-none focus:border-primary-container/40"
              placeholder="0.00"
            />
          </div>
        )}
        <div className="w-[1px] h-6 bg-outline-variant/20 shrink-0" />
        <button
          onClick={onRunScenario}
          disabled={isLoading}
          className="px-4 py-1.5 bg-accent text-surface font-headline font-bold text-[10px] tracking-widest uppercase hover:bg-accent/90 transition-colors disabled:opacity-50 shrink-0"
        >
          {isLoading ? 'GENERATING...' : 'GENERATE'}
        </button>
      </div>

      {/* Full sidebar for desktop */}
      <div className="hidden lg:flex w-80 border-r border-outline-variant/10 p-8 flex-col gap-8 bg-surface-container-low/40 backdrop-blur-sm relative overflow-hidden group/sidebar">
        {/* Scanning line on hover */}
        <div className="absolute left-0 top-0 w-full h-[2px] bg-primary-container/30 shadow-[0_0_15px_rgba(0,245,255,0.8)] pointer-events-none opacity-0 group-hover/sidebar:opacity-100 group-hover/sidebar:animate-[scan-parameters_1.5s_linear_infinite] transition-opacity" />

        {/* Title */}
        <div className="space-y-2">
          <h2 className="font-headline text-2xl font-black text-primary-container tracking-tighter uppercase leading-none">
            What If Lab
          </h2>
          <div className="w-12 h-1 bg-primary-container" />
          <p className="font-body text-xs text-outline/60 italic leading-tight mt-2">
            What could you build if you spent this money on AI tokens instead?
          </p>
        </div>

        {/* Item Context or Manual Input */}
        <div className="space-y-4">
          {hasContext ? (
            <>
              <label className="font-label text-[10px] text-outline tracking-widest uppercase">
                Last Conversion
              </label>
              <div
                className="p-4 bg-surface-container-highest border border-primary-container/20 relative overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 0 100%)' }}
              >
                <div className="font-label text-[9px] text-outline uppercase tracking-widest mb-1">
                  Item
                </div>
                <div className="font-headline font-bold text-on-surface text-sm uppercase tracking-tight mb-3">
                  {itemName}
                </div>
                <div className="font-label text-[9px] text-outline uppercase tracking-widest mb-1">
                  Price
                </div>
                <div className="font-headline font-bold text-accent text-2xl">
                  {displayPrice}
                </div>
              </div>
            </>
          ) : (
            <>
              <label className="font-label text-[10px] text-outline tracking-widest uppercase">
                Enter Dollar Amount
              </label>
              <div
                className="relative"
                style={{ clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 0 100%)' }}
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 font-headline font-bold text-outline text-lg">
                  $
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={manualPrice}
                  onChange={(e) => onManualPriceChange(e.target.value)}
                  className="w-full bg-surface-container-highest border border-outline-variant/20 pl-8 pr-4 py-4 font-headline text-lg text-primary-container focus:outline-none focus:border-primary-container/40 transition-colors"
                  placeholder="0.00"
                />
              </div>
              <p className="font-label text-[9px] text-outline/40 italic">
                Or convert an item on the home page first for full context.
              </p>
            </>
          )}
        </div>

        {/* Scenario count */}
        {scenarioCount > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="font-label text-[10px] text-outline tracking-widest uppercase">
                Scenarios Generated
              </label>
              <span className="font-headline font-bold text-secondary text-sm">
                {scenarioCount}
              </span>
            </div>
            <div className="h-1 bg-outline-variant/20 overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-500"
                style={{ width: `${Math.min(scenarioCount * 20, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* GENERATE SCENARIO button */}
        <div className="mt-auto space-y-4">
          <button
            onClick={onRunScenario}
            disabled={isLoading}
            className={cn(
              'w-full bg-accent text-surface font-headline font-bold py-4 text-xs tracking-widest uppercase transition-colors shadow-[0_0_15px_rgba(255,70,85,0.3)] relative overflow-hidden',
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent/90'
            )}
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 90%)' }}
          >
            <span className="relative z-10">
              {isLoading ? 'GENERATING...' : 'GENERATE SCENARIO'}
            </span>
          </button>
          <div className="font-label text-[8px] text-outline/30 text-center uppercase tracking-widest">
            AI-POWERED OPPORTUNITY ANALYSIS
          </div>
        </div>
      </div>
    </>
  )
}
