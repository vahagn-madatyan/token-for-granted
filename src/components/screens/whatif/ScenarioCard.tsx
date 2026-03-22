import { useState } from 'react'
import { cn } from '~/lib/cn'
import { useTypewriter } from '~/components/animations/useTypewriter'
import { runScenario } from '~/core/functions/scenario.functions'

interface ScenarioCardProps {
  scenarioId: 'shakespearean-loop' | 'repo-foundry' | 'infinite-debate'
  title: string
  description: string
  intensity: string
  classLabel: string
  imageUrl: string
  accentColor: 'primary' | 'secondary' | 'error'
}

const accentMap = {
  primary: {
    border: 'hover:border-primary-container/50',
    classText: 'text-primary-container/40 group-hover:text-primary-container',
    title: 'group-hover:text-primary-container',
    play: 'text-primary-container',
  },
  secondary: {
    border: 'hover:border-secondary/50',
    classText: 'text-secondary/40 group-hover:text-secondary',
    title: 'group-hover:text-secondary',
    play: 'text-secondary',
  },
  error: {
    border: 'hover:border-error/50',
    classText: 'text-error/40 group-hover:text-error',
    title: 'group-hover:text-error',
    play: 'text-error',
  },
}

export function ScenarioCard({
  scenarioId,
  title,
  description,
  intensity,
  classLabel,
  imageUrl,
  accentColor,
}: ScenarioCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [resultText, setResultText] = useState('')
  const { displayText } = useTypewriter(resultText, 30)

  const accent = accentMap[accentColor]

  async function handlePlay() {
    if (isLoading) return
    setIsLoading(true)
    setResultText('')
    try {
      const result = await runScenario({ data: { scenarioId } })
      setResultText(result.text)
    } catch (error) {
      console.error('Scenario failed:', error)
      setResultText('ERROR: Scenario generation failed. Neural pathway disrupted.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article
      className={cn(
        'group relative bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/20 aspect-[3/4] flex flex-col p-6 transition-all hover:-translate-y-2',
        accent.border
      )}
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)' }}
    >
      {/* Top-right class label */}
      <div
        className={cn(
          'absolute top-0 right-0 p-4 font-label text-[10px] transition-colors',
          accent.classText
        )}
      >
        CLASS: {classLabel}
      </div>

      {/* Image area */}
      <div className="flex-1 relative overflow-hidden mt-4">
        <img
          alt={title}
          className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700"
          src={imageUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="mt-6 space-y-3">
        <h3
          className={cn(
            'font-headline text-2xl font-black text-on-surface uppercase transition-colors tracking-tighter',
            accent.title
          )}
        >
          {title}
        </h3>
        <p className="font-body text-on-surface-variant text-sm leading-relaxed">
          {description}
        </p>

        {/* Typewriter output */}
        {(resultText || isLoading) && (
          <div className="border-t border-outline-variant/20 pt-4 mt-4">
            {isLoading ? (
              <div className="font-label text-xs text-primary-container/60 animate-pulse">
                GENERATING SCENARIO OUTPUT...
              </div>
            ) : (
              <p className="font-label text-xs text-primary-container/80 leading-relaxed">
                {displayText}
                <span className="inline-block w-[2px] h-3 bg-primary-container/60 ml-0.5 animate-pulse" />
              </p>
            )}
          </div>
        )}

        {/* Bottom row: intensity + play button */}
        <div className="flex items-center justify-between pt-4">
          <span className="font-label text-[10px] text-outline">
            INTENSITY: {intensity}
          </span>
          <button
            onClick={handlePlay}
            disabled={isLoading}
            className={cn(
              'hover:scale-125 transition-transform disabled:opacity-50',
              accent.play
            )}
            aria-label={`Play ${title} scenario`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5.14v14l11-7l-11-7z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}
