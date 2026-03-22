import { cn } from '~/lib/cn'

const CONVERSION_STEPS = [
  { number: '01', label: 'Ingestion', borderClass: 'border-secondary', textClass: 'text-secondary', bgHover: 'group-hover/step:bg-secondary', gradientFrom: 'from-secondary', labelHover: 'group-hover/step:text-secondary' },
  { number: '02', label: 'Vaporization', borderClass: 'border-[#ff4655]', textClass: 'text-[#ff4655]', bgHover: 'group-hover/step:bg-[#ff4655]', gradientFrom: 'from-[#ff4655]', labelHover: 'group-hover/step:text-[#ff4655]' },
  { number: '03', label: 'AI_Synthesis', borderClass: 'border-[#00f5ff]', textClass: 'text-[#00f5ff]', bgHover: 'group-hover/step:bg-[#00f5ff]', gradientFrom: 'from-[#00f5ff]', labelHover: 'group-hover/step:text-[#00f5ff]' },
] as const

const BAR_DATA = [
  { value: 98, height: 'h-[95%]', bg: 'bg-secondary', text: 'text-secondary', label: 'RAD_CORE' },
  { value: 82, height: 'h-[82%]', bg: 'bg-[#ff4655]', text: 'text-[#ff4655]', label: 'L_STRM' },
  { value: 64, height: 'h-[64%]', bg: 'bg-[#00f5ff]', text: 'text-[#00f5ff]', label: 'STAT_ASSET' },
  { value: 42, height: 'h-[42%]', bg: 'bg-outline', text: 'text-outline', label: 'AN_RELIC' },
] as const

export function TransformationLogic() {
  return (
    <section className="mt-32 pt-16 relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-24 h-1 bg-[#ff4655]" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left column: Text content */}
        <div className="lg:col-span-1">
          <h2 className="font-headline text-3xl font-black uppercase mb-10 tracking-[0.2em] flex items-center gap-4">
            <span className="w-3 h-10 bg-[#00f5ff]" />
            Transformation Logic
          </h2>

          <div className="space-y-8">
            <p className="font-body text-on-surface text-xl leading-relaxed first-letter:text-5xl first-letter:font-headline first-letter:text-[#ff4655] first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              In the era of post-physical commerce, the &apos;density&apos; of a
              token isn&apos;t measured in atoms, but in its capacity for
              transformation. A Swiss Watch is a beautiful relic, while a Premium
              Coffee serves as high-octane propellant for cognitive hardware.
            </p>

            <div className="p-6 bg-[#00f5ff]/5 border-l-2 border-[#00f5ff] clipped-tr">
              <p className="font-body text-on-surface-variant italic">
                We prioritize assets that offer the highest{' '}
                <span className="text-[#00f5ff] font-bold not-italic">
                  Transformation Ratio
                </span>
                . S-Tier items possess a density that allows them to be instantly
                vaporized into digital potential.
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Charts */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Floating geometric particles */}
          <div
            className="absolute top-10 left-10 w-2 h-2 border border-[#00f5ff]/40 pointer-events-none"
            style={{ animation: 'float-geo 12s infinite linear', animationDelay: '-1s' }}
          />
          <div
            className="absolute bottom-20 right-1/2 w-2 h-2 border border-[#ff4655]/40 rounded-full pointer-events-none"
            style={{ animation: 'float-geo 12s infinite linear', animationDelay: '-5s' }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-3 h-3 border border-[#00f5ff]/40 pointer-events-none"
            style={{ animation: 'float-geo 12s infinite linear', animationDelay: '-8s' }}
          />

          {/* Efficiency Delta Map (Bar Chart) */}
          <div className="bg-[#121c27] p-8 clipped-tr border border-[#00f5ff]/10 hover:border-[#00f5ff]/30 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f5ff]/5 to-transparent pointer-events-none" />

            <div className="flex justify-between items-center mb-10 relative z-10">
              <div>
                <h4 className="font-label text-xs uppercase tracking-[0.4em] text-[#ff4655] mb-1">
                  Efficiency_Delta_Map
                </h4>
                <p className="text-[10px] text-outline uppercase">
                  Active Tracking // Sector_09
                </p>
              </div>
              <span className="text-[#ff4655] group-hover:scale-125 transition-transform text-2xl">
                &#x1F4C8;
              </span>
            </div>

            <div className="h-48 flex items-end gap-3 px-2 relative z-10">
              {BAR_DATA.map((bar) => (
                <div
                  key={bar.label}
                  className={cn(
                    'w-full opacity-80 relative hover:opacity-100 transition-opacity',
                    bar.bg,
                    bar.height
                  )}
                >
                  <div
                    className={cn(
                      'absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-label font-bold',
                      bar.text
                    )}
                  >
                    {bar.value}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-white/20 h-2" />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between font-label text-[9px] text-outline/50 uppercase tracking-widest relative z-10">
              {BAR_DATA.map((bar) => (
                <span key={bar.label}>{bar.label}</span>
              ))}
            </div>
          </div>

          {/* Conversion Cycle */}
          <div className="bg-[#121c27] p-8 clipped-bl border border-[#ff4655]/10 hover:border-[#ff4655]/30 transition-all flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tl from-[#ff4655]/5 to-transparent pointer-events-none" />

            <div className="font-label text-[11px] text-secondary tracking-[0.5em] uppercase mb-10 text-center relative z-10">
              Conversion_Cycle_01
            </div>

            <div className="space-y-8 relative z-10">
              {CONVERSION_STEPS.map((step) => (
                <div key={step.number} className="flex items-center gap-6 group/step">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-headline font-bold transition-all group-hover/step:text-[#0a141e]',
                      step.borderClass,
                      step.textClass,
                      step.bgHover
                    )}
                  >
                    {step.number}
                  </div>
                  <div
                    className={cn(
                      'flex-grow h-[1px] bg-gradient-to-r to-transparent',
                      step.gradientFrom
                    )}
                  />
                  <div
                    className={cn(
                      'font-label text-[10px] text-on-surface uppercase tracking-widest transition-colors',
                      step.labelHover
                    )}
                  >
                    {step.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
