import { HexCard } from '~/components/ui/HexCard'
import type { WhatYouCouldDo as WhatYouCouldDoType } from '~/core/types'

interface WhatYouCouldDoProps {
  items: WhatYouCouldDoType[]
}

const ICON_MAP: Record<string, string> = {
  rocket: '\u{1F680}',
  robot: '\u{1F916}',
  brain: '\u{1F9E0}',
  lightning: '\u26A1',
  code: '\u{1F4BB}',
  book: '\u{1F4DA}',
  chart: '\u{1F4C8}',
  globe: '\u{1F310}',
  paint: '\u{1F3A8}',
  music: '\u{1F3B5}',
  game: '\u{1F3AE}',
  camera: '\u{1F4F7}',
  star: '\u2B50',
  tools: '\u{1F6E0}\uFE0F',
  money: '\u{1F4B0}',
  fire: '\u{1F525}',
}

function getIcon(iconHint: string): string {
  const hint = iconHint.toLowerCase()
  for (const [key, icon] of Object.entries(ICON_MAP)) {
    if (hint.includes(key)) return icon
  }
  return '\u26A1' // default lightning
}

export function WhatYouCouldDo({ items }: WhatYouCouldDoProps) {
  return (
    <section className="space-y-8">
      {/* Section header */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl md:text-5xl font-headline font-black text-accent tracking-tighter uppercase">
          WHAT YOU COULD DO INSTEAD
        </h2>
        <p className="font-body italic text-secondary/60">
          The tokens you're giving up could power all of this.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <HexCard
            key={idx}
            elevation="highest"
            clip="tr"
            borderAccent={idx === 0 ? 'secondary' : idx === 1 ? 'accent' : 'primary'}
            className="relative group"
          >
            {/* Icon */}
            <div className="mb-4 w-12 h-12 flex items-center justify-center bg-secondary/10 text-secondary text-2xl"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 75%)',
              }}
            >
              {getIcon(item.icon_hint)}
            </div>

            {/* Action title */}
            <h3 className="font-headline text-lg font-bold text-accent mb-2 uppercase">
              {item.action}
            </h3>

            {/* Description */}
            <p className="text-on-surface/70 font-body text-sm leading-relaxed">
              {item.description}
            </p>

            {/* Accent bar */}
            <div
              className={`mt-4 h-1 w-16 ${
                idx === 0
                  ? 'bg-secondary shadow-[0_0_10px_#00f5ff]'
                  : idx === 1
                    ? 'bg-accent shadow-[0_0_10px_#ff4655]'
                    : 'bg-outline-variant'
              }`}
            />
          </HexCard>
        ))}
      </div>
    </section>
  )
}
