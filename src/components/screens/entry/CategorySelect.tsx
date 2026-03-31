import type { AssetCategory } from '~/core/types'

interface CategorySelectProps {
  value: AssetCategory
  onChange: (category: AssetCategory) => void
}

const categories: AssetCategory[] = [
  'electronics',
  'collectibles',
  'fashion',
  'entertainment',
  'food',
  'other',
]

const categoryIcons: Record<AssetCategory, string> = {
  electronics: '\u2301',
  collectibles: '\u2666',
  fashion: '\u2726',
  entertainment: '\u266B',
  food: '\u2619',
  other: '\u2756',
}

/**
 * Segmented control for selecting one of 6 asset categories.
 * Tactical sharp edges, Valorant-style active state.
 */
export function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((category) => {
        const isActive = value === category
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`relative px-4 py-2.5 font-headline text-[11px] font-bold uppercase tracking-wider transition-all duration-150 cursor-crosshair ${
              isActive
                ? 'bg-primary-container/15 text-primary-container border border-primary-container/40'
                : 'bg-surface-container/60 text-on-surface-variant/60 border border-outline-variant/10 hover:text-on-surface-variant hover:bg-surface-container-high/80 hover:border-outline-variant/20'
            }`}
          >
            <span className="mr-1.5 opacity-60">{categoryIcons[category]}</span>
            {category}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-primary-container" />
            )}
          </button>
        )
      })}
    </div>
  )
}
