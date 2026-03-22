interface AssetCardProps {
  imageSrc: string
  assetName: string
  artEdition: string
  assetCode: string
  authStatus: string
}

export function AssetCard({
  imageSrc,
  assetName,
  artEdition,
  assetCode,
  authStatus,
}: AssetCardProps) {
  const isVerified = authStatus === 'VERIFIED'

  return (
    <div className="relative group">
      {/* TACTICAL CARD VIEWER */}
      <div className="relative z-10 p-8 bg-surface-container-low clipped-tr border border-secondary/30 shadow-[0_0_50px_rgba(0,245,255,0.1)] backdrop-blur-md overflow-hidden">
        {/* Moving scanline */}
        <div
          className="absolute top-0 left-0 w-full h-[10px] bg-gradient-to-b from-transparent via-primary-container/30 to-transparent pointer-events-none z-20"
          style={{ animation: 'scanline 8s linear infinite' }}
        />

        {/* Asset code label */}
        <div className="absolute top-0 right-0 p-4 font-label text-[10px] text-secondary/40">
          ID: {assetCode}
        </div>

        {/* Image container - 3:4 aspect ratio */}
        <div className="relative aspect-[3/4] bg-surface-container-lowest overflow-hidden border border-white/5">
          <img
            src={imageSrc}
            alt={`${assetName} asset`}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
          {/* HUD scanline overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                'linear-gradient(to bottom, transparent 50%, rgba(0, 245, 255, 0.05) 50%)',
              backgroundSize: '100% 4px',
            }}
          />
        </div>

        {/* Metadata below image */}
        <div className="mt-8 flex justify-between items-end">
          <div>
            <h3 className="font-headline text-3xl font-black text-accent tracking-tighter">
              {assetName}
            </h3>
            <div className="font-label text-xs text-secondary tracking-[0.2em]">
              {artEdition}
            </div>
          </div>
          <div className="text-right">
            <div className="font-label text-[10px] text-outline uppercase mb-2">
              Security Status
            </div>
            <div className="flex gap-1 justify-end">
              <div className="w-3 h-3 bg-secondary" />
              <div className="w-3 h-3 bg-secondary" />
              <div
                className={`w-3 h-3 ${isVerified ? 'bg-secondary' : 'bg-secondary/20'}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* BACKGROUND DECORATION - offset border frame */}
      <div className="absolute -top-4 -left-4 w-full h-full border-2 border-secondary/10 -z-10 clipped-tr" />

      {/* Side text decoration */}
      <div className="absolute top-1/2 -right-16 text-8xl font-headline font-black text-secondary/[0.03] rotate-90 pointer-events-none uppercase tracking-widest">
        AUTHENTIC
      </div>
    </div>
  )
}
