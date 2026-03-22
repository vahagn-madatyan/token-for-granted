interface MultiplierCategory {
  name: string
  relevance: number
  description: string
}

interface MultiplierEffectProps {
  categories: MultiplierCategory[] | null
}

interface CardConfig {
  name: string
  description: string
  bgColor: string
  textColor: string
  icon: string
  image: string
  accentShadow: string
}

const DEFAULT_CARDS: CardConfig[] = [
  {
    name: 'INDIE GAMES',
    description:
      'Forge entire interactive worlds using latent compute power. From code to core.',
    bgColor: 'bg-accent',
    textColor: 'text-white',
    icon: '\u2694', // crossed swords
    image: '/images/collectible.svg',
    accentShadow: 'shadow-[0_0_10px_#ff4655]',
  },
  {
    name: 'ART VAULTS',
    description:
      'The intersection of algorithmic precision and atmospheric, painterly grit.',
    bgColor: 'bg-secondary',
    textColor: 'text-on-secondary',
    icon: '\u25C8', // diamond
    image: '/images/art.svg',
    accentShadow: 'shadow-[0_0_10px_#00f5ff]',
  },
  {
    name: 'NARRATIVES',
    description:
      'Generative storytelling that weaves ancient lore with futuristic tactical edge.',
    bgColor: 'bg-outline-variant',
    textColor: 'text-white',
    icon: '\u2739', // star
    image: '/images/other.svg',
    accentShadow: '',
  },
]

export function MultiplierEffect({ categories }: MultiplierEffectProps) {
  // Use AI categories if provided, falling back to defaults
  const cards: CardConfig[] =
    categories && categories.length >= 3
      ? categories.slice(0, 3).map((cat, i) => ({
          ...DEFAULT_CARDS[i],
          name: cat.name.toUpperCase(),
          description: cat.description,
        }))
      : DEFAULT_CARDS

  return (
    <section className="space-y-8">
      {/* Section header */}
      <div className="text-center space-y-2">
        <h2 className="text-5xl font-headline font-black text-accent tracking-tighter uppercase">
          THE MULTIPLIER EFFECT
        </h2>
        <p className="font-body italic text-secondary/60">
          Converting digital scarcity into tactile power.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div
            key={card.name}
            className="relative group h-[450px] overflow-hidden clipped-tr bg-surface-container-highest border border-secondary/20"
          >
            {/* Background image */}
            <img
              src={card.image}
              alt={card.name}
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[1.5s]"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-transparent" />

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 p-8 w-full">
              {/* Icon container with tactical clip-path */}
              <div
                className={`mb-4 w-12 h-12 flex items-center justify-center ${card.bgColor} ${card.textColor}`}
                style={{
                  clipPath:
                    'polygon(0% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 75%)',
                }}
              >
                <span className="text-lg">{card.icon}</span>
              </div>

              {/* Card name */}
              <h3 className="font-headline text-2xl font-bold text-accent mb-2 uppercase">
                {card.name}
              </h3>

              {/* Description */}
              <p className="text-on-surface/70 font-body text-sm mb-4 leading-relaxed">
                {card.description}
              </p>

              {/* Accent bar */}
              <div
                className={`h-1 w-16 ${card.bgColor} ${card.accentShadow}`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
