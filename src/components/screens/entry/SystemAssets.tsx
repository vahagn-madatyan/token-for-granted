import { HexCard } from '~/components/ui/HexCard'

/**
 * System Assets panel showing asset status indicators.
 * Displays RARE_ASSET_1 (+2.4%) and CORE_TOKEN (STABLE) with gradient overlay.
 */
export function SystemAssets() {
  return (
    <HexCard elevation="highest" clip="tr" borderAccent="none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent" />

      <div className="relative z-10">
        <div className="font-label text-[10px] text-outline mb-4 uppercase tracking-widest">
          System Assets
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-on-surface-variant font-medium">
              RARE_ASSET_1
            </span>
            <span className="text-secondary font-bold">+2.4%</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-on-surface-variant font-medium">
              CORE_TOKEN
            </span>
            <span className="text-primary-container font-bold">STABLE</span>
          </div>
        </div>
      </div>
    </HexCard>
  )
}
