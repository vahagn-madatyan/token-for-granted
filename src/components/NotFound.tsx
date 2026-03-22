import { Link } from '@tanstack/react-router'
import { HexCard } from '~/components/ui/HexCard'
import { GlitchText } from '~/components/ui/GlitchText'
import { NeonButton } from '~/components/ui/NeonButton'

export function NotFound({ children }: { children?: any }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <HexCard
        elevation="high"
        glow="cyan"
        borderAccent="primary"
        clip="tr"
        className="max-w-lg w-full text-center space-y-6"
      >
        <GlitchText
          text="SIGNAL LOST"
          as="h1"
          active
          className="text-4xl text-primary-container font-headline font-black"
        />

        <div className="font-label text-xs text-on-surface-variant uppercase tracking-widest">
          {children || 'TARGET_NOT_FOUND // ROUTE DOES NOT EXIST'}
        </div>

        <div className="flex flex-col items-center gap-4 pt-4">
          <NeonButton
            variant="secondary"
            onClick={() => window.history.back()}
          >
            GO BACK
          </NeonButton>

          <Link
            to="/"
            className="font-label text-xs text-primary-container hover:text-primary transition-colors uppercase tracking-widest"
          >
            RETURN TO BASE
          </Link>
        </div>
      </HexCard>
    </div>
  )
}
