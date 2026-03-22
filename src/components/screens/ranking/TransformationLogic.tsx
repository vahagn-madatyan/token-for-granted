import { cn } from '~/lib/cn'

const CONVERSION_STEPS = [
  { number: '01', label: 'Price Discovery', borderClass: 'border-secondary', textClass: 'text-secondary', bgHover: 'group-hover/step:bg-secondary', gradientFrom: 'from-secondary', labelHover: 'group-hover/step:text-secondary' },
  { number: '02', label: 'Token Conversion', borderClass: 'border-[#ff4655]', textClass: 'text-[#ff4655]', bgHover: 'group-hover/step:bg-[#ff4655]', gradientFrom: 'from-[#ff4655]', labelHover: 'group-hover/step:text-[#ff4655]' },
  { number: '03', label: 'Opportunity Reveal', borderClass: 'border-[#00f5ff]', textClass: 'text-[#00f5ff]', bgHover: 'group-hover/step:bg-[#00f5ff]', gradientFrom: 'from-[#00f5ff]', labelHover: 'group-hover/step:text-[#00f5ff]' },
] as const

interface TransformationLogicProps {
  totalConversions?: number
}

export function TransformationLogic({ totalConversions = 0 }: TransformationLogicProps) {
  return (
    <section className="mt-32 pt-16 relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-24 h-1 bg-[#ff4655]" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left column: Text content */}
        <div className="lg:col-span-1">
          <h2 className="font-headline text-3xl font-black uppercase mb-10 tracking-[0.2em] flex items-center gap-4">
            <span className="w-3 h-10 bg-[#00f5ff]" />
            How It Works
          </h2>

          <div className="space-y-8">
            <p className="font-body text-on-surface text-xl leading-relaxed first-letter:text-5xl first-letter:font-headline first-letter:text-[#ff4655] first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              Every purchase has a hidden cost: the AI tokens you didn&apos;t buy.
              We calculate the exact token equivalent across 8 providers — showing
              you what you could build, create, or automate with that money instead.
            </p>

            <div className="p-6 bg-[#00f5ff]/5 border-l-2 border-[#00f5ff] clipped-tr">
              <p className="font-body text-on-surface-variant italic">
                The{' '}
                <span className="text-[#00f5ff] font-bold not-italic">
                  Token Conversion Engine
                </span>{' '}
                uses real-time provider pricing to compute opportunity cost.
                AI estimates the item price. Our code does the math. Every
                dollar has a token value.
              </p>
            </div>

            {totalConversions > 0 && (
              <div className="p-4 bg-surface-container-low border border-secondary/20">
                <div className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">
                  Total Conversions Logged
                </div>
                <div className="text-3xl font-headline font-black text-secondary">
                  {totalConversions}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
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

          {/* Provider Coverage */}
          <div className="bg-[#121c27] p-8 clipped-tr border border-[#00f5ff]/10 hover:border-[#00f5ff]/30 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f5ff]/5 to-transparent pointer-events-none" />

            <div className="flex justify-between items-center mb-10 relative z-10">
              <div>
                <h4 className="font-label text-xs uppercase tracking-[0.4em] text-[#ff4655] mb-1">
                  Provider_Coverage
                </h4>
                <p className="text-[10px] text-outline uppercase">
                  8 AI Providers // Live Pricing
                </p>
              </div>
              <span className="text-[#ff4655] group-hover:scale-125 transition-transform text-2xl">
                &#x1F4C8;
              </span>
            </div>

            <div className="space-y-3 relative z-10">
              {[
                { name: 'OpenAI', models: 'GPT-4o, GPT-4o-mini', color: 'bg-secondary' },
                { name: 'Anthropic', models: 'Claude Sonnet 4, Haiku 3.5', color: 'bg-[#ff4655]' },
                { name: 'Google', models: 'Gemini Flash, 2.5 Pro', color: 'bg-[#00f5ff]' },
                { name: 'Meta + Mistral', models: 'Llama 3.1, Mistral Large', color: 'bg-outline' },
              ].map((provider) => (
                <div key={provider.name} className="flex items-center gap-3">
                  <div className={cn('w-2 h-2', provider.color)} />
                  <div>
                    <div className="font-label text-xs text-on-surface uppercase tracking-wider">
                      {provider.name}
                    </div>
                    <div className="font-label text-[9px] text-outline/50">{provider.models}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Cycle */}
          <div className="bg-[#121c27] p-8 clipped-bl border border-[#ff4655]/10 hover:border-[#ff4655]/30 transition-all flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tl from-[#ff4655]/5 to-transparent pointer-events-none" />

            <div className="font-label text-[11px] text-secondary tracking-[0.5em] uppercase mb-10 text-center relative z-10">
              Conversion_Pipeline
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
