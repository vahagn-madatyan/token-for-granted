import type { AssetCategory } from '~/core/types'

interface CategorySelectProps {
  value: AssetCategory
  onChange: (category: AssetCategory) => void
}

const categories: AssetCategory[] = [
  'collectible',
  'art',
  'tech',
  'luxury',
  'other',
]

/**
 * Segmented control for selecting one of 5 asset categories.
 * Tactical sharp edges, no rounded corners.
 */
export function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`px-4 py-2 font-headline text-xs font-bold uppercase tracking-widest transition-all duration-150 ${
            value === category
              ? 'bg-primary-container/10 text-primary-container border-b-2 border-primary-container'
              : 'bg-surface-container-highest text-on-surface-variant hover:text-primary-container hover:bg-surface-container-high'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
